import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const dataFiles = [
  'data/events.json',
  'data/events-official-municipal-20260723.json',
  'data/events-official-tourism-20260723.json',
];
const events = dataFiles.flatMap(readJson);
const languages = ['', 'en', 'zh-hant', 'zh-hans', 'ko'];
const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };
const ids = new Set();
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;
const dateSpanDays = (event) => {
  const start = new Date(`${event.start}T12:00:00+09:00`);
  const end = new Date(`${event.end}T12:00:00+09:00`);
  return Math.max(0, Math.round((end - start) / 86_400_000));
};
const googleDate = (dateString, addDays = 0) => {
  const date = new Date(`${dateString}T12:00:00+09:00`);
  date.setDate(date.getDate() + addDays);
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
};

for (const event of events) {
  assert(event.id && !ids.has(event.id), `Duplicate or missing event ID: ${event.id || '(missing)'}`);
  ids.add(event.id);
  for (const key of ['title', 'category', 'start', 'end', 'time', 'place', 'summary', 'source', 'url']) {
    assert(typeof event[key] === 'string' && event[key].trim(), `${event.id}: missing ${key}`);
  }
  assert(['child', 'job', 'event', 'business', 'civic'].includes(event.category), `${event.id}: invalid category`);
  assert(datePattern.test(event.start) && datePattern.test(event.end) && event.start <= event.end, `${event.id}: invalid date range`);
  if (event.startTime) assert(timePattern.test(event.startTime), `${event.id}: invalid startTime`);
  if (event.endTime) assert(timePattern.test(event.endTime), `${event.id}: invalid endTime`);
  if (event.doorsOpenTime) assert(timePattern.test(event.doorsOpenTime), `${event.id}: invalid doorsOpenTime`);
  assert(/^https:\/\//.test(event.url), `${event.id}: official URL must use HTTPS`);
  if (event.registrationUrl) assert(/^https:\/\//.test(event.registrationUrl), `${event.id}: registration URL must use HTTPS`);
  if (event.reservationRequired !== undefined) {
    assert(typeof event.reservationRequired === 'boolean', `${event.id}: reservationRequired must be boolean`);
  }
  for (const excluded of event.excludedDates || []) {
    assert(datePattern.test(excluded) && excluded >= event.start && excluded <= event.end, `${event.id}: invalid excluded date ${excluded}`);
  }
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const event of events) {
  const slug = (event.slug || event.id.replaceAll('_', '-')).toLowerCase();
  for (const language of languages) {
    const rel = `${language ? `${language}/` : ''}events/${slug}/index.html`;
    const full = path.join(root, rel);
    assert(fs.existsSync(full), `${event.id}: missing generated page ${rel}`);
    if (fs.existsSync(full) && dateSpanDays(event) > 1) {
      const html = fs.readFileSync(full, 'utf8');
      const expectedDates = `dates=${googleDate(event.start)}%2F${googleDate(event.end, 1)}`;
      assert(html.includes(expectedDates), `${event.id}: multi-day calendar link must use an inclusive all-day range in ${rel}`);
    }
    const url = `https://otaru.spady.net/${language ? `${language}/` : ''}events/${slug}/`;
    assert(sitemap.includes(`<loc>${url}</loc>`), `${event.id}: missing sitemap URL ${url}`);
  }
}

const htmlFiles = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
};
walk(root);

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file);
  assert(html.includes('GTM-WPRLRR5S'), `${rel}: missing GTM`);
  assert(!html.includes('CALENDER'), `${rel}: contains CALENDER typo`);
  assert(!html.includes('の詳しくはこちら'), `${rel}: contains removed phrase`);
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(match[1]); } catch { errors.push(`${rel}: invalid JSON-LD`); }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Validated ${events.length} events, ${events.length * languages.length} event pages and ${htmlFiles.length} HTML files.`);
