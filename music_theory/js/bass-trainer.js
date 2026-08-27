const canvas = document.querySelector("#spectrum");
const context = canvas.getContext("2d");
const startButton = document.querySelector("#startButton");
const demoButton = document.querySelector("#demoButton");
const modeSelect = document.querySelector("#modeSelect");
const noteDurationSelect = document.querySelector("#noteDurationSelect");
const inputSelect = document.querySelector("#inputSelect");
const emptyState = document.querySelector("#emptyState");
const peakFrequency = document.querySelector("#peakFrequency");
const levelValue = document.querySelector("#levelValue");
const detectedNote = document.querySelector("#detectedNote");
const noteFrequency = document.querySelector("#noteFrequency");
const noteHistoryList = document.querySelector("#noteHistory");
const inputStatus = document.querySelector("#inputStatus");
const statusText = document.querySelector("#statusText");
const statusDot = document.querySelector("#statusDot");
const diagnosticText = document.querySelector("#diagnosticText");
const refreshButton = document.querySelector("#refreshButton");

let audioContext;
let analyser;
let source;
let stream;
let animationFrame;
let demoMode = false;
let demoStart;
const fftSize = 16384;
const barCount = 300;
const noteThreshold = 32;
const noteHistoryLimit = 8;
const noteHistorySilence = 5000;
let candidateNote;
let candidateSince = 0;
let registeredNote;
let silenceSince = 0;
const noteHistory = [];
const modes = {
  bass: {
    minimumFrequency: 30,
    maximumFrequency: 400,
    axisLabels: ["30 Hz", "60 Hz", "100 Hz", "200 Hz", "400 Hz"],
  },
};
const noteNames = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];

function getCurrentMode() {
  return modes[modeSelect.value] || modes.bass;
}

function updateModeDisplay() {
  const mode = getCurrentMode();
  document.querySelectorAll(".axis span").forEach((label, index) => {
    label.textContent = mode.axisLabels[index];
  });
}

function resetNote() {
  candidateNote = undefined;
  candidateSince = 0;
  registeredNote = undefined;
  detectedNote.textContent = "--";
  noteFrequency.textContent = "--";
}

function renderNoteHistory() {
  noteHistoryList.replaceChildren();
  if (!noteHistory.length) {
    noteHistoryList.append(Object.assign(document.createElement("li"), {
      className: "history-empty",
      textContent: "--",
    }));
    return;
  }
  noteHistory.forEach((note) => {
    noteHistoryList.append(Object.assign(document.createElement("li"), {
      textContent: note,
    }));
  });
}

function updateNote(frequency, strength) {
  const now = performance.now();
  if (strength < noteThreshold || frequency <= 0) {
    if (!silenceSince) silenceSince = now;
    if (noteHistory.length && now - silenceSince >= noteHistorySilence) {
      noteHistory.length = 0;
      renderNoteHistory();
    }
    resetNote();
    return;
  }
  silenceSince = 0;
  const midi = Math.round(69 + 12 * Math.log2(frequency / 440));
  const note = noteNames[((midi % 12) + 12) % 12];
  if (note !== candidateNote) {
    candidateNote = note;
    candidateSince = performance.now();
    registeredNote = undefined;
    detectedNote.textContent = "--";
    noteFrequency.textContent = "--";
    return;
  }
  const holdTime = Number(noteDurationSelect.value);
  if (!registeredNote && now - candidateSince >= holdTime * 1000) {
    registeredNote = note;
    detectedNote.textContent = note;
    noteFrequency.textContent = Math.round(frequency);
    noteHistory.push(note);
    if (noteHistory.length > noteHistoryLimit) noteHistory.shift();
    renderNoteHistory();
  }
}

function resizeCanvas() {
  const scale = window.devicePixelRatio || 1;
  const bounds = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(bounds.width * scale));
  canvas.height = Math.max(1, Math.floor(bounds.height * scale));
  context.setTransform(scale, 0, 0, scale, 0, 0);
}

