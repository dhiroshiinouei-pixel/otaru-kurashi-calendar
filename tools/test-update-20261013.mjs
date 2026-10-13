import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const locales = ['', 'en', 'zh-hant', 'zh-hans', 'ko'];
const pageData = (html) => JSON.parse(html.match(/window\.OTARU_PAGE_DATA=(.*?);<\/script>/s)[1]);
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');
const current = pageData(read('index.html'));
const previous = pageData(execFileSync('git', ['show', 'b5d3cf89e59ddc5c8d71d60abb320e76d1d861ca:index.html'], { cwd: root, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }));
const previousIds = new Set(previous.events.map(e => e.id));
const added = current.events.filter(e => !previousIds.has(e.id));
assert(added.length > 0, 'The update adds verified events');
assert.equal(new Set(current.events.map(e => e.id)).size, current.events.length, 'No duplicate event IDs');
for (const event of previous.events) {
  assert(current.events.some(e => e.id === event.id && e.slug === event.slug), `Existing event and URL retained: ${event.id}`);
}
for (const event of added) {
  assert.equal(event.calendarParams.ctz, 'Asia/Tokyo', `${event.id}: Japanese timezone`);
  assert(event.start <= event.end, `${event.id}: inclusive range order`);
  assert(new URL(event.url).protocol === 'https:', `${event.id}: source URL`);
  assert(!current.events.some(e => e.id !== event.id && e.title === event.title && e.start === event.start && e.end === event.end), `${event.id}: no exact same-name/date duplicate`);
}
for (const locale of locales) {
  const data = pageData(read(`${locale ? locale + '/' : ''}index.html`));
  assert.equal(data.events.length, current.events.length, `${locale || 'ja'}: same events`);
  assert(!data.ongoing.some(item => item.url.includes('otarulight-up-guide2026')), 'Expired summer tour is not continuing information');
  for (const event of added) {
    const localized = data.events.find(e => e.id === event.id);
    assert.equal(localized.start, event.start);
    assert.equal(localized.end, event.end);
    assert.equal(localized.url, event.url);
    if (locale) assert.notEqual(localized.summary, event.summary, `${locale}: translated summary ${event.id}`);
    const detail = read(`${locale ? locale + '/' : ''}events/${event.slug}/index.html`);
    assert(detail.includes('2026-10-13'), `${locale}: visible checked date ${event.id}`);
    assert(detail.includes('calendar.google.com/calendar/render'), `${locale}: calendar action ${event.id}`);
    assert(detail.includes(event.url.replaceAll('&', '&amp;')), `${locale}: source link ${event.id}`);
    const graphs = [...detail.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m => JSON.parse(m[1]));
    const structured = graphs.flatMap(g => g['@graph'] || g).find(g => g['@type'] === 'Event');
    assert(structured, `${locale}: Event structured data ${event.id}`);
    assert.equal(structured.inLanguage, locale === 'zh-hant' ? 'zh-Hant' : locale === 'zh-hans' ? 'zh-Hans' : locale || 'ja');
  }
}
const population = JSON.parse(read('data/population.json'));
assert.equal(population.population, 100684);
assert.equal(population.asOf, '2026-09-30');
assert(read('index.html').includes('100,684'));
console.log(`PASS: ${added.length} new events, ${previous.events.length} retained event URLs, five-language facts, source links, date ranges, JSON-LD, expired notice and population.`);
