# Abhishek Patel — Portfolio v2 (Quiet Editorial)

A subtle, minimalist personal site. Warm paper background, near-black ink, a single
muted slate-blue accent, serif display type (Fraunces) paired with a clean sans (Inter)
and small monospace labels. No build step, no dependencies — open it and it runs.

This is a **local test site**, separate from your live GitHub Pages repo
(`ABITS2k18.github.io`). Nothing here is published unless you choose to deploy it.

## Structure

```
abhishek-portfolio-v2/
├── index.html        # all sections (intro, about, experience, skills, education, contact)
├── css/styles.css    # the editorial styling + responsive rules
├── js/main.js        # scroll reveal, active-nav highlighting, footer year
└── README.md
```

## Run it

Open `index.html` in a browser, or serve locally (recommended so fonts/paths behave
like production):

```bash
cd abhishek-portfolio-v2
python3 -m http.server 8000
# visit http://localhost:8000
```

## Content sources

All copy was taken from your existing site (https://abits2k18.github.io/):
profile, the three roles (AWS, Linamar, Linamar/Skyjack), skills, tooling, and
education/certifications. Contact details and the Zoom booking link are included.

**LinkedIn:** your profile (linkedin.com/in/abhipatel29) could not be read
automatically — LinkedIn blocks scraping (HTTP 999). If you want to add anything
from it, drop it into these spots in `index.html`:

- **Longer bio / summary** → the `About` section (`<section id="about">`, `.prose`).
- **Recommendations / quotes** → you can add a new section; ask and I'll style a
  quiet pull-quote block to match.
- **Exact employment dates or extra roles** → the `Experience` timeline
  (`<ol class="timeline">`), copy an existing `<li class="job">` block.
- **More certifications** → the `Education & Certifications` list
  (`<ul class="certs">`), copy a `<li class="cert">` block.

## Customize

- **Accent color:** change `--accent` / `--accent-d` in `:root` at the top of
  `css/styles.css` (currently muted slate-blue). Try sage `#6b7d63` or terracotta `#a5674f`.
- **Fonts:** swap the Google Fonts `<link>` in `index.html` and the `--serif` / `--sans`
  variables in the CSS.
- **Sections:** each is a `<section>` in `index.html` with a matching nav link in the
  sidebar; keep the `id` and the nav `href` in sync.

## Deploy (optional)

It's fully static, so any host works — GitHub Pages, Netlify, Vercel, S3. If you later
want this to replace your live site, we can copy these files into the
`ABITS2k18.github.io` repo.
