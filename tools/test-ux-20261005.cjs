const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const base = (process.env.TEST_URL || 'http://127.0.0.1:4173').replace(/\/$/, '');
const publicOrigin = 'https://otaru.spady.net';
const locales = [['/', 'ja'], ['/en/', 'en'], ['/zh-hant/', 'zh-Hant'], ['/zh-hans/', 'zh-Hans'], ['/ko/', 'ko']];
const widths = [320, 375, 390, 768, 1024, 1440];
const fixedNow = '2026-10-05T12:00:00+09:00';
const results = [];
const runtimeErrors = [];
const outputPrefix = process.env.TEST_OUTPUT_PREFIX || '/private/tmp/otaru-ux-20261005';

function localUrl(href) {
  const url = new URL(href, base);
  if (url.origin === publicOrigin) return base + url.pathname + url.search + url.hash;
  return url.href;
}
function checkParams(url, expected) {
  const actual = new URL(url, base).searchParams;
  for (const [key, value] of Object.entries(expected)) assert.equal(actual.get(key), value, `${key} is preserved in ${url}`);
}
async function waitForCalendar(page) {
  await page.waitForSelector('#calendarGrid .day-open', { state: 'attached' });
  await page.waitForFunction(() => document.getElementById('monthTitle')?.textContent.includes('2026'));
}
async function checkNoOverflow(page, label) {
  const dimensions = await page.evaluate(() => ({width: innerWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth}));
  assert(dimensions.document <= dimensions.width + 1, `${label}: document overflow ${JSON.stringify(dimensions)}`);
  assert(dimensions.body <= dimensions.width + 1, `${label}: body overflow ${JSON.stringify(dimensions)}`);
}
async function checkSeo(page, path, lang) {
  assert.equal(await page.locator('html').getAttribute('lang'), lang);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), publicOrigin + path);
  const alternates = await page.locator('link[rel="alternate"][hreflang]').evaluateAll(nodes => nodes.map(n => ({lang:n.hreflang, href:n.href})));
  const localePrefix = locales.find(([prefix, code]) => code === lang)[0];
  const suffix = path.slice(localePrefix.length);
  for (const [prefix, code] of locales) {
    assert.equal(alternates.find(a => a.lang === code)?.href, publicOrigin + prefix + suffix, `${path} ${code} alternate`);
  }
  assert.equal(alternates.find(a => a.lang === 'x-default')?.href, publicOrigin + '/' + suffix);
  assert((await page.title()).trim().length > 0, `${path} title`);
  assert((await page.locator('meta[name="description"]').getAttribute('content')).trim().length > 0, `${path} description`);
}

