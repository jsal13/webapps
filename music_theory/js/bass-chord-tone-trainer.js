const fretboard = document.getElementById('fretboard');
const legend = document.getElementById('legend');
const noteCount = document.getElementById('noteCount');

const strings = [
  { name: 'G', pitch: 7 },
  { name: 'D', pitch: 2 },
  { name: 'A', pitch: 9 },
  { name: 'E', pitch: 4 }
];
const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const majorScale = [0, 2, 4, 5, 7, 9, 11];
const minorScale = [0, 2, 3, 5, 7, 8, 10];
const triadQualities = { major: ['', 'm', 'm', '', '', 'm', 'dim'], minor: ['m', 'dim', '', 'm', 'm', '', ''] };
const seventhQualities = { major: ['maj7', 'm7', 'm7', 'maj7', '7', 'm7', 'm7b5'], minor: ['m7', 'm7b5', 'maj7', 'm7', 'm7', 'maj7', '7'] };
const triadIntervals = { major: [[0, 4, 7], [0, 3, 7], [0, 3, 7], [0, 4, 7], [0, 4, 7], [0, 3, 7], [0, 3, 6]], minor: [[0, 3, 7], [0, 3, 6], [0, 4, 7], [0, 3, 7], [0, 3, 7], [0, 4, 7], [0, 4, 7]] };
const seventhIntervals = { major: [[0, 4, 7, 11], [0, 3, 7, 10], [0, 3, 7, 10], [0, 4, 7, 11], [0, 4, 7, 10], [0, 3, 7, 10], [0, 3, 6, 10]], minor: [[0, 3, 7, 10], [0, 3, 6, 10], [0, 4, 7, 11], [0, 3, 7, 10], [0, 3, 7, 10], [0, 4, 7, 11], [0, 4, 7, 10]] };
const chordDegreeLabels = {
  3: { major: ['1', '3', '5'], minor: ['1', 'b3', '5'] },
  4: { major: ['1', '3', '5', '7'], minor: ['1', 'b3', '5', 'b7'] }
};
const chordSymbols = {
  '': { intervals: [0, 4, 7], degrees: ['1', '3', '5'] },
  m: { intervals: [0, 3, 7], degrees: ['1', 'b3', '5'] },
  dim: { intervals: [0, 3, 6], degrees: ['1', 'b3', 'b5'] },
  aug: { intervals: [0, 4, 8], degrees: ['1', '3', '#5'] },
  sus2: { intervals: [0, 2, 7], degrees: ['1', '2', '5'] },
  sus4: { intervals: [0, 5, 7], degrees: ['1', '4', '5'] },
  '7': { intervals: [0, 4, 7, 10], degrees: ['1', '3', '5', 'b7'] },
  maj7: { intervals: [0, 4, 7, 11], degrees: ['1', '3', '5', '7'] },
  m7: { intervals: [0, 3, 7, 10], degrees: ['1', 'b3', '5', 'b7'] },
  m7b5: { intervals: [0, 3, 6, 10], degrees: ['1', 'b3', 'b5', 'b7'] },
  dim7: { intervals: [0, 3, 6, 9], degrees: ['1', 'b3', 'b5', 'bb7'] },
  add9: { intervals: [0, 4, 7, 14], degrees: ['1', '3', '5', '9'] },
  madd9: { intervals: [0, 3, 7, 14], degrees: ['1', 'b3', '5', '9'] },
  '9': { intervals: [0, 4, 7, 10, 14], degrees: ['1', '3', '5', 'b7', '9'] },
  m9: { intervals: [0, 3, 7, 10, 14], degrees: ['1', 'b3', '5', 'b7', '9'] },
  maj9: { intervals: [0, 4, 7, 11, 14], degrees: ['1', '3', '5', '7', '9'] },
  '11': { intervals: [0, 4, 7, 10, 14, 17], degrees: ['1', '3', '5', 'b7', '9', '11'] },
  m11: { intervals: [0, 3, 7, 10, 14, 17], degrees: ['1', 'b3', '5', 'b7', '9', '11'] },
  '13': { intervals: [0, 4, 7, 10, 14, 21], degrees: ['1', '3', '5', 'b7', '9', '13'] },
  m13: { intervals: [0, 3, 7, 10, 14, 21], degrees: ['1', 'b3', '5', 'b7', '9', '13'] }
};
const difficultyProfiles = {
  easy: ['triads'],
  medium: ['sevenths', 'add9'],
  hard: ['extended', 'parallel']
};

