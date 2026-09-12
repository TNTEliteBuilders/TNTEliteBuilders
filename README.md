# TNT Elite Builders

The official website for TNT Elite Builders, a Texas general contractor specializing in custom homes, remodeling, and commercial construction.

Live site: https://tntelitebuilders.com

## Tech stack

- React 18 with React Router 6
- Vite 5 for the build and dev server, prerendered to static HTML
- Deployed to GitHub Pages via GitHub Actions

## Local development

Requires Node 20 or newer.

```
npm install
npm run dev       # dev server at http://localhost:8080
npm run build     # production build to dist/
npm run preview   # preview the production build
```

## Project structure

- `src/` — the React application
  - `data/` — site content as data: `home.json` (copy, services, FAQs) and `business.json` (contact and service-area facts used in the SEO schema)
  - `sections/`, `chrome/`, `ui/`, `reviews/` — components
  - `seo.js` — structured data and meta tags, derived from the data files
  - `omnitok/` — the quote and review submission endpoint
- `public/` — static assets served as-is (images, icons, videos, reviews, robots.txt, llms.txt, manifest, CNAME)
- `tools/` — build-time prerender and sitemap generation

## Editing content

Most changes are data, not code. Update `src/data/home.json` for page copy, services, and FAQs, and `src/data/business.json` for the contact details and service area used across the SEO schema.

## Deploying

Pushing to `main` triggers the GitHub Actions workflow at `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. In the repository settings, Pages must be set to build from GitHub Actions.
