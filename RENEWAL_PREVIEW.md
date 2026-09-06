# Calendar renewal preview — 2026-09-06

This branch is a design preview. Do not merge into `main` until the site owner approves the preview.

## Scope

- Warm neutral backgrounds, deep teal text, simpler cards and visible keyboard focus.
- A short canal-photo opening, dismissible by its skip button or Escape; omitted with reduced-motion preferences, deep links and repeat visits within the browser session.
- Responsive calendar and list views, local keyword search and labelled category controls.
- Mobile month cells use legible dates, counts and category markers. A day opens its readable event list; desktop cells retain event title previews.
- Long-running events stay in their own expandable group. No featured-event ranking.
- Keyboard-operated day buttons and focus-managed event dialogs.
- Five translated interfaces and preserved language URLs, metadata, data sources, analytics and outbound links.
- Introduction/population remain below garbage lookup; LOCAL PAGES remains below AKINDO Lab.
- Language-specific index payloads omit unused translations; Japanese HTML is approximately 43% smaller before compression than the previous build.
- Population labels use the existing shared reference date across languages; the population dataset itself is unchanged.

## Files

- `tools/build-site.mjs`: templates, client interaction and shared metadata.
- `assets/renewal.css`: reviewable presentation layer, loaded after the legacy stylesheet.
- `data/interface-renewal.json`: new interface copy for all five languages.
- Generated HTML pages and sitemap refreshed through the existing static generator.
- `tools/test-renewal.cjs`: browser regression checks; uses Playwright and an isolated browser profile. It does not interact with saved browser accounts.

## Verification

Run `node tools/build-site.mjs` and `node tools/validate-site.mjs`.
For browser checks, serve the repository on localhost port 4173, make Playwright available via `NODE_PATH`, and run `node tools/test-renewal.cjs`.
`TEST_URL` and `CHROME_PATH` can override the test server URL and Chrome executable.
Browser tests cover four widths, five languages, search/filter/view state, calendar navigation, keyboard dialogs, reduced motion, no-JavaScript content and opening dismissal.
Third-party analytics and embedded maps are excluded from the main runtime test; their outbound URL destinations are checked.

This is not a claim of full WCAG conformance or device-wide accessibility certification. A human review of the new copy and display preferences is still recommended before production publication.