function setActive(active, message) {
  emptyState.classList.toggle("hidden", active);
  statusDot.classList.toggle("active", active);
  statusText.textContent = message;
  inputStatus.textContent = active ? (demoMode ? "DEMO" : "LIVE") : "OFFLINE";
  startButton.innerHTML = active
    ? '<span class="button-icon">■</span> Stop listening'
    : '<span class="button-icon">▶</span> Start listening';
}

async function listInputs() {
  if (!navigator.mediaDevices?.enumerateDevices) {
    const reason = window.isSecureContext
      ? "Firefox has no media-device API available. Check browser privacy settings."
      : "This page is not a secure context. Open it at http://localhost:4173, not the WSL IP address.";
    diagnosticText.textContent = `${reason} Origin: ${window.location.origin}.`;
    return;
  }
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const inputs = devices.filter((device) => device.kind === "audioinput");
    inputSelect.replaceChildren();
    inputs.forEach((device, index) => {
      const option = document.createElement("option");
      option.value = device.deviceId;
      option.textContent = device.label || `Audio input ${index + 1}`;
      inputSelect.append(option);
    });
    if (!inputs.length)
      inputSelect.add(new Option("Default microphone / interface", "default"));
    const inputNames = inputs.map(
      (device, index) => device.label || `Audio input ${index + 1}`,
    );
    console.info("Audio inputs found", inputNames);
    const permission = navigator.permissions
      ? await navigator.permissions.query({ name: "microphone" })
      : null;
    const permissionState = permission ? permission.state : "unknown";
    diagnosticText.textContent = `${inputs.length} audio input${inputs.length === 1 ? "" : "s"} found (${inputNames.join(", ") || "none"}); microphone permission: ${permissionState}; secure context: ${window.isSecureContext ? "yes" : "no"}.`;
  } catch (error) {
    diagnosticText.textContent = `Could not enumerate audio inputs: ${error.name || "unknown error"}.`;
  }
}

function prepareAnalyser() {
  if (!audioContext) audioContext = new AudioContext();
  analyser = audioContext.createAnalyser();
  analyser.fftSize = fftSize;
  analyser.minDecibels = -90;
  analyser.maxDecibels = 0;
  analyser.smoothingTimeConstant = 0.82;
}

async function startMicrophone() {
  if (!navigator.mediaDevices?.getUserMedia)
    throw new Error(
      window.isSecureContext
        ? "Firefox cannot access the media-device API. Check browser privacy settings."
        : "Microphone access requires a secure context. Open http://localhost:4173 in Firefox.",
    );
  stopAudio();
  demoMode = false;
  const deviceId = inputSelect.value;
  const useDefaultDevice = !deviceId || deviceId === "default";
  const constraints = {
    audio: useDefaultDevice ? true : { deviceId: { exact: deviceId } },
  };
  console.info("Requesting microphone access", {
    origin: window.location.origin,
    secureContext: window.isSecureContext,
    deviceId: useDefaultDevice ? "default" : deviceId,
    constraints,
  });
  statusText.textContent = "Waiting for microphone permission...";
  diagnosticText.textContent = "Waiting for the browser microphone permission prompt...";
  stream = await navigator.mediaDevices.getUserMedia(constraints);
  console.info("Microphone access granted", {
    tracks: stream.getAudioTracks().map((track) => ({
      label: track.label,
      state: track.readyState,
      settings: track.getSettings(),
    })),
  });
  prepareAnalyser();
  source = audioContext.createMediaStreamSource(stream);
  source.connect(analyser);
  await audioContext.resume();
  console.info("Audio analyser started", {
    sampleRate: audioContext.sampleRate,
    fftSize: analyser.fftSize,
  });
  setActive(true, "Listening to audio input");
  listInputs();
  draw();
}

function startDemo() {
  stopAudio();
  demoMode = true;
  prepareAnalyser();
  demoStart = performance.now();
  setActive(true, "Demo signal running");
  draw();
}

function stopAudio() {
  if (animationFrame) cancelAnimationFrame(animationFrame);
  animationFrame = null;
  stream?.getTracks().forEach((track) => track.stop());
  source?.disconnect();
  source = null;
  stream = null;
  demoMode = false;
  resetNote();
  setActive(false, "Ready to listen");
}

