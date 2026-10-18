# portfolio-website

Personal portfolio and CV site of Maksim Kunaev, built with Nuxt 3 and deployed
as a static site to GitHub Pages.

Live site: [maksimkunaev.com](https://maksimkunaev.com)

<!-- Add a screenshot or GIF here: docs/screenshot.png -->

## What it does

- Single-page CV with Bio, About, Experience, Skills, Projects and Contact
  sections, all driven by data in `constants/cv.js`.
- Project cards with image sliders (screenshots in `public/projects/`).
- NeuroOrb: an animated SVG particle-network visualization, also available as
  its own page at `/projects/neuro-orb`.
- SEO / Open Graph / Twitter meta tags generated from the CV data
  (`constants/meta-tags.js`).
- Client-side rendered (`ssr: false`) and prerendered to static HTML with
  `nuxi generate`.

## Tech stack

- Nuxt 3 (Vue 3), client-side rendering
- Stylus for styles (`assets/css/`), CSS variables for theming
- `push-dir` to publish the generated site to the `gh-pages` branch

## Getting started

Requires Node.js 20.9+ (Nuxt 3.17 supports `^20.9.0 || >=22`).

```bash
npm install
npm run dev          # dev server with hot reload at http://localhost:3000
```

### Static build

```bash
cp .env.example .env  # set DOMAIN
npm run generate      # outputs .output/public, then writes CNAME + .nojekyll
npx serve .output/public   # preview the static build locally
```

`npm run generate` runs `create-cname.js` afterwards (`postgenerate`), which
exits with an error if `DOMAIN` is not set.

Environment variables:

- `DOMAIN`: custom domain written to `CNAME` for GitHub Pages. Use the bare
  domain (for example `example.com`), without `https://`.

### Deploy

```bash
npm run full-deploy   # generate + CNAME + push .output/public to gh-pages
```

`npm run deploy` alone pushes an existing `.output/public` to the `gh-pages`
branch.

## Project structure

```
portfolio-website/
├── pages/
│   ├── index.vue               # renders the CV sections in order
│   └── projects/neuro-orb.vue  # standalone NeuroOrb page
├── components/                 # Bio, About, Experience, Skills, Projects, Contact,
│                               # NeuroOrb, ImageSlider, Theme, TheHeader, ...
├── constants/
│   ├── cv.js                   # all CV content: sections, jobs, skills, projects, socials
│   └── meta-tags.js            # <head> title and SEO / social tags
├── layouts/                    # default + error layouts
├── assets/css/                 # Stylus variables, fonts, reset, global styles
├── public/                     # favicon, photo, project screenshots
├── nuxt.config.js
└── create-cname.js             # post-generate: writes CNAME and .nojekyll
```

To update the content of the site, edit `constants/cv.js`.

## Notes

- `test.html` is an old static HTML snapshot of the page and is not used by the
  build.

## License

[MIT](LICENSE)
