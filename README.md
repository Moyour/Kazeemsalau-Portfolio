# Kazeem Salau — Portfolio

Static portfolio site for Kazeem Salau, learning experience designer & product designer. Live at https://www.kazeemsalau.com.

## Stack

- React 18 + TypeScript, built with Vite
- Wouter for routing
- Prerendered to static HTML with Puppeteer (`scripts/prerender.mjs`) for SEO
- Served with `serve` from `client/dist`

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # vite build + prerender every route in scripts/prerender.mjs
npm start          # serve client/dist on $PORT (default 3000)
```

When adding a page: add its route in `client/src/App.tsx`, its metadata in `client/src/lib/seo-data.ts`, the path to `ROUTES` in `scripts/prerender.mjs`, and an entry in `client/public/sitemap.xml`.

## Where things live

| Path | What |
|---|---|
| `client/src/pages/` | One file per page (home, work, case studies, products, about, contact) |
| `client/src/components/` | Navigation, footer, case study layout, SCORM player modal, contact form, phone carousel |
| `client/src/lib/track.ts` | GA4 event tracking for email, CV, LinkedIn, hire buttons and course plays |
| `client/public/images/` | Course thumbnails, GrubShelf and Mai Shara screens |
| `client/public/files/` | CV (PDF) |

The contact form posts to [Web3Forms](https://web3forms.com); the public access key is in `client/src/components/contact-form.tsx`.

## Deploy

Railway project **kazeem-portfolio**, service **web**, builds from `main` using `railway.toml` (`npm run build`, then `npm start`).
