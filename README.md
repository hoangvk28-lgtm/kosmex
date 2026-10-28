# Kosmex Plywood — website

Next.js 15 (App Router, static export) · TypeScript · Tailwind CSS 4 · Netlify.

## Develop
    npm install
    npm run dev            # http://localhost:3000
    npm run build          # static site -> out/
    npm run images         # regenerate WebP from assets-src/ (needs Python + Pillow)

## Content (edit here, not in components)
| File | Holds |
|---|---|
| src/content/site.ts | Company facts, contact, verification-status labels |
| src/content/products.ts | 4 categories / 12 products, specs with source + status |
| src/content/documents.ts | Document library (PDFs in public/documents/) |
| src/content/markets.ts | 8 EU market pages |
| src/content/quality.ts | QC stages, machines |
| src/content/resources.ts | Articles, FAQ |

Spec rows carry `status`: `verified` (lab report), `declared` (Kosmex TDS/website), `pending` (value hidden).
Never put an unverified number in a `pending` row — change status only with a source.

## Deploy to Netlify
1. Push this folder to a Git repo; in Netlify "Add new site → Import". Settings come from netlify.toml
   (build `npm run build`, publish `out`, Node 20).
2. Set the final domain in `src/content/site.ts` (SITE_URL) — canonicals, sitemap and schema use it.
3. Forms → enable form detection. The RFQ is defined in public/__forms.html (form name `rfq`).
   Add an email notification to the sales inbox, send a test, then set
   `NEXT_PUBLIC_RFQ_LIVE = "true"` in netlify.toml to remove the preview notice.
4. Search: submit https://<domain>/sitemap.xml in Google Search Console and Bing Webmaster Tools;
   add verification tokens in src/app/layout.tsx (`metadata.verification`).
5. IndexNow (Bing): after each production deploy run `node scripts/indexnow.mjs`.

No server runtime is used, so every route is a static HTML file; 404s use out/404.html.

## Deploying on Vercel

1. Import the GitHub repo in Vercel (framework: Next.js, defaults are fine). `vercel.json` carries the cache/security headers and redirects that `netlify.toml` provides on Netlify.
2. RFQ form: Netlify Forms does not exist on Vercel. Create a free access key at https://web3forms.com (enter the sales inbox, e.g. anna@kosmexgroup.com), then in Vercel → Project → Settings → Environment Variables add:
   - `NEXT_PUBLIC_WEB3FORMS_KEY` = the access key
   - `NEXT_PUBLIC_RFQ_LIVE` = `true` (after a test submission arrives; removes the preview notice)
   Redeploy after adding variables. Without a key the form shows an error with the sales email, never a fake success. File attachments are not delivered on the Web3Forms free plan; the email notes the file name instead.
