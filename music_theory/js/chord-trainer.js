// chord-trainer.js — vanilla JS Web MIDI chord trainer
(function(){
    const targetEl = document.getElementById('target-chord');
    const heldEl = document.getElementById('held-notes');
    const statusEl = document.getElementById('status');
    const enableBtn = document.getElementById('enable-midi');
    const nextBtn = document.getElementById('next-chord');
    const difficultySelect = document.getElementById('difficulty-level');
    const playOscillatorCheckbox = document.getElementById('play-oscillator');
    const octaveSelect = document.getElementById('oscillator-octave');
    const hintBtn = document.getElementById('show-hint');
    const hintEl = document.getElementById('hint-notes');
    const resultContainer = document.getElementById('result');
    const resultText = document.getElementById('result-text');

    let midiAccess = null;
    let inputs = [];
    let held = new Set(); // MIDI note numbers currently held
    let heldPcs = new Set();
    let chords = [];
    let chordData = null;
    let current = null;
    let audioContext = null;
    let oscillatorOctave = 0;
    const voices = new Map();

    function initAudio(){
        if(!audioContext){
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if(audioContext.state === 'suspended') audioContext.resume();
    }

    function playNote(note, velocity){
        if(!audioContext) return;
        stopNote(note);

        const now = audioContext.currentTime;
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = 'triangle';
        oscillator.frequency.value = 440 * Math.pow(2, (note - 69 + oscillatorOctave * 12) / 12);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(Math.max(0.02, velocity / 127 * 0.18), now + 0.015);
        oscillator.connect(gain).connect(audioContext.destination);
        oscillator.start(now);
        voices.set(note, {oscillator, gain});
    }

    function stopNote(note){
        const voice = voices.get(note);
        if(!voice) return;

        const now = audioContext.currentTime;
        voice.gain.gain.cancelScheduledValues(now);
        voice.gain.gain.setValueAtTime(voice.gain.gain.value, now);
        voice.gain.gain.linearRampToValueAtTime(0, now + 0.08);
        voice.oscillator.stop(now + 0.09);
        voices.delete(note);
    }

    function stopAllNotes(){
        for(const note of voices.keys()) stopNote(note);
    }

    function loadChordData(){
        return fetch('../music_theory/data/chords.json')
            .then(r=>r.json())
            .then(data=>{
                chordData = data;
            });
    }

    function buildChordList(roots, types){
        chords = [];
        for(let r=0;r<roots.length;r++){
            const rootName = roots[r];
            types.forEach(t=>{
                const pcs = t.intervals.map(i=> (r + i) % 12 );
                const name = rootName + (t.label || '');
                chords.push({name, pcs});
            });
        }
    }

    const LEVEL_TYPES = {
        easy: new Set(['maj', 'min']),
        medium: new Set(['maj', 'min', 'dim', 'aug', 'sus2', 'sus4', 'dom7', 'maj7', 'm7']),
        hard: null
    };

    function setDifficulty(level){
        if(!chordData) return;
        const allowedTypes = LEVEL_TYPES[level];
        const types = allowedTypes
            ? chordData.types.filter(type=>allowedTypes.has(type.name))
            : chordData.types;
        buildChordList(chordData.roots, types);
        pickRandomChord();
        held.clear();
        heldPcs.clear();
        updateHeldUI();
        showStatus('Ready');
    }

    function pickRandomChord(){
        if(!chords.length) return null;
        const idx = Math.floor(Math.random()*chords.length);
        current = chords[idx];
        targetEl.textContent = current.name;
        hintEl.hidden = true;
        hintEl.textContent = '';
        hintBtn.disabled = false;
        resultContainer.style.display = 'none';
        return current;
    }

    function showStatus(msg){ statusEl.textContent = msg; }

    function noteOn(note, velocity){
        if(playOscillatorCheckbox.checked) playNote(note, velocity);
        held.add(note); heldPcs.add(note%12); updateHeldUI(); checkMatch();
    }
    function noteOff(note){ held.delete(note); // recompute pcs
        stopNote(note);
        heldPcs = new Set(Array.from(held).map(n=>n%12)); updateHeldUI(); }

    function updateHeldUI(){
        if(held.size===0) heldEl.textContent = '—';
        else{
            const notes = Array.from(held).sort((a,b)=>a-b).map(n=>midiToName(n));
            heldEl.textContent = notes.join(' ');
        }
    }

    const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
    function midiToName(n){ return NOTE_NAMES[n%12] + Math.floor(n/12-1); }

    function setsEqual(a,b){
        if(a.size !== b.size) return false;
        for(let v of a) if(!b.has(v)) return false;
        return true;
    }

    function checkMatch(){
        if(!current) return;
        // Compare pitch-class sets
        const targetSet = new Set(current.pcs);
        if(setsEqual(targetSet, heldPcs)){
            // success!
            resultText.textContent = 'Correct — ' + current.name;
            resultContainer.style.display = 'block';
            showStatus('Success');
            // auto next after short delay
            setTimeout(()=>{ pickRandomChord(); held.clear(); heldPcs.clear(); updateHeldUI(); showStatus('Ready'); }, 1500);
        } else {
            showStatus('Playing...');
        }
    }

    function onMIDIMessage(ev){
        const [status, note, velocity] = ev.data;
        const cmd = status & 0xf0;
        if(cmd === 0x90){ // note on
            if(velocity>0) noteOn(note, velocity);
            else noteOff(note);
        } else if(cmd === 0x80){ // note off
            noteOff(note);
        }
    }

    function connectInputs(){
        inputs = [];
        for (let input of midiAccess.inputs.values()){
            inputs.push(input);
            input.onmidimessage = onMIDIMessage;
        }
        showStatus(inputs.length ? `Connected: ${inputs.map(i=>i.name).join(', ')}` : 'No MIDI inputs found');
    }

    function onMIDISuccess(m){ midiAccess = m; connectInputs(); midiAccess.onstatechange = connectInputs; }

    function onMIDIFail(err){ showStatus('MIDI failed: '+err); }

    enableBtn.addEventListener('click', ()=>{
        initAudio();
        if(navigator.requestMIDIAccess){
            navigator.requestMIDIAccess().then(onMIDISuccess,onMIDIFail);
            showStatus('Requesting MIDI access...');
        } else showStatus('Web MIDI not supported in this browser.');
    });

    nextBtn.addEventListener('click', ()=>{ pickRandomChord(); held.clear(); heldPcs.clear(); updateHeldUI(); showStatus('Ready'); });

    difficultySelect.addEventListener('change', ()=>setDifficulty(difficultySelect.value));

    octaveSelect.addEventListener('change', ()=>{
        oscillatorOctave = Number(octaveSelect.value);
    });

    playOscillatorCheckbox.addEventListener('change', ()=>{
        if(!playOscillatorCheckbox.checked) stopAllNotes();
    });

    hintBtn.addEventListener('click', ()=>{
        if(!current) return;
        hintEl.textContent = current.pcs.map(pc=>NOTE_NAMES[pc]).join(' - ');
        hintEl.hidden = false;
        hintBtn.disabled = true;
    });

    // init
    loadChordData().then(()=>{
        setDifficulty(difficultySelect.value);
        showStatus('Click "Enable MIDI" to connect your keyboard');
    }).catch(e=>{ showStatus('Failed to load chords: '+e); });

})();
