const NOTES = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"]

const SEMITONE_TO_INTERVAL_MAPPING = {
    0: "Perfect unison (P1)",
    1: "Minor second (m2)",
    2: "Major second (M2)",
    3: "Minor third (m3)",
    4: "Major third (M3)",
    5: "Perfect fourth (P4)",
    6: "Augmented fourth / Diminished fifth (A4 / d5)",
    7: "Perfect fifth (P5)",
    8: "Minor sixth (m6)",
    9: "Major sixth (M6)",
    10: "Minor seventh (m7)",
    11: "Major seventh (M7)",
    12: "Perfect octave (P8)",
}


const NOTES_WITH_OCTAVE = [
    "c2", "c#2", "d2", "d#2", "e2", "f2",
    "f#2", "g2", "g#2", "a2", "a#2", "b2",
    "c3", "c#3", "d3", "d#3", "e3", "f3", "f#3", "g3", "g#3", "a3", "a#3", "b3",
    "c4", "c#4", "d4", "d#4", "e4", "f4", "f#4", "g4", "g#4", "a4", "a#4", "b4",
    "c5", "c#5", "d5", "d#5", "e5", "f5", "f#5", "g5", "g#5", "a5", "a#5", "b5",
    "c6", "c#6", "d6", "d#6", "e6", "f6", "f#6", "g6", "g#6", "a6", "a#6", "b6"
]

const TIME_BETWEEN_NOTES = 500