const dimensions = { width: 1200, height: 240, left: 78, right: 28, top: 34, bottom: 24 };
const neckWidth = dimensions.width - dimensions.left - dimensions.right;
const neckHeight = dimensions.height - dimensions.top - dimensions.bottom;
const stringGap = neckHeight / (strings.length - 1);
let chordTones = [];
let currentChord = null;

function createSvgElement(tag, attributes = {}) {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  return element;
}

function addText(parent, text, attributes = {}) {
  const element = createSvgElement('text', attributes);
  element.textContent = text;
  parent.appendChild(element);
  return element;
}

function drawFretboard() {
  const visibleFrets = Number(document.getElementById('fretRangeSelect').value) + 1;
  const fretWidth = neckWidth / visibleFrets;
  fretboard.innerHTML = '';
  fretboard.setAttribute('viewBox', `0 0 ${dimensions.width} ${dimensions.height}`);
  fretboard.setAttribute('preserveAspectRatio', 'xMinYMin meet');

  const neck = createSvgElement('rect', { x: dimensions.left, y: dimensions.top, width: neckWidth, height: neckHeight, fill: '#0b1d35' });
  fretboard.appendChild(neck);

  for (let fret = 0; fret <= visibleFrets; fret += 1) {
    const x = dimensions.left + fret * fretWidth;
    const isNut = fret === 0;
    fretboard.appendChild(createSvgElement('line', {
      x1: x, y1: dimensions.top - 1, x2: x, y2: dimensions.top + neckHeight + 1,
      stroke: isNut ? '#80d8e8' : '#aebdc4', 'stroke-width': isNut ? 5 : 1.5, opacity: isNut ? 1 : .62
    }));
    if (fret < visibleFrets) addText(fretboard, String(fret), { x: dimensions.left + (fret + .5) * fretWidth, y: 14, 'text-anchor': 'middle', class: 'fret-label' });
  }

  [3, 5, 7, 9, 15, 17, 19].filter(fret => fret < visibleFrets).forEach(fret => {
    const x = dimensions.left + (fret + .5) * fretWidth;
    fretboard.appendChild(createSvgElement('circle', { cx: x, cy: dimensions.top + neckHeight / 2, r: 3.5, fill: '#9bc9dc', opacity: .7 }));
  });
  if (12 < visibleFrets) {
    const octaveX = dimensions.left + (12 + .5) * fretWidth;
    [dimensions.top + neckHeight * .36, dimensions.top + neckHeight * .64].forEach(y => {
      fretboard.appendChild(createSvgElement('circle', { cx: octaveX, cy: y, r: 3.5, fill: '#80d8e8', opacity: .8 }));
    });
  }

  const noteByPitch = new Map(chordTones.map(note => [note.pitch, note]));
  strings.forEach((string, stringIndex) => {
    const y = dimensions.top + stringIndex * stringGap;
    addText(fretboard, string.name, { x: 35, y: y + 6, 'text-anchor': 'middle', class: 'string-label' });
    fretboard.appendChild(createSvgElement('line', { x1: dimensions.left, y1: y, x2: dimensions.left + neckWidth, y2: y, stroke: '#d6ddd3', 'stroke-width': 2.5 + stringIndex * .8, opacity: .9 }));

    for (let fret = 0; fret < visibleFrets; fret += 1) {
      const pitch = (string.pitch + fret) % 12;
      const note = noteByPitch.get(pitch);
      if (!note) continue;
      const x = dimensions.left + (fret + .5) * fretWidth;
      const group = createSvgElement('g', { class: note.degree === '1' ? 'note-marker root-marker' : 'note-marker' });
      group.appendChild(createSvgElement('circle', { cx: x, cy: y, r: 16 }));
      addText(group, note.degree, { x, y: y + 5, 'text-anchor': 'middle', class: 'degree-label' });
      group.setAttribute('aria-label', `${string.name} string, fret ${fret}, ${note.name}, scale degree ${note.degree}`);
      fretboard.appendChild(group);
    }
  });

  strings.forEach((string, index) => {
    const y = dimensions.top + index * stringGap;
    addText(fretboard, index === 0 ? 'high' : index === strings.length - 1 ? 'low' : '', { x: 1194, y: y + 4, 'text-anchor': 'end', class: 'range-label' });
  });
}