function drawDemoData(data) {
  const elapsed = (performance.now() - demoStart) / 1000;
  data.fill(0);
  [82, 164, 246, 330].forEach((frequency, harmonic) => {
    const bin = Math.round((frequency * fftSize) / audioContext.sampleRate);
    const energy =
      205 - harmonic * 30 + Math.sin(elapsed * (2 + harmonic)) * 18;
    for (let offset = -3; offset <= 3; offset += 1)
      data[bin + offset] = Math.max(
        data[bin + offset] || 0,
        energy - Math.abs(offset) * 38,
      );
  });
}

function draw() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const mode = getCurrentMode();
  const data = new Uint8Array(analyser.frequencyBinCount);
  const levels = new Uint8Array(analyser.fftSize);
  function frame() {
    if (demoMode) drawDemoData(data);
    else analyser.getByteFrequencyData(data);
    analyser.getByteTimeDomainData(levels);
    context.clearRect(0, 0, width, height);
    context.strokeStyle = "#365344";
    context.lineWidth = 1;
    for (let row = 1; row < 5; row += 1) {
      const y = (height * row) / 5;
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }
    const minimumBin = Math.max(
      0,
      Math.ceil((mode.minimumFrequency * analyser.fftSize) / audioContext.sampleRate),
    );
    const maximumBin = Math.min(
      data.length - 1,
      Math.floor((mode.maximumFrequency * analyser.fftSize) / audioContext.sampleRate),
    );
    const binRange = Math.max(1, maximumBin - minimumBin);
    const barWidth = width / barCount;
    const step = Math.max(1, Math.floor(binRange / barCount));
    let peak = 0;
    let peakBin = minimumBin;
    for (let i = minimumBin; i <= maximumBin; i += step) {
      const value = data[i];
      if (value > peak) {
        peak = value;
        peakBin = i;
      }
      const x = ((i - minimumBin) / binRange) * width;
      const amplitudeDb = analyser.minDecibels +
        (value / 255) * (analyser.maxDecibels - analyser.minDecibels);
      const amplitudePosition =
        (amplitudeDb - analyser.minDecibels) /
        (analyser.maxDecibels - analyser.minDecibels);
      const barHeight = Math.min(
        height,
        amplitudePosition * height * 1.18,
      );
      const gradient = context.createLinearGradient(
        0,
        height,
        0,
        height - barHeight,
      );
      gradient.addColorStop(0, "#d7f34a");
      gradient.addColorStop(1, "#ed7047");
      context.fillStyle = gradient;
      context.fillRect(
        x,
        height - barHeight,
        Math.max(1, barWidth - 1),
        barHeight,
      );
    }
    const rms =
      levels.reduce((sum, value) => sum + (value - 128) ** 2, 0) /
      levels.length;
    const db = rms ? Math.max(-60, 10 * Math.log10(rms / 128 ** 2)) : -Infinity;
    levelValue.textContent = Number.isFinite(db)
      ? `${db.toFixed(1)} dB`
      : "-∞ dB";
    const frequency = (peakBin * audioContext.sampleRate) / analyser.fftSize;
    peakFrequency.textContent = peak > 3 ? Math.round(frequency) : "--";
    updateNote(frequency, peak);
    animationFrame = requestAnimationFrame(frame);
  }
  frame();
}

startButton.addEventListener("click", async () => {
  if (animationFrame) {
    stopAudio();
    return;
  }
  try {
    console.info("Start listening clicked");
    await startMicrophone();
  } catch (error) {
    console.error("Could not start microphone", error);
    statusText.textContent = error.message;
    diagnosticText.textContent = `${error.name || "Error"}: ${error.message}`;
    statusDot.classList.remove("active");
  }
});
demoButton.addEventListener("click", startDemo);
modeSelect.addEventListener("change", updateModeDisplay);
refreshButton.addEventListener("click", listInputs);
if (navigator.mediaDevices) {
  navigator.mediaDevices.addEventListener("devicechange", listInputs);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
updateModeDisplay();
renderNoteHistory();
listInputs();
