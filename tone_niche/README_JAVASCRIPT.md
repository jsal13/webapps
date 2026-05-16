# Chord Notes & Scale Finder - JavaScript

A comprehensive JavaScript library for finding notes in chords and discovering which scales contain those chords.

## Features

- **Get chord notes**: Find all notes in any chord (50+ chord types supported)
- **Find scales**: Discover which scales/modes contain a given chord
- **Enharmonic handling**: Automatically handles enharmonic equivalents (C# = Db, etc.)
- **Works everywhere**: Node.js, browser, or any JavaScript environment

## Supported Chord Types

### Triads
- Major, Minor, Diminished, Augmented, Power chords (5)

### Suspended
- sus2, sus4

### Sixth Chords
- 6, m6, 6/9

### Seventh Chords
- Dominant 7, Major 7, Minor 7, Half-diminished (m7b5), Diminished 7
- Minor-Major 7, 7sus4

### Altered Dominants
- 7#5, 7b5, 7#9, 7b9, 7#11, 7b13, 7alt

### Extended Chords
- 9th, 11th, 13th (with major, minor, and dominant variants)
- add9, madd9, add11

### Augmented Variations
- augmaj7, maj7#5, maj7#11

### Slash Chords
- C/E, Dm7/C, etc.

## Installation

Simply include the files in your project:

```bash
# Copy these files to your project:
# - chord_notes.js
# - notes-and-modes.json
```

## Usage

### Node.js

```javascript
const { loadNotesData, getChordNotes, findScalesForChord } = require('./chord_notes.js');

// Load the data first (call once at startup)
await loadNotesData();

// Get notes in a chord
const notes = getChordNotes('Cmaj7');
console.log(notes); // ['C', 'E', 'G', 'B']

// Find scales that contain a chord
const scales = findScalesForChord('G7');
console.log(scales.length); // 7

// Each scale has: root, mode, and notes
scales.forEach(scale => {
    console.log(`${scale.root} ${scale.mode}`);
    console.log(`Notes: ${scale.notes.join(', ')}`);
});
```

### Browser

```html
<!DOCTYPE html>
<html>
<head>
    <script src="chord_notes.js"></script>
</head>
<body>
    <script>
        // Load data first
        loadNotesData().then(() => {
            // Get chord notes
            const notes = getChordNotes('Am7');
            console.log(notes); // ['A', 'C', 'E', 'G']
            
            // Find scales
            const scales = findScalesForChord('Dm7');
            console.log(`Found ${scales.length} scales`);
        });
    </script>
</body>
</html>
```

See [chord_finder.html](chord_finder.html) for a complete interactive example.

## API Reference

### `loadNotesData()`
Load the notes and modes data. Must be called before using other functions.

```javascript
await loadNotesData();
```

### `getChordNotes(chordSymbol)`
Get the notes in a chord.

**Parameters:**
- `chordSymbol` (string): Chord symbol like "C", "Dm7", "G7", "Fmaj7", etc.

**Returns:** Array of note names

**Examples:**
```javascript
getChordNotes('C')      // ['C', 'E', 'G']
getChordNotes('Dm7')    // ['D', 'F', 'A', 'C']
getChordNotes('G7#9')   // ['G', 'B', 'D', 'F', 'Bb']
getChordNotes('C/E')    // ['E', 'C', 'G']
```

### `findScalesForChord(chordSymbol)`
Find all scales that contain all notes of the chord.

**Parameters:**
- `chordSymbol` (string): Chord symbol

**Returns:** Array of scale objects with `root`, `mode`, and `notes` properties

**Example:**
```javascript
const scales = findScalesForChord('G7');
// Returns:
// [
//   { root: 'C', mode: 'ionian', notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] },
//   { root: 'G', mode: 'mixolydian', notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F'] },
//   ...
// ]
```

### `parseChord(chordSymbol)`
Parse a chord symbol into its components.

**Returns:** Object with `root`, `chordType`, and `bassNote` properties

```javascript
parseChord('Dm7')    // { root: 'D', chordType: 'm7', bassNote: null }
parseChord('C/E')    // { root: 'C', chordType: 'major', bassNote: 'E' }
```

### `normalizeNote(note)`
Normalize a note name for comparison (handles enharmonic equivalents).

```javascript
normalizeNote('C#')  // 'C#'
normalizeNote('Db')  // 'C#' (same as C#)
normalizeNote('E#')  // 'F'
```

## Chord Notation Examples

| Notation | Description |
|----------|-------------|
| `C` | C major |
| `Cm` or `Cmin` | C minor |
| `C7` | C dominant 7th |
| `Cmaj7` or `CM7` | C major 7th |
| `Cm7` | C minor 7th |
| `Cdim` or `C°` | C diminished |
| `Caug` or `C+` | C augmented |
| `Csus4` | C suspended 4th |
| `C7#9` | C dominant 7 sharp 9 (Hendrix chord) |
| `Cm7b5` or `Cø` | C half-diminished |
| `C/E` | C major with E in the bass |
| `Cmaj9` | C major 9th |
| `C6/9` | C sixth add 9 |

## Examples

### Example 1: Find compatible scales for soloing

```javascript
const chord = 'Am7';
const scales = findScalesForChord(chord);

console.log(`Scales you can use to solo over ${chord}:`);
scales.slice(0, 5).forEach(scale => {
    console.log(`- ${scale.root} ${scale.mode}`);
});
```

### Example 2: Find common scales for a progression

```javascript
const progression = ['C', 'Am', 'F', 'G'];

// Find scales that work for all chords
let commonScales = findScalesForChord(progression[0]);

for (let i = 1; i < progression.length; i++) {
    const chordScales = findScalesForChord(progression[i]);
    const scaleIds = new Set(
        chordScales.map(s => `${s.root}:${s.mode}`)
    );
    commonScales = commonScales.filter(s => 
        scaleIds.has(`${s.root}:${s.mode}`)
    );
}

console.log(`${commonScales.length} scales work for the entire progression`);
```

### Example 3: Analyze a complex chord

```javascript
const chord = 'G7alt';
const notes = getChordNotes(chord);
console.log(`${chord} contains: ${notes.join(', ')}`);
// G7alt contains: G, B, F, Ab, Bb, Db, Eb
```

## Files

- **chord_notes.js** - Main library
- **notes-and-modes.json** - Musical data (all notes and modes)
- **example_chord_notes.js** - Node.js usage examples
- **chord_finder.html** - Interactive browser demo

## Run Examples

```bash
# Node.js examples
node example_chord_notes.js

# Quick test
node chord_notes.js

# Browser example
# Open chord_finder.html in your browser
```

## Musical Modes

The library includes all 7 modes of the major scale:

1. **Ionian** - Major scale (1 2 3 4 5 6 7)
2. **Dorian** - Minor with raised 6th (1 2 ♭3 4 5 6 ♭7)
3. **Phrygian** - Minor with lowered 2nd (1 ♭2 ♭3 4 5 ♭6 ♭7)
4. **Lydian** - Major with raised 4th (1 2 3 ♯4 5 6 7)
5. **Mixolydian** - Major with lowered 7th (1 2 3 4 5 6 ♭7)
6. **Aeolian** - Natural minor scale (1 2 ♭3 4 5 ♭6 ♭7)
7. **Locrian** - Diminished scale (1 ♭2 ♭3 4 ♭5 ♭6 ♭7)

## License

Free to use for any purpose.
