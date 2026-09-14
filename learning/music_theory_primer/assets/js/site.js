import { Formatter, Renderer, Stave, StaveNote, Voice } from "https://esm.sh/vexflow@5.0.0";

const SEMITONES_FROM_C = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
const BEATS_BY_BASE_DURATION = { w: 4, h: 2, q: 1, 8: 0.5, 16: 0.25, 32: 0.125 };
let sharedAudioContext = null;

// Parses a VexFlow-style note token like "c#/4/q." into { midi, beats }.
function parseNoteToken(token) {
  const [pitch, octaveText, durationText] = token.split("/");
  const letter = pitch[0].toLowerCase();
  const accidental = pitch.slice(1);
  let semitone = SEMITONES_FROM_C[letter];
  if (accidental === "#") semitone += 1;
  if (accidental === "b") semitone -= 1;

  const octave = Number(octaveText);
  const midi = (octave + 1) * 12 + semitone;

  const isDotted = durationText.endsWith(".");
  const baseDuration = isDotted ? durationText.slice(0, -1) : durationText;
  const beats = BEATS_BY_BASE_DURATION[baseDuration] * (isDotted ? 1.5 : 1);

  return { midi, beats };
}

function midiToFrequency(midi) {
  return 440 * 2 ** ((midi - 69) / 12);
}

// Plays a sequence of note tokens as short triangle-wave tones, one after another.
function playNoteTokens(tokens, bpm, volume) {
  if (!sharedAudioContext) {
    sharedAudioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  const context = sharedAudioContext;
  if (context.state === "suspended") context.resume();

  const secondsPerBeat = 60 / bpm;
  let startTime = context.currentTime + 0.05;

  tokens.forEach((token) => {
    const { midi, beats } = parseNoteToken(token);
    const duration = beats * secondsPerBeat;

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "triangle";
    oscillator.frequency.value = midiToFrequency(midi);
    oscillator.connect(gain).connect(context.destination);

    // Short attack/release envelope keeps notes from clicking at the edges.
    const attack = Math.min(0.02, duration / 4);
    const peak = 0.25 * volume;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(peak, startTime + attack);
    gain.gain.setValueAtTime(peak, startTime + duration - attack);
    gain.gain.linearRampToValueAtTime(0, startTime + duration);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
    startTime += duration;
  });

  return tokens.reduce((total, token) => total + parseNoteToken(token).beats, 0) * secondsPerBeat;
}

function attachPlayer(container, tokens, bpm) {
  const player = document.createElement("div");
  player.className = "staff-player";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "staff-player-button";
  button.textContent = "▶ Play";

  const volumeSlider = document.createElement("input");
  volumeSlider.type = "range";
  volumeSlider.className = "staff-player-volume";
  volumeSlider.min = "0";
  volumeSlider.max = "1";
  volumeSlider.step = "0.01";
  volumeSlider.value = "0.7";
  volumeSlider.setAttribute("aria-label", "Playback volume");

  button.addEventListener("click", () => {
    button.disabled = true;
    const seconds = playNoteTokens(tokens, bpm, Number(volumeSlider.value));
    setTimeout(() => { button.disabled = false; }, seconds * 1000);
  });

  player.append(button, volumeSlider);
  container.after(player);
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.renderMathInElement) {
    window.renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\(", right: "\\)", display: false }
      ],
      throwOnError: false
    });
  }

  document.querySelectorAll("[data-staff]").forEach((container) => {
    const renderer = new Renderer(container, Renderer.Backends.SVG);
    renderer.resize(520, 150);
    const context = renderer.getContext();
    const stave = new Stave(10, 20, 480);
    stave.addClef(container.dataset.clef || "treble").setContext(context).draw();

    const noteTokens = (container.dataset.notes || "c/4/q,d/4/q,e/4/q,f/4/q").split(",");
    const notes = noteTokens.map((note) => {
      const [letter, octave, duration] = note.split("/");
      const key = `${letter}/${octave}`;
      return new StaveNote({ keys: [key], duration: duration.replace(/\.$/, "") });
    });
    const totalBeats = noteTokens.reduce((sum, token) => sum + parseNoteToken(token).beats, 0);
    const voice = new Voice({ numBeats: totalBeats, beatValue: 4 });
    voice.addTickables(notes);
    new Formatter().joinVoices([voice]).format([voice], 390);
    voice.draw(context, stave);

    if (container.dataset.midi !== "off") {
      const bpm = Number(container.dataset.tempo) || 100;
      attachPlayer(container, noteTokens, bpm);
    }
  });
});
