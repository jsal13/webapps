/**
 * Chord Notes and Scale Finder
 * JavaScript implementation for finding chord notes and matching scales
 */

// Load notes and modes data
let notesData = null;

async function loadNotesData() {
    if (notesData) return notesData;
    
    // For Node.js
    if (typeof require !== 'undefined') {
        const fs = require('fs');
        const path = require('path');
        const dataPath = path.join(__dirname, 'notes-and-modes.json');
        notesData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        return notesData;
    }
    
    // For browser
    if (typeof fetch !== 'undefined') {
        const response = await fetch('notes-and-modes.json');
        notesData = await response.json();
        return notesData;
    }
    
    throw new Error('Unable to load notes data');
}

// Synchronous version for when data is already loaded
function getLoadedNotesData() {
    if (!notesData) {
        throw new Error('Notes data not loaded. Call loadNotesData() first.');
    }
    return notesData;
}

/**
 * Get the scale notes for a given root and mode
 */
function getScaleNotes(root, mode = 'ionian') {
    const data = getLoadedNotesData();
    const noteEntry = data.notes.find(entry => entry.root === root);
    return noteEntry ? noteEntry.modes[mode] : null;
}

/**
 * Generate a chromatic scale starting from the root note
 */
function getChromaticScale(root) {
    // Use sharps if root is sharp, flats if root is flat
    const chromatic = root.includes('#')
        ? ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
        : ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    
    // Find the starting position
    const startIdx = chromatic.indexOf(root);
    
    // Rotate the array to start from root
    return [...chromatic.slice(startIdx), ...chromatic.slice(0, startIdx)];
}

/**
 * Get the note at a specific interval (in semitones) from the root
 */
function getInterval(chromaticScale, semitones) {
    return chromaticScale[semitones % 12];
}

/**
 * Parse a chord symbol and return the root note, chord type, and optional bass note
 */
