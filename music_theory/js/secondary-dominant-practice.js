const majorKeys = [
    'C major',
    'D major',
    'E major',
    'F major',
    'G major',
    'A major',
    'B major'
];

const minorKeys = [
    'A minor',
    'B minor',
    'C minor',
    'D minor',
    'E minor',
    'F minor',
    'G minor'
];

const targetChords = ['IV', 'V', 'iv'];
const chordNameMap = {
    'C major': { I: 'C', ii: 'Dm', IV: 'F', V: 'G', iv: 'Fm' },
    'D major': { I: 'D', ii: 'Em', IV: 'G', V: 'A', iv: 'Gm' },
    'E major': { I: 'E', ii: 'F#m', IV: 'A', V: 'B', iv: 'Am' },
    'F major': { I: 'F', ii: 'Gm', IV: 'Bb', V: 'C', iv: 'Bbm' },
    'G major': { I: 'G', ii: 'Am', IV: 'C', V: 'D', iv: 'Cm' },
    'A major': { I: 'A', ii: 'Bm', IV: 'D', V: 'E', iv: 'Dm' },
    'B major': { I: 'B', ii: 'C#m', IV: 'E', V: 'F#', iv: 'Em' },
    'A minor': { I: 'Am', ii: 'Bdim', IV: 'Dm', V: 'E', iv: 'Dm' },
    'B minor': { I: 'Bm', ii: 'C#dim', IV: 'Em', V: 'F#', iv: 'Em' },
    'C minor': { I: 'Cm', ii: 'Ddim', IV: 'Fm', V: 'G', iv: 'Fm' },
    'D minor': { I: 'Dm', ii: 'Edim', IV: 'Gm', V: 'A', iv: 'Gm' },
    'E minor': { I: 'Em', ii: 'F#dim', IV: 'Am', V: 'B', iv: 'Am' },
    'F minor': { I: 'Fm', ii: 'Gdim', IV: 'Bbm', V: 'C', iv: 'Bbm' },
    'G minor': { I: 'Gm', ii: 'Adim', IV: 'Cm', V: 'D', iv: 'Cm' },
    'Bb major': { I: 'Bb', ii: 'Cm', IV: 'Eb', V: 'F', iv: 'Ebm' },
    'Bb minor': { I: 'Bbm', ii: 'Cdim', IV: 'Ebm', V: 'F', iv: 'Ebm' },
    'F# major': { I: 'F#', ii: 'G#m', IV: 'B', V: 'C#', iv: 'Bm' },
    'F# minor': { I: 'F#m', ii: 'G#dim', IV: 'Bm', V: 'C#', iv: 'Bm' }
};
let timerEnabled = true;
let countdown = 30;
let countdownTimer;
let autoGenerateTimer;

function updateTimerDisplay() {
    const timerStatus = document.getElementById('timerStatus');
    const timerToggle = document.getElementById('timerToggle');

    if (!timerEnabled) {
        timerStatus.textContent = 'Auto-next is off';
        timerToggle.textContent = '⏱️ Auto-next: Off';
        return;
    }

    timerStatus.textContent = `Next exercise in ${countdown} seconds`;
    timerToggle.textContent = '⏱️ Auto-next: On';
}

function startTimer() {
    clearInterval(countdownTimer);
    clearTimeout(autoGenerateTimer);
    countdown = 30;
    updateTimerDisplay();

    countdownTimer = setInterval(() => {
        countdown -= 1;
        if (countdown <= 0) {
            countdown = 30;
            generateExercise();
        }
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(countdownTimer);
    clearTimeout(autoGenerateTimer);
    updateTimerDisplay();
}

function toggleTimer() {
    timerEnabled = !timerEnabled;
    if (timerEnabled) {
        startTimer();
    } else {
        stopTimer();
    }
}

function toggleSolution() {
    const solutionBox = document.getElementById('solutionBox');
    const solutionToggle = document.getElementById('solutionToggle');
    const isHidden = solutionBox.classList.contains('hidden');

    solutionBox.classList.toggle('hidden', !isHidden);
    solutionToggle.textContent = isHidden ? 'Hide solution' : 'Show solution';
}

function getTargetDisplay(targetRoman, key, format) {
    const chordName = chordNameMap[key][targetRoman];
    const roman = targetRoman === 'iv' ? 'iv' : targetRoman;

    if (format === 'roman') {
        return roman;
    }

    if (format === 'both') {
        return `${chordName} (${roman})`;
    }

    return chordName;
}

function generateExercise() {
    const selectedKeyType = document.getElementById('keyTypeSelect')?.value || 'both';
    let possibleKeys = majorKeys;

    if (selectedKeyType === 'minor') {
        possibleKeys = minorKeys;
    } else if (selectedKeyType === 'both') {
        possibleKeys = [...majorKeys, ...minorKeys];
    }

    const key = possibleKeys[Math.floor(Math.random() * possibleKeys.length)];
    const targetChord = targetChords[Math.floor(Math.random() * targetChords.length)];

    const exerciseDisplay = document.getElementById('exerciseDisplay');
    const practiceCard = document.getElementById('practiceCard');
    const selectedFormat = document.getElementById('targetFormatSelect')?.value || 'both';
    const targetFormat = selectedFormat;

    const tonicChord = key.split(' ')[0];
    const targetChordName = chordNameMap[key][targetChord];
    const targetKeyName = targetChordName.includes('m')
        ? `${targetChordName.replace(/m/g, '')} minor`
        : `${targetChordName} major`;
    const displayTarget = getTargetDisplay(targetChord, key, targetFormat);
    const solutionText = document.getElementById('solutionText');
    const solutionBox = document.getElementById('solutionBox');
    const solutionToggle = document.getElementById('solutionToggle');

    const iiChord = chordNameMap[targetKeyName]?.ii;
    const vChord = chordNameMap[targetKeyName]?.V;

    exerciseDisplay.innerHTML = `${tonicChord} - <span class="ii-v-emphasis">[ii - V]</span> - ${displayTarget}`;
    solutionText.textContent = `The ii–V solution is: ${iiChord} → ${vChord} (leading to ${displayTarget})`;
    solutionBox.classList.add('hidden');
    solutionToggle.textContent = 'Show solution';

    practiceCard.classList.remove('show');
    void practiceCard.offsetWidth;
    practiceCard.classList.add('show');

    if (timerEnabled) {
        countdown = 30;
        updateTimerDisplay();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    generateExercise();
    startTimer();
});