function drawLegend() {
  legend.innerHTML = '';
  chordTones.forEach(note => {
    const item = document.createElement('span');
    item.className = 'legend-item';
    item.innerHTML = `<span class="legend-dot">${note.degree}</span>${note.name}`;
    legend.appendChild(item);
  });
  noteCount.textContent = String(document.querySelectorAll('.note-marker').length);
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function formatExtension(quality, extension) {
  const suffix = extension.name;
  if (quality === '7') return suffix;
  if (quality === 'maj7') return `maj${suffix}`;
  if (quality === 'm7') return `m${suffix}`;
  return `${quality}add${suffix}`;
}

function makeChord(keyPitch, mode, degreeIndex, source) {
  const scalePitches = mode === 'major' ? majorScale : minorScale;
  const rootPitch = (keyPitch + scalePitches[degreeIndex]) % 12;
  let intervals;
  let quality;
  let labels;
  if (source === 'triads') {
    intervals = triadIntervals[mode][degreeIndex];
    quality = triadQualities[mode][degreeIndex];
    labels = quality === 'dim' ? ['1', 'b3', 'b5'] : chordDegreeLabels[3][quality === 'm' ? 'minor' : 'major'];
  } else if (source === 'add9') {
    intervals = [...triadIntervals[mode][degreeIndex], 14];
    quality = `${triadQualities[mode][degreeIndex]}add9`;
    const triadLabelSet = triadQualities[mode][degreeIndex] === '' ? 'major' : 'minor';
    labels = [...chordDegreeLabels[3][triadLabelSet], '9'];
  } else {
    intervals = seventhIntervals[mode][degreeIndex];
    quality = seventhQualities[mode][degreeIndex];
    labels = quality === 'maj7' || quality === '7' ? ['1', '3', '5', '7'] : quality === 'm7b5' ? ['1', 'b3', 'b5', 'b7'] : ['1', 'b3', '5', 'b7'];
  }
  if (source === 'extended') {
    const extension = randomItem([{ name: '9', interval: 14, label: '9' }, { name: '11', interval: 17, label: '11' }, { name: '13', interval: 21, label: '13' }]);
    intervals = [...seventhIntervals[mode][degreeIndex], extension.interval];
    quality = formatExtension(seventhQualities[mode][degreeIndex], extension);
    labels = [...(seventhQualities[mode][degreeIndex] === 'maj7' || seventhQualities[mode][degreeIndex] === '7' ? ['1', '3', '5', '7'] : ['1', 'b3', '5', 'b7']), extension.label];
  }
  const tones = intervals.map((interval, index) => ({ pitch: (rootPitch + interval) % 12, name: noteNames[(rootPitch + interval) % 12], degree: labels[index] || String(index + 1) }));
  return { rootPitch, rootName: noteNames[rootPitch], quality, tones, mode };
}

function parseChordInput(value) {
  const match = value.trim().match(/^([A-Ga-g])([#b]?)(.*)$/);
  if (!match) throw new Error('Use a chord such as G7, Dm9, or Cmaj7.');
  const rootName = `${match[1].toUpperCase()}${match[2]}`;
  const rootPitch = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 }[rootName];
  const quality = match[3].toLowerCase() === 'major' ? '' : match[3].toLowerCase() === 'minor' ? 'm' : match[3].toLowerCase();
  if (rootPitch === undefined || !chordSymbols[quality]) throw new Error('That chord quality is not supported yet.');
  const symbol = chordSymbols[quality];
  return { rootName: noteNames[rootPitch], quality, rootPitch, tones: symbol.intervals.map((interval, index) => ({ pitch: (rootPitch + interval) % 12, name: noteNames[(rootPitch + interval) % 12], degree: symbol.degrees[index] })) };
}

function showChord(chord, keyLabel = 'Custom chord') {
  currentChord = chord;
  chordTones = chord.tones;
  document.getElementById('chordName').textContent = `${chord.rootName}${chord.quality}`;
  document.getElementById('keyName').textContent = keyLabel;
  document.getElementById('chordNotes').textContent = chord.tones.map(note => note.name).join(' · ');
  document.getElementById('chordDegrees').textContent = chord.tones.map(note => note.degree).join(' · ');
  const visibleFret = Number(document.getElementById('fretRangeSelect').value);
  document.getElementById('fretRangeLabel').textContent = `Open position through fret ${visibleFret}`;
  document.getElementById('fretCount').textContent = `0-${visibleFret}`;
  fretboard.setAttribute('aria-label', `${chord.rootName}${chord.quality} chord tones on a four-string bass fretboard`);
  drawFretboard();
  drawLegend();
}

function plotTypedChord() {
  const input = document.getElementById('chordInput');
  const message = document.getElementById('inputMessage');
  try {
    showChord(parseChordInput(input.value));
    message.textContent = '';
  } catch (error) {
    message.textContent = error.message;
  }
}

function generateChord() {
  const keyValue = document.getElementById('keySelect').value;
  const difficulty = document.getElementById('difficultySelect').value;
  const source = randomItem(difficultyProfiles[difficulty]);
  const keyPitch = keyValue === 'any' ? Math.floor(Math.random() * 12) : Number(keyValue);
  const mode = source === 'parallel' || difficulty === 'hard' ? randomItem(['major', 'minor']) : 'major';
  const chordSource = source === 'parallel' ? 'triads' : source;
  currentChord = makeChord(keyPitch, mode, Math.floor(Math.random() * 7), chordSource);
  chordTones = currentChord.tones;
  document.getElementById('chordName').textContent = `${currentChord.rootName}${currentChord.quality}`;
  document.getElementById('keyName').textContent = `${noteNames[keyPitch]} ${mode}`;
  document.getElementById('chordNotes').textContent = currentChord.tones.map(note => note.name).join(' · ');
  document.getElementById('chordDegrees').textContent = currentChord.tones.map(note => note.degree).join(' · ');
  const visibleFret = Number(document.getElementById('fretRangeSelect').value);
  document.getElementById('fretRangeLabel').textContent = `Open position through fret ${visibleFret}`;
  document.getElementById('fretCount').textContent = `0-${visibleFret}`;
  fretboard.setAttribute('aria-label', `${currentChord.rootName}${currentChord.quality} chord tones on a four-string bass fretboard`);
  drawFretboard();
  drawLegend();
}

document.getElementById('randomizeButton').addEventListener('click', generateChord);
document.getElementById('keySelect').addEventListener('change', generateChord);
document.getElementById('difficultySelect').addEventListener('change', generateChord);
document.getElementById('fretRangeSelect').addEventListener('change', generateChord);
document.getElementById('plotChordButton').addEventListener('click', plotTypedChord);
document.getElementById('chordInput').addEventListener('keydown', event => {
  if (event.key === 'Enter') plotTypedChord();
});
generateChord();