async function main() {
  const browser = await chromium.launch({headless:true, executablePath:process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  try {
    const context = await browser.newContext({viewport:{width:1440,height:1000}, timezoneId:'Asia/Tokyo', reducedMotion:'reduce'});
    await context.addInitScript(({fixedNow}) => {
      const NativeDate = Date;
      const fixed = new NativeDate(fixedNow).getTime();
      class TestDate extends NativeDate {
        constructor(...args) { super(...(args.length ? args : [fixed])); }
        static now() { return fixed; }
      }
      window.Date = TestDate;
    }, {fixedNow});
    await context.route('**/*', route => {
      const origin = new URL(route.request().url()).origin;
      if (origin === new URL(base).origin || origin === publicOrigin) return route.continue();
      return route.abort(); // Analytics and map embeds are outside this UI regression.
    });
    const page = await context.newPage();
    page.setDefaultTimeout(15000);
    page.setDefaultNavigationTimeout(45000);
    page.on('pageerror', error => runtimeErrors.push(error.message));
    page.on('console', message => {
      if (message.type() === 'error' && !/Failed to load resource|net::ERR_|Content Security Policy/.test(message.text())) runtimeErrors.push(message.text());
    });

    for (const [path, lang] of locales) {
      console.log('Checking root', path);
      const response = await page.goto(base + path, {waitUntil:'domcontentloaded'});
      assert.equal(response.status(), 200, `${path} responds successfully`);
      await waitForCalendar(page);
      await checkSeo(page, path, lang);
      assert.equal(await page.locator('.language-picker-options [data-lang-link]').count(), 5);
      assert.equal(await page.locator('.radio-dock').count(), 0);
      assert.equal(await page.locator('footer a').filter({hasText:/Spady公式|Spady\s*↗/}).count(), 0);
      assert.equal(await page.locator('footer img[alt="Spady"], footer .brand-logo').count(), 0);
      assert(await page.locator('#eventList .event-card, #periodEventList .period-event-card').count() > 0, `${lang} has events`);
      await page.setViewportSize({width:390,height:844});
      await checkNoOverflow(page, `${lang} mobile root`);
    }
    results.push('Five language roots, canonical/hreflang/x-default, event content and compact footer: PASS');

    await page.goto(base + '/?month=2026-10&view=calendar');
    await waitForCalendar(page);
    for (const width of widths) {
      console.log('Checking responsive width', width);
      await page.setViewportSize({width,height:900});
      await checkNoOverflow(page, `root ${width}px`);
      await page.locator('#calendar').scrollIntoViewIfNeeded();
      await page.screenshot({path:`${outputPrefix}-calendar-${width}.png`});
      console.log('Calendar screenshot saved', width);
      await page.locator('footer').scrollIntoViewIfNeeded();
      console.log('Footer scrolled into view', width);
      await checkNoOverflow(page, `footer ${width}px`);
      if (width === 390) await page.screenshot({path:`${outputPrefix}-footer-mobile.png`});
    }
    results.push('Layout at 320/375/390/768/1024/1440px with calendar screenshots: PASS');

    await page.setViewportSize({width:390,height:844});
    console.log('Checking keyboard controls');
    const languageSummary = page.locator('.language-picker summary');
    await languageSummary.focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('.language-picker-options').isVisible(), true);
    await page.keyboard.press('Tab');
    assert(await page.evaluate(() => Boolean(document.activeElement?.matches('.language-picker-options a'))), 'Language links are keyboard reachable');
    await languageSummary.focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('.language-picker-options').isVisible(), false);
    await page.locator('#viewCalendar').click();
    const populatedDay = page.locator('#calendarGrid .day').filter({has:page.locator('.event-pill')}).first();
    await populatedDay.locator('.day-open').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#modal').isVisible(), true);
    assert.equal(await page.locator('main').evaluate(el => el.inert), true);
    assert.equal(await page.locator('#modal .close').evaluate(el => el === document.activeElement), true);
    await page.keyboard.press('Shift+Tab');
    assert(await page.evaluate(() => Boolean(document.activeElement?.closest('#modal'))), 'Modal focus stays inside');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#modal').isVisible(), false);
    assert.equal(await page.locator('main').evaluate(el => el.inert), false);
    results.push('Keyboard language chooser, day selection, modal focus trap and Escape: PASS');

    await page.goto(base + '/?month=2026-09&view=calendar');
    console.log('Checking inclusive multi-day events');
    await waitForCalendar(page);
    const intervalEvent = await page.evaluate(() => window.OTARU_PAGE_DATA.events.find(e => e.slug === 'kitaunga-night-market-yummy-20260919'));
    assert(intervalEvent, 'Known eight-day event remains in data');
    for (let day = 19; day <= 26; day++) {
      const cell = page.locator(`[data-date="2026-09-${day}"]`);
      await cell.locator('.day-open').click();
      assert((await page.locator('#modalBody').innerText()).includes(intervalEvent.title), `Eight-day event shown on September ${day}`);
      await page.keyboard.press('Escape');
    }
    await page.locator('[data-date="2026-09-27"] .day-open').click();
    assert(!(await page.locator('#modalBody').innerText()).includes(intervalEvent.title), 'Inclusive end does not leak to following day');
    await page.keyboard.press('Escape');
    results.push('Past-month archive and inclusive daily display for an eight-day event: PASS');

    await page.goto(base + '/?month=2026-10&view=list');
    console.log('Checking URL and detail-back state');
    await waitForCalendar(page);
    await page.locator('[data-filter="business"]').click();
    await page.locator('#eventSearch').fill('AKINDO');
    await page.waitForFunction(() => new URL(location.href).searchParams.get('q') === 'AKINDO');
    const expectedState = {month:'2026-10',q:'AKINDO',category:'business',view:'list'};
    checkParams(page.url(), expectedState);
    assert(await page.locator('#eventList .event-card').count() > 0);
    assert.equal(await page.locator('#eventList .event-card:not(.category-business)').count(), 0);
    await page.reload({waitUntil:'domcontentloaded'});
    await waitForCalendar(page);
    checkParams(page.url(), expectedState);
    assert.equal(await page.locator('#eventSearch').inputValue(), 'AKINDO');
    assert.equal(await page.locator('[data-filter="business"]').getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('#viewList').getAttribute('aria-pressed'), 'true');
    const detailHref = await page.locator('#eventList .event-card h3 a').first().getAttribute('href');
    await page.goto(localUrl(detailHref), {waitUntil:'domcontentloaded'});
    assert(await page.locator('h1').innerText());
    const backHref = await page.locator('.back-to-results').first().getAttribute('href');
    checkParams(backHref, expectedState);
    await page.goto(localUrl(backHref), {waitUntil:'domcontentloaded'});
    await waitForCalendar(page);
    checkParams(page.url(), expectedState);
    assert.equal(await page.locator('#eventSearch').inputValue(), 'AKINDO');
    results.push('Month/search/category/view persist across reload and detail-back navigation: PASS');

    await page.locator('#eventSearch').fill('zz-no-event-match-20261005');
    await page.waitForFunction(() => document.querySelectorAll('#eventList .event-card').length === 0);
    assert(await page.locator('.empty-results').count() > 0);
    await page.locator('#resetFilters').click();
    assert.equal(await page.locator('#eventSearch').inputValue(), '');
    assert.equal(await page.locator('[data-filter="all"]').getAttribute('aria-pressed'), 'true');
    assert(await page.locator('#eventList .event-card').count() > 0);
    await page.locator('#quickRanges [data-range="today"]').click();
    assert.equal(await page.locator('#quickRanges [data-range="today"]').getAttribute('aria-pressed'), 'true');
    await page.locator('#quickRanges [data-range="weekend"]').click();
    assert.equal(await page.locator('#quickRanges [data-range="weekend"]').getAttribute('aria-pressed'), 'true');
    await page.locator('#quickRanges [data-range="month"]').click();
    const showMore = page.locator('#showMoreEvents');
    if (await showMore.isVisible()) {
      const before = await page.locator('#eventList .event-card').count();
      await showMore.click();
      assert(await page.locator('#eventList .event-card').count() > before, 'Show more adds events');
      const expandedCount = await page.locator('#eventList .event-card').count();
      const expandedLink = await page.locator('#eventList .event-card h3 a').nth(before).getAttribute('href');
      await page.goto(localUrl(expandedLink), {waitUntil:'domcontentloaded'});
      const returnLink = await page.locator('.back-to-results').first().getAttribute('href');
      assert(Number(new URL(returnLink, base).searchParams.get('limit')) >= expandedCount, 'Expanded list state travels to detail and back');
      await page.goto(localUrl(returnLink), {waitUntil:'domcontentloaded'});
      await waitForCalendar(page);
      assert.equal(await page.locator('#eventList .event-card').count(), expandedCount, 'Expanded list is restored before returning to its scroll position');
    }
    results.push('Search empty state/reset, date shortcuts and progressive event list: PASS');

    for (const [path, lang] of locales) {
      for (const suffix of ['events/kitaunga-night-market-yummy-20260919/', 'privacy/']) {
        console.log('Checking content route', path + suffix);
        const route = path + suffix;
        const response = await page.goto(base + route, {waitUntil:'domcontentloaded'});
        assert.equal(response.status(), 200, route);
        await checkSeo(page, route, lang);
        assert.equal(await page.locator('main h1').count(), 1);
        assert((await page.locator('main').innerText()).trim().length > 100, `${route} readable content`);
        await checkNoOverflow(page, `${route} 390px`);
        if (lang === 'ja') await page.screenshot({path:`${outputPrefix}-${suffix.startsWith('events') ? 'detail' : 'privacy'}-mobile.png`,fullPage:true});
      }
    }
    results.push('Event detail and privacy pages readable in five languages, correct SEO and no mobile overflow: PASS');

    const noJs = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844},timezoneId:'Asia/Tokyo'});
    await noJs.route('**/*', route => new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort());
    const staticPage = await noJs.newPage();
    await staticPage.goto(base, {waitUntil:'domcontentloaded'});
    assert(await staticPage.locator('#eventList .event-card, #periodEventList .period-event-card').count() > 0);
    assert.equal(await staticPage.locator('#splash').isVisible(), false);
    assert((await staticPage.locator('main').innerText()).includes('2026'));
    await checkNoOverflow(staticPage, 'JavaScript-disabled root');
    await noJs.close();
    assert.deepEqual(runtimeErrors, [], 'No JavaScript runtime/application console errors');
    results.push('JavaScript-disabled initial event information and zero application runtime errors: PASS');
    fs.writeFileSync(`${outputPrefix}-results.json`, JSON.stringify({fixedNow, base, results, runtimeErrors},null,2));
    console.log(results.join('\n'));
  } finally {
    await browser.close();
  }
}
main().catch(error => {console.error(error); process.exitCode = 1;});
