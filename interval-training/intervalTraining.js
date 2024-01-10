function mod(n, m) {
    // https://stackoverflow.com/a/17323608
    return ((n % m) + m) % m;
}

const NOTES = [
    "3-a", "3_a", "3_f", "4-f", "4_d", "5-c", "5_b",
    "5_g", "3-c", "3_b", "3_g", "4-g", "4_e", "5-d",
    "5_c", "6_c", "3-d", "3_c", "4-a", "4_a", "4_f",
    "5-f", "5_d", "3-f", "3_d", "4-c", "4_b", "4_g",
    "5-g", "5_e", "3-g", "3_e", "4-d", "4_c", "5-a",
    "5_a", "5_f"
]
const NOTE_VALUES = ["a", "a#", "b", "c", "c#", "d", "d#", "e", "f", "f#", "g", "g#"]

// Used to see if we already got notes, before
// the user resets them.
document.NOTEPACKS = null;

function noteReset() {
    console.log("Resetting...")
    document.NOTEPACKS = null;
}

function getRandomNotes() {
    let randOctave = Math.floor(Math.random() * 2) + 3;
    let randInterval = Math.floor(Math.random() * 24) - 12;

    let randNoteIdx = Math.floor(Math.random() * NOTE_VALUES.length);
    let randStartingNote = NOTE_VALUES[randNoteIdx];

    let randEndingNoteIdx = mod((randNoteIdx + randInterval), 12);
    let randEndingNote = NOTE_VALUES[randEndingNoteIdx];
    var endingOctave = randOctave;  // Set default.

    if ((randNoteIdx + randInterval) > 12) {
        endingOctave = randOctave + 1
    }
    else if ((randNoteIdx + randInterval) < 0) {
        endingOctave = randOctave - 1
    }

    let startingNote = randStartingNote + randOctave;
    let endingNote = randEndingNote + endingOctave;

    return [startingNote, endingNote]
}

function play() {
    const TIME_BETWEEN_NOTES = 500
    if (document.NOTEPACKS === null) {
        document.NOTEPACKS = getRandomNotes()
    }

    // Leave time between notes.
    setTimeout(() => { playNotes(document.NOTEPACKS[0]) }, TIME_BETWEEN_NOTES);
    playNotes(document.NOTEPACKS[1]);
}

function playNotes(note) {
    let noteFile = note.replace("#", "-")
    let audio = new Howl({
        src: [`assets/audio/${noteFile}.mp3`],
        autoplay: false,
        loop: false,
        volume: document.querySelector("#volume-control").value / 100
    });
    audio.play();
}

function getInterval() {
    // This shouldn't happen, but...
    if (document.NOTEPACKS === null) {
        console.warn("Notepack not generated.  Generating one now...")
        document.NOTEPACKS = getRandomNotes()
    }

    let interval = teoria.Interval.between(
        teoria.note(document.NOTEPACKS[0]),
        teoria.note(document.NOTEPACKS[1])
    )

    let intervalValueItem = document.getElementById("interval-val");
    intervalValueItem.innerText = `${interval.type()} ${interval.base()}`.toUpperCase();
}