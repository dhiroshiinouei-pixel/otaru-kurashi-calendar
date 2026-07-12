# otaru.spady.net 本番公開パッケージ

## 公開URL
https://otaru.spady.net/

## Cloudflare Pages
- Framework preset: None
- Build command: 空欄
- Build output directory: `/`
- Root directory: `/`

## カスタムドメイン
Cloudflare Pages のプロジェクトで `otaru.spady.net` を Custom domains に追加します。
spady.net が同じ Cloudflare アカウントで管理されている場合、確認後にCNAMEが自動作成されます。

## SEO
- canonical: https://otaru.spady.net/
- robots.txt
- sitemap.xml
- OGP / Twitter Card
- WebSite / CollectionPage / Organization のJSON-LD
- 日本語title・description
- `CALENDAR` へスペル修正済み

## 公開後
1. Google Search Consoleでドメインプロパティ `spady.net` またはURLプレフィックス `https://otaru.spady.net/` を確認
2. `https://otaru.spady.net/sitemap.xml` を送信
3. URL検査でトップページのインデックス登録をリクエスト
4. Cloudflare Pagesの `*.pages.dev` 側は、可能なら本番ドメインへリダイレクト
