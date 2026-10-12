# Nepal Don Bosco School & College — React concept

A local React/Vite redesign of the [current school website](https://nepaldonbosco.com/). It uses the school's imagery and public page content in a new responsive layout. No hosted site or backend is required.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite, usually `http://127.0.0.1:5173/`. To make a production bundle, run `npm run build`. Output goes to `dist/`. If you deploy it later, set up an SPA fallback to `index.html` so direct page URLs refresh correctly.

## What's included

- A story-led homepage with rotating photography, a pathway explorer, interactive Salesian principles, a photo rail and admission calls to action.
- Purpose-built +2 programme pages with subject group tabs, plus interactive school and +2 admissions pages.
- Searchable staff directory, facility spotlight, accordions for rules, and a searchable school bus route list.
- Site-wide page search, responsive mega navigation, mobile menu, scroll reveals, transitions, photo albums and a gallery lightbox.
- All main destinations from the current site's navigation: Home; About (8 pages); School (6); +2 (6); photo and video galleries; Alumni; Downloads; Contact. Gallery album routes are included too.

The route map is in `src/App.jsx`. The homepage is in `src/NextHome.jsx`; the programme, history, Don Bosco and rules experiences are in `src/CuratedPages.jsx`. Styling is in `src/styles.css`, `src/next.css` and `src/inner.css`. Adapted source text is in `src/source-content.json`; images are in `public/images/`.

## Content to verify before an official launch

Ask the school to confirm current staff and council names, admission dates and requirements, scholarships, policies, bus routes, contact details and available publications. Longer source details remain accessible in expandable sections where useful. The current Downloads page lists no downloadable files; this concept links to the existing annual report and admissions pages. The old site's alumni text refers to a different Don Bosco institution, so this concept directs alumni to the school office. The Rector Major and Provincial content was updated using [Don Bosco South Asia's February 2026 announcement](https://donboscosouthasia.org/News-Info?id=12033&title=Fr.-Sunil-Kerketta-Installed-as-18th-Provincial-of-Kolkata-Salesians).
