const MAX_BODY_BYTES = 16_000;
const allowedKinds = new Map([
  ['event', 'イベント'],
  ['opening', 'お店のオープン'],
  ['other', 'その他の地域情報'],
]);

function clean(value, limit) {
  return String(value ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, limit);
}

function result(request, status, message) {
  if (request.headers.get('Accept')?.includes('application/json')) {
    return Response.json({ ok: status === 200, message }, { status, headers: { 'Cache-Control': 'no-store' } });
  }
  const home = new URL(request.url).origin;
  const body = `<!doctype html><html lang="ja"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>掲載情報の送信</title><body style="font-family:system-ui,sans-serif;max-width:38rem;margin:3rem auto;padding:1rem;line-height:1.8"><h1>${status === 200 ? '送信しました' : '送信できませんでした'}</h1><p>${message}</p><a href="${home}/">小樽暮らしカレンダーに戻る</a></body></html>`;
  return new Response(body, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
}

export async function onRequestPost({ request, env }) {
  const origin = new URL(request.url).origin;
  if (request.headers.get('Origin') !== origin) return result(request, 403, '送信元を確認できません。');
  if (Number(request.headers.get('Content-Length') || 0) > MAX_BODY_BYTES) return result(request, 413, '入力内容が長すぎます。');
  const contentType = request.headers.get('Content-Type') || '';
  if (!contentType.startsWith('multipart/form-data') && !contentType.startsWith('application/x-www-form-urlencoded')) {
    return result(request, 415, '送信形式を確認してください。');
  }
  let form;
  try {
    form = await request.formData();
  } catch {
    return result(request, 400, '入力内容を読み取れませんでした。');
  }
  if (clean(form.get('website'), 100)) return result(request, 200, '情報を受け付けました。');
  const kind = clean(form.get('kind'), 20);
  const title = clean(form.get('title'), 120);
  const date = clean(form.get('date'), 10);
  const venue = clean(form.get('venue'), 160);
  const officialUrl = clean(form.get('officialUrl'), 500);
  const details = clean(form.get('details'), 2000);
  const contactName = clean(form.get('contactName'), 80);
  const contactEmail = clean(form.get('contactEmail'), 160);
  const consent = form.get('consent') === 'yes';
  if (!allowedKinds.has(kind) || !title || details.length < 20 || !contactName || !consent) {
    return result(request, 400, '必須項目を確認してください。');
  }
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) return result(request, 400, '日付を確認してください。');
  if (officialUrl && !/^https:\/\/[^\s/]+(?:\/[^\s]*)?$/i.test(officialUrl)) return result(request, 400, '公式URLを確認してください。');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) return result(request, 400, 'メールアドレスを確認してください。');
  const webhook = env.LARK_WEBHOOK_URL;
  if (!webhook || !/^https:\/\/open\.larksuite\.com\/open-apis\/bot\/v2\/hook\//.test(webhook)) {
    return result(request, 503, '受付の準備中です。時間をおいて再度お試しください。');
  }
  const timestamp = new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo', dateStyle: 'short', timeStyle: 'short' }).format(new Date());
  const text = [
    '【小樽暮らしカレンダー・掲載情報】',
    `受信：${timestamp} JST`,
    `種類：${allowedKinds.get(kind)}`,
    `名称：${title}`,
    `日付：${date || '未入力'}`,
    `会場・所在地：${venue || '未入力'}`,
    `公式URL：${officialUrl || '未入力'}`,
    `内容・情報源：${details}`,
    `担当者：${contactName}`,
    `返信先：${contactEmail}`,
    '※掲載前に日程・出典・権利関係を確認してください。',
  ].join('\n');
  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ msg_type: 'text', content: { text } }),
      signal: AbortSignal.timeout(10_000),
    });
    const reply = await response.json().catch(() => null);
    if (!response.ok || reply?.code !== 0) return result(request, 502, '通知を送れませんでした。時間をおいて再度お試しください。');
    return result(request, 200, '情報を受け付けました。内容を確認します。');
  } catch {
    return result(request, 502, '通知を送れませんでした。時間をおいて再度お試しください。');
  }
}
