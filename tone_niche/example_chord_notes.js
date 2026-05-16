/**
 * Example usage of the chord notes and scale finder library
 */

const {
    loadNotesData,
    getChordNotes,
    findScalesForChord
} = require('./chord_notes.js');

async function main() {
    // Load the data first
    await loadNotesData();
    
    console.log('='.repeat(70));
    console.log('CHORD NOTES AND SCALE FINDER - JavaScript Examples');
    console.log('='.repeat(70));
    
    // Example 1: Get notes for various chords
    console.log('\n1. FINDING CHORD NOTES\n' + '-'.repeat(70));
    
    const chords = [
        'C', 'Dm', 'Em7', 'Fmaj7', 'G7', 'Am', 'Bm7b5',
        'C#m', 'Eb7', 'F#maj7', 'Gbaug', 'Bbm7'
    ];
    
    for (const chord of chords) {
        try {
            const notes = getChordNotes(chord);
            console.log(`${chord.padEnd(10)} → ${notes.join(', ')}`);
        } catch (error) {
            console.log(`${chord.padEnd(10)} → Error: ${error.message}`);
        }
    }
    
    // Example 2: Find scales for specific chords
    console.log('\n\n2. FINDING SCALES FOR CHORDS\n' + '-'.repeat(70));
    
    const chordsToAnalyze = ['C', 'Dm7', 'G7'];
    
    for (const chord of chordsToAnalyze) {
        const notes = getChordNotes(chord);
        const scales = findScalesForChord(chord);
        
        console.log(`\n${chord} (${notes.join(', ')})`);
        console.log(`Found in ${scales.length} scales:`);
        
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
                const modeName = mode.charAt(0).toUpperCase() + mode.slice(1);
                console.log(`  ${modeName.padEnd(12)}: ${byMode[mode].join(', ')}`);
            }
        }
    }
    
    // Example 3: Finding common scales for a chord progression
    console.log('\n\n3. SCALES FOR CHORD PROGRESSIONS\n' + '-'.repeat(70));
    
    const progression = ['C', 'Am', 'F', 'G'];
    console.log(`\nProgression: ${progression.join(' → ')}`);
    console.log('\nFinding scales that work for the entire progression...\n');
    
    // Find scales that work for all chords
    let commonScales = findScalesForChord(progression[0]);
    
    for (let i = 1; i < progression.length; i++) {
        const chordScales = findScalesForChord(progression[i]);
        const chordScaleIds = new Set(
            chordScales.map(s => `${s.root}:${s.mode}`)
        );
        
        commonScales = commonScales.filter(s => 
            chordScaleIds.has(`${s.root}:${s.mode}`)
        );
    }
    
    if (commonScales.length > 0) {
        console.log(`Found ${commonScales.length} scales that work for all chords:\n`);
        
        for (const scale of commonScales.slice(0, 7)) {
            const modeName = scale.mode.charAt(0).toUpperCase() + scale.mode.slice(1);
            console.log(`  • ${scale.root} ${modeName}`);
            console.log(`    ${scale.notes.join(' - ')}\n`);
        }
    } else {
        console.log('No single scale works for all chords.');
    }
    
    // Example 4: Complex chords
    console.log('\n4. COMPLEX CHORD EXAMPLES\n' + '-'.repeat(70));
    
    const complexChords = [
        'C7#9',      // Hendrix chord
        'Dm7b5',     // Half-diminished
        'G7alt',     // Altered dominant
        'Fmaj7#11',  // Lydian chord
        'C/E',       // Slash chord
        'Bbm9'       // Minor 9th
    ];
    
    for (const chord of complexChords) {
        const notes = getChordNotes(chord);
        console.log(`\n${chord}: ${notes.join(', ')}`);
    }
    
    // Example 5: Using the results in your application
    console.log('\n\n5. PRACTICAL USAGE IN YOUR APP\n' + '-'.repeat(70));
    console.log(`
// Import the functions
const { loadNotesData, getChordNotes, findScalesForChord } = require('./chord_notes.js');

// Initialize (call once at app startup)
await loadNotesData();

// Get chord notes
const notes = getChordNotes('Cmaj7');
console.log(notes); // ['C', 'E', 'G', 'B']

// Find scales
const scales = findScalesForChord('G7');
scales.forEach(scale => {
    console.log(\`\${scale.root} \${scale.mode}\`);
});

// In a web browser:
// 1. Include the script: <script src="chord_notes.js"></script>
// 2. Load data: await loadNotesData();
// 3. Use the functions: const notes = getChordNotes('Am7');
    `);
    
    console.log('\n' + '='.repeat(70) + '\n');
}

// Run the examples
main().catch(console.error);
