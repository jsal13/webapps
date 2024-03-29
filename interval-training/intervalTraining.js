// Used to see if we already got notes.
// Of the form [startNote, endNote, interval].
document.NOTEPACKS = null;

// Synth for tone.js.
document.SYNTH = null;
document.SYNTH_NAME = null;

function synthInit(synthName, volume) {
    // synthName can be one of:
    // ["standard", "amsynth", "fmsynth", "monosynth"]
    if ((document.SYNTH === null) || (document.SYNTH_NAME !== synthName)) {
        document.SYNTH_NAME = synthName;
        switch (synthName) {
            case "standard":
                document.SYNTH = new Tone.Synth().toDestination();
                break;
            case "fmsynth":
                document.SYNTH = new Tone.FMSynth().toDestination();
                break;
            case "amsynth":
                document.SYNTH = new Tone.AMSynth().toDestination();
                break;
            case "monosynth":
                document.SYNTH = new Tone.MonoSynth().toDestination();
                break;
            default:
                document.SYNTH = new Tone.Synth().toDestination();
                break;
        }
    }
    document.SYNTH.volume.value = volume;
}

function noteReset() {
    console.log("Resetting...")
    document.NOTEPACKS = null;
}

function generateNotePacksIfNull() {
    if (document.NOTEPACKS === null) {
        console.warn("Notepack not generated.  Generating one now...")
        document.NOTEPACKS = getRandomNotes()

        // Assign the interval to the relevant p-tag.
        let intervalValueItem = document.getElementById("interval-val");
        intervalValueItem.innerText = `${document.NOTEPACKS[2]}`
    }
}

function getCurrentNotes() {
    generateNotePacksIfNull()
    return [document.NOTEPACKS[0], document.NOTEPACKS[1]]
}

function getRandomNotes() {
    // TODO: We have to have a lower bound here.
    let randInterval = Math.floor(Math.random() * 24) - 12;

    let randNoteIdx = Math.floor(Math.random() * NOTES.length);
    let randStartingNote = NOTES[randNoteIdx];
    let startingOctave = Math.floor(Math.random() * 2) + 3;

    let startingNoteStr = randStartingNote + startingOctave.toString();

    let startingNoteOctaveIndex = NOTES_WITH_OCTAVE.indexOf(startingNoteStr)
    let endingNoteStr = NOTES_WITH_OCTAVE[startingNoteOctaveIndex + randInterval]

    if (randInterval < 0) {
        let positiveRandInterval = 12 - Math.abs(randInterval);
    } else {
        let positiveRandInterval = randInterval;
    }
    let intervalName = SEMITONE_TO_INTERVAL_MAPPING[positiveRandInterval]

    console.log("Notes:", startingNoteStr, endingNoteStr, "Interval:", randInterval)

    if ((startingNoteStr === undefined) || (endingNoteStr === undefined)) {
        getRandomNotes()
    }
    else {
        return [startingNoteStr, endingNoteStr, intervalName]
    }
}

function playNote(note) {
    document.SYNTH.triggerAttackRelease(note.toUpperCase(), "8n");
}

function playNotes(ascendingOnly, synthName, volume) {
    var notes = getCurrentNotes()
    var note0 = notes[0];
    var note1 = notes[1];


    if (ascendingOnly) {
        idx0 = NOTES_WITH_OCTAVE.indexOf(notes[0])
        idx1 = NOTES_WITH_OCTAVE.indexOf(notes[1])

        if (idx1 > idx0) {
            note0 = notes[1]
            note1 = notes[0]
        }
    }

    // Init the synth.
    synthInit(synthName, volume);

    // Leave time between notes.
    setTimeout(() => { playNote(note0, synthName) }, TIME_BETWEEN_NOTES);
    playNote(note1, synthName);
}
