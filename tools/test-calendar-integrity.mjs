import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import discoveredEvents from '../data/events-discovered-20260925.mjs';

// Evaluate the generator without invoking build() or writing generated files.
const toolsDir = path.dirname(fileURLToPath(import.meta.url));
const source = fs.readFileSync(path.join(toolsDir, 'build-site.mjs'), 'utf8')
  .replace(/^import .*;\n/gm, '')
  .replace(/const __dirname = .*;/, 'const __dirname = __testToolsDir;')
  .replace(/\nbuild\(\);\s*$/, '\n');
class TestDate extends Date {
  constructor(...args) { super(...(args.length ? args : ['2026-10-05T12:00:00+09:00'])); }
  static now() { return Date.parse('2026-10-05T12:00:00+09:00'); }
}
const context = vm.createContext({ fs, path, discoveredEvents, __testToolsDir: toolsDir, Date: TestDate, Intl, URLSearchParams, URL, console });
vm.runInContext(source + `\nglobalThis.api = {events, rawEvents, copy, normalizeEvent, statusFor, statusLabelFor, eventsForDate, monthEvents, formatTimeRange, formatEventDateTime, googleCalendarUrl, eventJsonLd, toGoogleDate, addMinutesToGoogleDateTime, fmtDate, clientScript};`, context);
const api = context.api;
let checks = 0;
const equal = (actual, expected, message) => { assert.equal(actual, expected, message); checks++; };
const truth = (actual, message) => { assert.ok(actual, message); checks++; };
const raw = {
  id: 'integrity-festival', title: '検証用の二日間の催し', category: 'event',
  start: '2026-10-10', end: '2026-10-11', startTime: '10:00', endTime: '17:00',
  summary: '事実を変更しない回帰検証用データ', place: '小樽市', source: '検証用', url: 'https://example.com/', eventStatus: 'EventScheduled',
};
const event = api.normalizeEvent(raw);
equal(api.statusFor({ ...raw, end: '2026-09-30' }), 'EventCompleted', 'An explicit Scheduled flag must not make an elapsed event appear upcoming');
equal(api.statusFor({ ...raw, end: '2026-09-30', eventStatus: 'EventCancelled' }), 'EventCancelled', 'Cancellation remains explicit');
equal(api.statusFor({ ...raw, end: '2026-09-30', eventStatus: 'EventPostponed' }), 'EventPostponed', 'Unknown postponed date must not become a completed event');
for (const lang of ['ja', 'en', 'zh-Hant', 'zh-Hans', 'ko']) {
  const ended = api.normalizeEvent({ ...raw, end: '2026-09-30' });
  equal(ended.translations[lang].statusLabel, api.copy[lang].ended, `Elapsed status translated in ${lang}`);
  truth(!/翌日|next day|다음 날|次日/.test(api.formatTimeRange(event, lang)), `Two-day daytime program is not described as overnight in ${lang}`);
  truth(api.formatEventDateTime(event, lang).includes('11'), `Both festival dates appear in ${lang}`);
}
equal(new URL(api.googleCalendarUrl(event, 'ja')).searchParams.get('dates'), '20261010/20261012', 'A two-day festival uses inclusive all-day dates without blocking an overnight period');
const night = api.normalizeEvent({ ...raw, startTime: '22:00', endTime: '02:00' });
truth(api.formatTimeRange(night, 'ja').includes('翌日02:00'), 'Actual overnight session retains next-day clock time');
equal(new URL(api.googleCalendarUrl(night, 'en')).searchParams.get('dates'), '20261010T220000/20261011T020000', 'Overnight calendar entry remains a timed range in JST');
equal(new URL(api.googleCalendarUrl(event, 'en')).searchParams.get('ctz'), 'Asia/Tokyo', 'Calendar timezone remains Japan');
const varying = api.normalizeEvent({ ...raw, time: '10/10 12:00〜19:30・10/11 11:00〜17:00' });
truth(api.formatTimeRange(varying, 'ja').includes('12:00〜19:30'), 'Explicit different daily hours are retained');
truth(!JSON.stringify(api.eventJsonLd(api.normalizeEvent({ ...raw, start: '2026-09-29', end: '2026-09-30' }), 'ja')).includes('schema.org/EventCompleted'), 'Completed is only a display state, not an invalid schema enumeration');
const shortRange = api.normalizeEvent({ ...raw, start: '2026-10-01', end: '2026-10-13', excludedDates: ['2026-10-05'] });
for (const day of [1, 2, 6, 13]) equal(api.eventsForDate(new Date(2026, 9, day), [shortRange]).length, 1, `A 13-day program appears on open day ${day}`);
equal(api.eventsForDate(new Date(2026, 9, 5), [shortRange]).length, 0, 'Known closed day excluded');
equal(api.eventsForDate(new Date(2026, 9, 14), [shortRange]).length, 0, 'Day after inclusive end excluded');
const longRange = { ...shortRange, endDate: '2026-10-14' };
equal(api.eventsForDate(new Date(2026, 9, 2), [longRange]).length, 0, 'A 14-day program remains grouped rather than repeated daily');
truth(api.monthEvents(2026, 8).some(e => e.startDate === '2026-09-10'), 'Explicit past-month archive retains elapsed events');
equal(api.toGoogleDate('2026-10-31', 1), '20261101', 'All-day exclusive end handles month boundary');
equal(api.addMinutesToGoogleDateTime('2026-10-31', '23:30', 60), '20261101T003000', 'Missing-end editing placeholder rolls into next calendar day');
truth(api.fmtDate('2026-10-05', 'ja').includes('10月5日（月）'), 'Civil dates do not depend on the build machine timezone');

