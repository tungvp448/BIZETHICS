# BIZETHICS — Care for the Carers

A static awareness website supporting the mothers and other carers of children receiving cancer treatment at the National Cancer Hospital in Vietnam. It includes project photos, a thank-you wall, a hug counter, donation information, and a sample financial statement.

## Run locally

```sh
git clone https://github.com/tungvp448/BIZETHICS.git
cd BIZETHICS
```

Open `Bizethics/web.html` in a browser. No package installation or build step is required.

For a consistent localhost origin (recommended for browser storage and clipboard features), install Python 3 and run from the repository root:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

On Windows, use `py` instead of `python` if needed. Visit <http://localhost:8000/Bizethics/web.html>. Stop the server with Ctrl+C.

## Files and behavior

Each tab is its own page:

- `Bizethics/web.html`: home page with the executive summary, KPIs and timeline, photos, video reports, donation progress and the latest blog posts.
- `Bizethics/story.html`: the full project story.
- `Bizethics/thank-you.html` + `thank-you.js`: the wall of faces. Visitors build a simple face, write a letter to their mom, and read others' letters by tapping a face. Ends with our research on the people who write.
- `Bizethics/blog.html`: newspaper-style blog; `blog.html?post=<slug>` opens one article.
- `Bizethics/donate.html`: donation details and the public statement of income and spending.

Shared files:

- `Bizethics/site-data.js`: **edit content here**: KPIs, timeline, video links (Facebook or YouTube), blog posts, bank details and the statement.
- `Bizethics/webbiz.css`: styles for every page.
- `Bizethics/site.js`: menu, hugs, photo viewer, scroll animations and shared helpers.
- `Bizethics/faces.js`: draws the faces and stores the thank-you letters.
- `Bizethics/home.js`: fills the home page from `site-data.js`.
- `Bizethics/images/`: project photographs.
- `CONTRIBUTING.md`: team branching, review, and Claude Code workflow.

## Shared thank-you wall (Supabase)

Letters are shared through a free [Supabase](https://supabase.com) project:

1. Create a project, open **SQL Editor**, paste [`supabase/setup.sql`](supabase/setup.sql) and run it once.
2. Copy the **Project URL** and the **publishable** (or "anon public") key into `SITE.supabase` in `Bizethics/site-data.js`. That key is meant to be public; never put a `secret` or `service_role` key in the site.

`letters` holds the public name, letter and face. Email addresses go to `letter_contacts`, which the website cannot read; the team sees it in Supabase's Table Editor. To hide an unsuitable letter, set its `hidden` column to `true`. Two more private tables collect `subscribers` (the monthly "Read our stories" email list) and `help_requests` (the "Need help? Reach out to us" form on the Donate page); the website can add rows but never read them. Until Supabase is set up, both forms point people to the team's social channels (and to `SITE.contact.email`, if filled in). There is no rate limiting, so check the wall from time to time.

While `SITE.supabase` is empty, letters are stored only in each visitor's browser, with a few sample letters. Hugs always stay in the visitor's browser. Google Fonts and embedded videos require internet access.

## Current placeholders

The bank details, KPI numbers, timeline, blog posts (marked "Draft"), sample letters on the wall and financial entries are demonstration content. Video links are empty, so the home page shows "Coming soon". `images/qr.png` is referenced but is not supplied. Replace and verify these before using the site for real donations or publishing it as a live campaign.

## Check changes

There is no automated test suite. Preview desktop and mobile widths, verify images and navigation, and try the thank-you wall, hug button, quote button, donation amount buttons, image viewer, and clipboard action. Check the browser console for new errors. Include relevant screenshots and checks in your pull request.

## Collaborate

Read [CONTRIBUTING.md](CONTRIBUTING.md). Use a separate branch per task and request a teammate's approval before merging into `main`. Keep credentials out of source code: all HTML and JavaScript sent to a browser is visible to visitors.
