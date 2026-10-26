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

- `Bizethics/web.html`: page markup, inline CSS, and browser JavaScript.
- `Bizethics/webbiz.css`: currently an empty stylesheet; the page does not load it.
- `Bizethics/images/`: project photographs.
- `CONTRIBUTING.md`: team branching, review, and Claude Code workflow.

There is no backend, database, or shared submission service. Wishes and hugs are stored only in each visitor's browser using localStorage. Google Fonts and the embedded YouTube player require internet access.

## Current placeholders

The bank details, YouTube `VIDEO_ID`, and financial entries are demonstration content. `images/qr.png` is referenced but is not supplied. Replace and verify these before using the site for real donations or publishing it as a live campaign.

## Check changes

There is no automated test suite. Preview desktop and mobile widths, verify images and navigation, and try the thank-you wall, hug button, quote button, donation amount buttons, image viewer, and clipboard action. Check the browser console for new errors. Include relevant screenshots and checks in your pull request.

## Collaborate

Read [CONTRIBUTING.md](CONTRIBUTING.md). Use a separate branch per task and request a teammate's approval before merging into `main`. Keep credentials out of source code: all HTML and JavaScript sent to a browser is visible to visitors.