// Run the actual generated browser predicates against an elapsed adjacent date
// and an ongoing short exhibition, without mounting or rewriting the DOM.
const browserData = {
  lang: 'ja', events: api.events.map(e => ({ ...e, start: e.startDate, end: e.endDate, title: e.translations.ja.name, summary: e.translations.ja.summary, statusLabel: e.translations.ja.statusLabel })),
  ongoing: [], garbageRegions: [], garbagePatterns: {}, categoryLabels: api.copy.ja.filters, weekdayLabels: api.copy.ja.weekdays, text: api.copy.ja,
};
browserData.events.push({ ...shortRange, id: 'browser-short', start: shortRange.startDate, end: shortRange.endDate, title: '検証', statusLabel: '開催予定' });
const browser = vm.createContext({
  window: { OTARU_PAGE_DATA: browserData }, document: { documentElement: { classList: { add() {} } } },
  location: { hostname: 'localhost', search: '' }, localStorage: { getItem() { return null; }, setItem() {} },
  Date: TestDate, Intl, URLSearchParams, URL, console,
});
const runtimePredicates = api.clientScript().split('function renderCalendar(){')[0];
vm.runInContext(runtimePredicates + `\nglobalThis.browserApi = {events, eventsForDate, monthEvents, setMonth(y,m){year=y;month=m;}};})();`, browser);
const b = browser.browserApi;
equal(b.eventsForDate(new Date(2026, 9, 6)).filter(e => e.id === 'browser-short').length, 1, 'Browser daily view includes the middle of a short exhibition');
const previousDayIds = b.eventsForDate(new Date(2026, 8, 30)).map(e => e.id).sort().join(',');
truth(previousDayIds, 'Previous-month adjacent cell retains events');
b.setMonth(2026, 8);
equal(b.eventsForDate(new Date(2026, 8, 30)).map(e => e.id).sort().join(','), previousDayIds, 'The same date has identical events from adjacent month views');
truth(b.monthEvents().some(e => e.start === '2026-09-10'), 'Browser past-month list includes historical events');
truth(b.events.filter(e => e.end < '2026-10-05' && e.eventStatus === 'EventScheduled').length === 0, 'Browser normalizes stale Scheduled records at runtime');
console.log(`PASS: ${checks} calendar date, status, multi-day, locale, archive and Google Calendar checks`);
