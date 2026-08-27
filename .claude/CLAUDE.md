# Webapps Repository Context

## Repository

This is a collection of standalone browser web apps. The root entry point is `index.html`, which links to every app. The projects use plain HTML, CSS, and JavaScript; there is no package manager, bundler, framework, or test runner in the repository. Pages are intended to be opened in a browser, and most use relative asset paths. Preserve the existing vanilla-JavaScript style and avoid introducing a build step unless explicitly requested.

Shared visual conventions include Lora and Manrope loaded from Google Fonts on most subpages, CSS custom properties, blue primary controls, light surfaces, and responsive layouts. Keep edits scoped to the app being changed. Check relative paths carefully because each app is served from its own subdirectory.

## Hobbies Projects

### Merit Badge Tracker

- Entry page: `hobbies/merit_badges.html`
- Styles: `hobbies/css/merit_badges.css`
- Data: `hobbies/data/merit_badge_data.js`
- Behavior: `hobbies/js/merit_badges.js`
- Renders a searchable collection of hobby roadmaps. The data contains hobby names plus beginner, intermediate, expert, and capstone requirements.
- `merit_badge_data.js` defines the global `hobbyData` array. `merit_badges.js` renders cards into `#badgeContainer` and filters by hobby name from `#searchBar`.
- The page currently uses an inline `onkeyup="filterBadges()"` handler, so preserve the global function unless migrating the markup and script together.

### Nature Bingo

- Entry page: `hobbies/nature-bingo.html`
- Styles: `hobbies/css/nature-bingo.css`
- Behavior: `hobbies/js/nature-bingo.js`
- Generates a daily-seeded 5x5 nature activity board with a non-toggleable center free space. It displays 24 activities and progress.
- The daily board is deterministic for the current local date. `generateNewBoard()` creates a non-daily random board, although the current entry page does not expose a control for it.
- Progress is stored in `window.currentProgress`, so it lasts only for the current page session and is not persisted in localStorage.
- Main DOM hooks are `#currentDate`, `#progressText`, and `#bingoBoard`.

## Music Theory Projects

### Chord Notes and Scale Finder

- Entry page: `music_theory/chord_finder.html`
- Styles: `music_theory/css/chord-finder.css`
- Logic: `music_theory/js/chord_notes.js` plus inline page logic
- Data: `music_theory/data/notes-and-modes.json`
- Uses D3 v7 from `https://d3js.org/d3.v7.min.js` to draw an interactive chromatic wheel and mode rings.
- Loads note/mode data asynchronously on page load. Chord symbols support many qualities and slash chords; `getChordNotes()` and `findScalesForChord()` are the main calculation APIs.
- The standalone JavaScript includes CommonJS exports for Node-oriented use, but the page itself runs in the browser. Keep data paths relative to `music_theory/chord_finder.html`.

### Chord Progression Generator

- Entry page: `music_theory/chord-progression-generator.html`
- Styles: `music_theory/css/chord-progression-generator.css`
- Behavior: `music_theory/js/chord-progression-generator.js`
- Lets the user select one of ten progression patterns and generates a random major/minor interpretation in a random key.
- The script exposes `generateProgression()` globally because the entry button uses an inline `onclick` handler. It also generates an initial progression and regenerates on progression selection changes.
- Key spelling uses a combined sharp/flat key list and prefers accidental spelling based on the root key. Preserve the existing progression data shape when adding patterns.

### Chord Trainer

- Entry page: `music_theory/chord-trainer.html`
- Styles: `music_theory/css/chord-trainer.css`
- Behavior: `music_theory/js/chord-trainer.js`
- Uses Web MIDI to read keyboard note-on/note-off messages and evaluates held notes as a pitch-class set against a randomly selected chord from `music_theory/data/chords.json`.
- Uses Web Audio to create triangle-wave oscillator voices. Audio is initialized by the Enable MIDI button to satisfy browser gesture requirements.
- The `Play oscillator` checkbox is checked by default. When unchecked, new MIDI notes remain available for chord evaluation but do not create oscillator voices; changing it off also fades active voices out.
- `oscillator-octave` changes the generated oscillator pitch only, not the displayed MIDI notes or chord matching.
- Web MIDI and Web Audio require a supported browser and, for MIDI, a connected/authorized device. Keep audio cleanup and note-off handling intact when changing playback behavior.

### Bass Trainer

- Entry page: `music_theory/bass-trainer.html`
- Styles: `music_theory/css/bass-trainer.css`
- Behavior: `music_theory/js/bass-trainer.js`
- Uses Web Audio to analyze a microphone or audio interface input with a 16384-sample FFT, display a live 30-400 Hz bass spectrum, and estimate the nearest musical note.
- Supports a 0.25, 0.5, or 1 second note hold time. Confirmed notes are kept in a recent history of eight and cleared after five seconds of silence.
- The Try demo signal button exercises the visualizer without microphone access. Audio input is not routed to speakers, avoiding feedback.
- Microphone access requires a supported browser and a secure context. For local testing, serve the repository with `python3 -m http.server 4173` and open `http://localhost:4173`.

### Diatonic Chord Reference

- Entry page: `music_theory/diatonic_chord_reference.html`
- Styles: `music_theory/css/diatonic-chord-reference.css`
- Logic is inline in the HTML page; there is no separate JavaScript file.
- Generates diatonic triads, seventh chords, and scales for a selected root and mode. Core tables include modal scale patterns, chord qualities, functions, intervals, and Roman numerals.
- The page uses the `NOTES` array with sharp-oriented spellings and computes notes by semitone interval. Keep the existing data tables synchronized when changing supported modes or chord output.

### Secondary Dominant Practice

- Entry page: `music_theory/secondary-dominant-practice.html`
- Styles: `music_theory/css/chord-progression-generator.css` (shared with Chord Progression Generator)
- Behavior: `music_theory/js/secondary-dominant-practice.js`
- Generates exercises in random major/minor keys targeting IV, V, or iv, displays a ii-V prompt, and optionally reveals the solution.
- Supports key type and target display format controls. It also has a 30-second auto-next timer, enabled by default.
- The entry page uses inline handlers for `generateExercise()`, `toggleSolution()`, and `toggleTimer()`, so those functions must remain global unless the markup is changed at the same time.

## Working And Validation

- There is no configured build or test command. Use browser checks for behavior and the editor diagnostics for syntax/HTML/CSS issues.
- For static pages, verify the page from its actual subdirectory so relative fetches and scripts resolve correctly.
- Avoid changing unrelated apps or shared CSS without checking every consumer. In particular, `music_theory/css/chord-progression-generator.css` serves two different pages.
- Do not add dependencies or a server requirement for small UI changes. External dependencies currently used by the site are Google Fonts and D3 v7.