function parseChord(chordSymbol) {
    // Check for slash chord (but not 6/9 which contains a slash)
    let bassNote = null;
    if (chordSymbol.includes('/') && !chordSymbol.includes('6/9')) {
        const parts = chordSymbol.split('/');
        chordSymbol = parts[0];
        bassNote = parts[1];
    }
    
    // Match root note (with optional sharp/flat)
    const rootMatch = chordSymbol.match(/^([A-G][#b]?)/);
    if (!rootMatch) {
        throw new Error(`Invalid chord symbol: ${chordSymbol}`);
    }
    
    const root = rootMatch[1];
    const quality = chordSymbol.slice(root.length).trim();
    const qualityLower = quality.toLowerCase();
    
    let chordType;
    
    // Map quality strings to chord types (order matters - check longer patterns first)
    // Check case-sensitive patterns first
    if (['M7', 'M9', 'M11', 'M13'].includes(quality)) {
        const map = { 'M7': 'maj7', 'M9': 'maj9', 'M11': 'maj11', 'M13': 'maj13' };
        chordType = map[quality];
    } else if (['maj7#11', 'M7#11'].includes(quality)) {
        chordType = 'maj7#11';
    } else if (['maj7#5', 'M7#5', 'maj7+5'].includes(quality)) {
        chordType = 'maj7#5';
    } else if (['mmaj7', 'mM7', 'minmaj7', 'm(maj7)'].includes(qualityLower)) {
        chordType = 'mMaj7';
    } else if (['augmaj7', '+maj7', '+M7'].includes(qualityLower)) {
        chordType = 'augmaj7';
    } else if (['m7b5', 'min7b5', 'ø', 'ø7'].includes(qualityLower)) {
        chordType = 'm7b5';
    } else if (['dim7', 'o7', '°7'].includes(qualityLower)) {
        chordType = 'dim7';
    } else if (['7sus4', '7sus'].includes(qualityLower)) {
        chordType = '7sus4';
    } else if (['7#5', '7+5', 'aug7', '+7'].includes(quality)) {
        chordType = '7#5';
    } else if (quality === '7b5') {
        chordType = '7b5';
    } else if (quality === '7#9') {
        chordType = '7#9';
    } else if (quality === '7b9') {
        chordType = '7b9';
    } else if (quality === '7alt') {
        chordType = '7alt';
    } else if (quality === '7#11') {
        chordType = '7#11';
    } else if (quality === '7b13') {
        chordType = '7b13';
    } else if (['maj7', 'major7', 'ma7', 'Δ7'].includes(qualityLower)) {
        chordType = 'maj7';
    } else if (['maj9', 'major9'].includes(qualityLower)) {
        chordType = 'maj9';
    } else if (['maj11', 'major11'].includes(qualityLower)) {
        chordType = 'maj11';
    } else if (['maj13', 'major13'].includes(qualityLower)) {
        chordType = 'maj13';
    } else if (['m7', 'min7', 'minor7', '-7'].includes(qualityLower)) {
        chordType = 'm7';
    } else if (['m9', 'min9', 'minor9', '-9'].includes(qualityLower)) {
        chordType = 'm9';
    } else if (['m11', 'min11', 'minor11', '-11'].includes(qualityLower)) {
        chordType = 'm11';
    } else if (['m13', 'min13', 'minor13', '-13'].includes(qualityLower)) {
        chordType = 'm13';
    } else if (['m6', 'min6'].includes(qualityLower)) {
        chordType = 'm6';
    } else if (['madd9', 'minadd9'].includes(qualityLower)) {
        chordType = 'madd9';
    } else if (['m', 'min', 'minor', '-'].includes(qualityLower)) {
        chordType = 'minor';
    } else if (['dim', 'o', '°'].includes(qualityLower)) {
        chordType = 'dim';
    } else if (['aug', '+'].includes(qualityLower)) {
        chordType = 'aug';
    } else if (quality === '7') {
        chordType = 'dom7';
    } else if (['sus4', 'sus'].includes(qualityLower)) {
        chordType = 'sus4';
    } else if (qualityLower === 'sus2') {
        chordType = 'sus2';
    } else if (quality === '6/9') {
        chordType = '6/9';
    } else if (quality === '6') {
        chordType = '6';
    } else if (quality === '9') {
        chordType = '9';
    } else if (quality === '11') {
        chordType = '11';
    } else if (quality === '13') {
        chordType = '13';
    } else if (['add9'].includes(qualityLower)) {
        chordType = 'add9';
    } else if (qualityLower === 'add11') {
        chordType = 'add11';
    } else if (quality === '5') {
        chordType = '5';
    } else if (!quality || ['maj', 'major', 'M'].includes(qualityLower)) {
        chordType = 'major';
    } else {
        throw new Error(`Unknown chord quality: ${quality}`);
    }
    
    return { root, chordType, bassNote };
}

/**
 * Return the intervals (in semitones) for a given chord type
 */
function getChordIntervals(chordType) {
    const intervals = {
        // Triads
        'major': [0, 4, 7],
        'minor': [0, 3, 7],
        'dim': [0, 3, 6],
        'aug': [0, 4, 8],
        '5': [0, 7],
        
        // Suspended chords
        'sus4': [0, 5, 7],
        'sus2': [0, 2, 7],
        
        // Sixth chords
        '6': [0, 4, 7, 9],
        'm6': [0, 3, 7, 9],
        '6/9': [0, 4, 7, 9, 14],
        
        // Seventh chords
        'dom7': [0, 4, 7, 10],
        'maj7': [0, 4, 7, 11],
        'm7': [0, 3, 7, 10],
        'm7b5': [0, 3, 6, 10],
        'dim7': [0, 3, 6, 9],
        'mMaj7': [0, 3, 7, 11],
        'augmaj7': [0, 4, 8, 11],
        'maj7#5': [0, 4, 8, 11],
        '7sus4': [0, 5, 7, 10],
        
        // Altered dominant seventh chords
        '7#5': [0, 4, 8, 10],
        '7b5': [0, 4, 6, 10],
        '7#9': [0, 4, 7, 10, 15],
        '7b9': [0, 4, 7, 10, 13],
        '7#11': [0, 4, 7, 10, 18],
        '7b13': [0, 4, 7, 10, 20],
        '7alt': [0, 4, 10, 13, 15, 18, 20],
        
        // Ninth chords
        '9': [0, 4, 7, 10, 14],
        'm9': [0, 3, 7, 10, 14],
        'maj9': [0, 4, 7, 11, 14],
        'add9': [0, 4, 7, 14],
        'madd9': [0, 3, 7, 14],
        
        // Eleventh chords
        '11': [0, 4, 7, 10, 14, 17],
        'm11': [0, 3, 7, 10, 14, 17],
        'maj11': [0, 4, 7, 11, 14, 17],
        'add11': [0, 4, 7, 17],
        'maj7#11': [0, 4, 7, 11, 18],
        
        // Thirteenth chords
        '13': [0, 4, 7, 10, 14, 21],
        'm13': [0, 3, 7, 10, 14, 21],
        'maj13': [0, 4, 7, 11, 14, 21]
    };
    
    return intervals[chordType] || [];
}

/**
 * Given a chord symbol, return the notes in that chord
 */
function getChordNotes(chordSymbol) {
    const { root, chordType, bassNote } = parseChord(chordSymbol);
    const chromatic = getChromaticScale(root);
    const intervals = getChordIntervals(chordType);
    
    if (intervals.length === 0) {
        throw new Error(`No intervals defined for chord type: ${chordType}`);
    }
    
    let notes = intervals.map(interval => getInterval(chromatic, interval));
    
    // Handle slash chords - put bass note first
    if (bassNote) {
        if (notes.includes(bassNote)) {
            // Remove it and put it at the beginning
            notes = [bassNote, ...notes.filter(n => n !== bassNote)];
        } else {
            // Bass note is not in the chord, add it at the beginning
            notes = [bassNote, ...notes];
        }
    }
    
    return notes;
}

/**
 * Normalize note names for comparison (handles enharmonic equivalents)
 */
function normalizeNote(note) {
    // Remove any octave numbers
    note = note.replace(/\d+/g, '');
    
    // Map enharmonic equivalents to a standard form
    const enharmonicMap = {
        'B#': 'C', 'Dbb': 'C',
        'C#': 'C#', 'Db': 'C#',
        'C##': 'D', 'D': 'D', 'Ebb': 'D',
        'D#': 'D#', 'Eb': 'D#', 'Fbb': 'D#',
        'D##': 'E', 'E': 'E', 'Fb': 'E',
        'E#': 'F', 'F': 'F', 'Gbb': 'F',
        'F#': 'F#', 'Gb': 'F#', 'E##': 'F#',
        'F##': 'G', 'G': 'G', 'Abb': 'G',
        'G#': 'G#', 'Ab': 'G#',
        'G##': 'A', 'A': 'A', 'Bbb': 'A',
        'A#': 'A#', 'Bb': 'A#', 'Cbb': 'A#',
        'A##': 'B', 'B': 'B', 'Cb': 'B'
    };
    
    return enharmonicMap[note] || note;
}

/**
 * Given a chord, find all root/mode combinations that contain all the chord's notes
 */
function findScalesForChord(chordSymbol) {
    // Get the notes in the chord
    const chordNotes = getChordNotes(chordSymbol);
    
    // Normalize chord notes for comparison
    const normalizedChordNotes = new Set(chordNotes.map(note => normalizeNote(note)));
    
    // Load the scales data
    const data = getLoadedNotesData();
    
    const matchingScales = [];
    
    // Iterate through all root notes and modes
    for (const noteEntry of data.notes) {
        const root = noteEntry.root;
        for (const [mode, scaleNotes] of Object.entries(noteEntry.modes)) {
            // Normalize scale notes for comparison
            const normalizedScaleNotes = new Set(scaleNotes.map(note => normalizeNote(note)));
            
            // Check if all chord notes are in the scale
            const allNotesPresent = [...normalizedChordNotes].every(note => 
                normalizedScaleNotes.has(note)
            );
            
            if (allNotesPresent) {
                matchingScales.push({
                    root: root,
                    mode: mode,
                    notes: scaleNotes
                });
            }
        }
    }
    
    return matchingScales;
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadNotesData,
        getLoadedNotesData,
        getScaleNotes,
        getChromaticScale,
        getInterval,
        parseChord,
        getChordIntervals,
        getChordNotes,
        normalizeNote,
        findScalesForChord
    };
}

// Example usage (will run if executed directly in Node.js)
if (typeof require !== 'undefined' && require.main === module) {
    (async () => {
        await loadNotesData();
        
        console.log('='.repeat(50));
        console.log('CHORD NOTES EXAMPLES');
        console.log('='.repeat(50));
        
        const testChords = ['C', 'Dm7', 'G7', 'Fmaj7', 'Am7b5', 'C/E'];
        
        for (const chord of testChords) {
            const notes = getChordNotes(chord);
            console.log(`\n${chord}: ${notes.join(', ')}`);
        }
        
        console.log('\n' + '='.repeat(50));
        console.log('SCALE FINDER EXAMPLE');
        console.log('='.repeat(50));
        
        const chordToAnalyze = 'G7';
        console.log(`\nFinding scales for ${chordToAnalyze}...`);
        const scales = findScalesForChord(chordToAnalyze);
        console.log(`Found ${scales.length} scales:\n`);
        
        // Group by mode
        const byMode = {};
        for (const scale of scales) {
            if (!byMode[scale.mode]) {
                byMode[scale.mode] = [];
            }
            byMode[scale.mode].push(scale.root);
        }
        
        const modeOrder = ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian'];
        for (const mode of modeOrder) {
            if (byMode[mode]) {
                console.log(`  ${mode.charAt(0).toUpperCase() + mode.slice(1)}: ${byMode[mode].join(', ')}`);
            }
        }
    })();
}
