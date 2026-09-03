# Music Theory Primer

A dependency-light static textbook scaffold for musicians. Each lesson is an independent HTML page inside `chapters/<chapter>/`.

## Structure

- `index.html`: chapter directory and entry point
- `chapters/`: one HTML document per section
- `assets/css/site.css`: shared responsive and print styles
- `assets/js/site.js`: KaTeX auto-rendering and VexFlow staff rendering
- `.github/agents/`: workspace custom agent for extending the textbook

## Preview

From the project root, run:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Authoring sections

Copy an existing section HTML file, update its chapter and navigation links, and keep lesson-specific content inside `.prose`. Add a staff example with `data-staff` and optional `data-clef` / `data-notes` attributes. External KaTeX and VexFlow assets are loaded from jsDelivr in the section pages that need them.
