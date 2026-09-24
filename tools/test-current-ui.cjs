const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const base = process.env.TEST_URL || 'http://127.0.0.1:4173';

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, timezoneId: 'Asia/Tokyo', reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await context.route('**/*', (route) => new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort());
    await page.goto(`${base}/?month=2026-09`, { waitUntil: 'domcontentloaded' });
    assert.match(await page.locator('#eventList').innerText(), /第4回小樽地域遺産/);
    await page.goto(`${base}/?month=2026-10`, { waitUntil: 'domcontentloaded' });
    assert.match(await page.locator('#eventList').innerText(), /第2回おたるポートスクエア蚤の市/);
    assert.match(await page.locator('#eventList').innerText(), /AKINDO Lab by Spady/);
    await page.screenshot({ path: '/private/tmp/otaru-update-mobile-top.png' });
    await page.locator('.language-picker summary').click();
    assert.equal(await page.locator('.language-picker-options a').count(), 5);
    await page.screenshot({ path: '/private/tmp/otaru-update-language-open.png' });
    await page.locator('.language-picker summary').click();
    await page.locator('[data-date="2026-10-21"] .day-open').click();
    assert.equal(await page.locator('#modal .radio-inline img').count(), 1);
    await page.screenshot({ path: '/private/tmp/otaru-update-day-modal.png' });
    await page.keyboard.press('Escape');
    for (const width of [320, 375, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `horizontal overflow at ${width}px`);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('.listing-request > summary').click();
    await page.screenshot({ path: '/private/tmp/otaru-update-form-mobile.png' });
    let submitted = false;
    await page.route('**/api/listing', (route) => {
      submitted = true;
      route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
    });
    await page.locator('[name="title"]').fill('掲載フォームのテスト');
    await page.locator('[name="details"]').fill('主催者が確認できる公式情報を元にしたテスト送信です。');
    await page.locator('[name="contactName"]').fill('テスト担当');
    await page.locator('[name="contactEmail"]').fill('test@example.org');
    await page.locator('[name="consent"]').check();
    await page.locator('.listing-submit button').click();
    assert.equal(submitted, true);
    assert.match(await page.locator('.listing-status').innerText(), /受け付けました/);
    await page.locator('.radio-dock-close').click();
    assert.equal(await page.locator('.radio-dock').isVisible(), false);
    await page.reload();
    assert.equal(await page.locator('.radio-dock').isVisible(), false);
    await page.goto(`${base}/events/akindo-lab-20261021/`);
    assert.match(await page.locator('.status-line').innerText(), /受付終了・満席/);
    assert.match(await page.locator('.detail-summary').innerText(), /LINE公式アカウント/);
    assert.match(await page.locator('.detail-summary').innerText(), /満席/);
    assert.equal(await page.locator('.language-picker-options a').count(), 5);
    await page.goto(`${base}/events/otaru-retro-modern-day-20261101/`);
    assert.match(await page.locator('h1').innerText(), /OTARU RETRO MODERN DAY/);
    assert.match(await page.locator('.source a').getAttribute('href'), /otaru-retro-modern-day-20261101\.jpg/);
    await page.goto(`${base}/?month=2026-11`, { waitUntil: 'domcontentloaded' });
    assert.match(await page.locator('#eventList').innerText(), /OTARU RETRO MODERN DAY 2026/);
    assert.deepEqual(errors, []);
    console.log('Current UI: 6 viewport widths, language picker, form, dock dismissal and new event details passed.');
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exit(1); });
