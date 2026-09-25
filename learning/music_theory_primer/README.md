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

Copy an existing section HTML file, update its chapter and navigation links, and keep lesson-specific content inside `.prose`. Add a staff example with a `<div class="notation" data-staff>` element and optional `data-clef` / `data-notes` / `data-tempo` / `data-midi="off"` attributes. External KaTeX and VexFlow assets are loaded from jsDelivr in the section pages that need them.

`data-notes` is a comma-separated list of VexFlow-style tokens, e.g. `c/4/q,e/4/q,g/4/h.` (letter, optional `#`/`b`, octave, duration; append `.` for a dotted duration). Every staff example automatically gets a "Play" button below it that plays the notes through a Tone.js Salamander piano sampler loaded from its CDN. Set `data-tempo` (beats per minute, default `100`) to change playback speed, or `data-midi="off"` to hide the button for a silent example. If the sampler cannot load, playback falls back to the built-in Web Audio oscillator.
