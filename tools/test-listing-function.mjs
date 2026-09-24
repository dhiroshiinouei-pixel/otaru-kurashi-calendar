import assert from 'node:assert/strict';
import { onRequestPost } from '../functions/api/listing.js';

const originalFetch = globalThis.fetch;
let delivered;
globalThis.fetch = async (url, options) => {
  delivered = { url, options, body: JSON.parse(options.body) };
  return Response.json({ code: 0, msg: 'success' });
};

function request(fields, origin = 'https://otaru.spady.net') {
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) form.set(key, value);
  return new Request('https://otaru.spady.net/api/listing', {
    method: 'POST',
    headers: { Origin: origin, Accept: 'application/json' },
    body: form,
  });
}

try {
  const valid = {
    kind: 'event',
    title: '小樽テストイベント',
    date: '2026-10-03',
    venue: 'おたるポートスクエア',
    officialUrl: 'https://example.org/event',
    details: '主催者の公式告知に基づく確認可能なイベント情報です。',
    contactName: 'テスト担当',
    contactEmail: 'test@example.org',
    consent: 'yes',
  };
  const env = { LARK_WEBHOOK_URL: 'https://open.larksuite.com/open-apis/bot/v2/hook/test-secret' };
  let response = await onRequestPost({ request: request(valid), env });
  assert.equal(response.status, 200);
  assert.match(delivered.body.content.text, /小樽テストイベント/);
  assert.match(delivered.body.content.text, /test@example.org/);
  delivered = undefined;
  response = await onRequestPost({ request: request({ ...valid, consent: 'no' }), env });
  assert.equal(response.status, 400);
  assert.equal(delivered, undefined);
  response = await onRequestPost({ request: request(valid, 'https://attacker.example'), env });
  assert.equal(response.status, 403);
  response = await onRequestPost({ request: request(valid), env: {} });
  assert.equal(response.status, 503);
  console.log('Listing function: valid Lark payload, consent, origin and secret checks passed.');
} finally {
  globalThis.fetch = originalFetch;
}
