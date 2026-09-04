const wordBank = [
    'light', 'sound', 'rain', 'stone', 'fire', 'dream', 'blue', 'street',
    'heart', 'moon', 'time', 'green', 'gold', 'wave', 'cloud', 'night',
    'sky', 'door', 'beat', 'road', 'bright', 'song', 'wind', 'home',
    'spark', 'slow', 'free', 'day', 'wild', 'star', 'round', 'dance',
    'train', 'river', 'sweet', 'voice', 'town', 'high', 'low', 'ground',
    'shine', 'storm', 'sound', 'story', 'face', 'place', 'grace', 'space',
    'calm', 'clear', 'close', 'cool', 'dark', 'deep', 'drift', 'dusk', 'earth', 'fall',
    'far', 'flash', 'fog', 'golden', 'grass', 'gray', 'hush', 'ice', 'kind', 'lake',
    'laugh', 'leaf', 'lost', 'loud', 'mist', 'north', 'peace', 'plain', 'rainbow', 'red',
    'rest', 'rise', 'rock', 'rough', 'safe', 'sand', 'sea', 'seed', 'sharp', 'shore',
    'silk', 'sleep', 'smile', 'snow', 'soft', 'south', 'spring', 'still', 'strong', 'sun',
    'swing', 'tall', 'taste', 'thin', 'thought', 'tide', 'top', 'touch', 'trail', 'tree',
    'true', 'trust', 'turn', 'warm', 'watch', 'water', 'west', 'white', 'wide', 'wish',
    'wood', 'work', 'world', 'young', 'alone', 'anchor', 'angel', 'answer', 'apple', 'artist',
    'autumn', 'baker', 'basket', 'battle', 'beacon', 'belly', 'better', 'blanket', 'blossom', 'border',
    'bottle', 'bottom', 'branch', 'bridge', 'button', 'candle', 'captain', 'carpet', 'castle', 'center',
    'circle', 'clover', 'coffee', 'corner', 'courage', 'cover', 'cradle', 'cricket', 'custom', 'danger',
    'daring', 'desert', 'dinner', 'distant', 'doctor', 'dollar', 'dragon', 'drawer', 'eager', 'echo',
    'enjoy', 'evening', 'feather', 'fellow', 'finger', 'finish', 'flower', 'follow', 'forest', 'fortune',
    'garden', 'gentle', 'glimmer', 'guitar', 'hammer', 'happy', 'harbor', 'hollow', 'honest', 'horizon',
    'hunger', 'island', 'jacket', 'journey', 'keeper', 'kitten', 'ladder', 'lantern', 'lemon', 'letter',
    'little', 'lively', 'lucky', 'magic', 'market', 'meadow', 'member', 'memory', 'middle', 'mirror',
    'morning', 'mother', 'motion', 'mountain', 'music', 'nature', 'never', 'number', 'ocean', 'orange',
    'paper', 'parade', 'pencil', 'pillow', 'planet', 'pocket', 'polish', 'purple', 'rabbit', 'reason',
    'record', 'rescue', 'ribbon', 'rocket', 'sailor', 'secret', 'shadow', 'silver', 'sister', 'summer',
    'sunset', 'sunshine', 'talent', 'temple', 'thunder', 'ticket', 'tomorrow', 'travel', 'turtle', 'valley',
    'velvet', 'village', 'window', 'wonder', 'yellow', 'zephyr', 'beautiful', 'celebration', 'colorful', 'curious',
    'delicate', 'evergreen', 'harmony', 'melody', 'positive', 'remember', 'singing', 'together', 'universe', 'wonderful',
    'act', 'air', 'all', 'ape', 'arm', 'art', 'ash', 'aunt', 'awake', 'back',
    'bad', 'bag', 'ball', 'band', 'bank', 'bar', 'barn', 'base', 'bath', 'bay',
    'beach', 'bean', 'bear', 'bed', 'bee', 'bell', 'belt', 'bench', 'bend', 'best',
    'big', 'bird', 'bite', 'black', 'blade', 'blame', 'block', 'blood', 'blow', 'board',
    'boat', 'body', 'book', 'born', 'boss', 'box', 'boy', 'brain', 'bread', 'break',
    'breeze', 'brick', 'brief', 'bring', 'broad', 'brown', 'brush', 'build', 'burn', 'burst',
    'call', 'camp', 'can', 'cane', 'card', 'care', 'carry', 'case', 'cash', 'catch',
    'cause', 'chain', 'chair', 'chalk', 'chance', 'change', 'charm', 'cheap', 'check', 'chest',
    'child', 'choice', 'choose', 'chord', 'church', 'clap', 'class', 'clay', 'clean', 'climb',
    'clock', 'cloth', 'coat', 'code', 'cold', 'color', 'come', 'common', 'cook', 'cop',
    'cord', 'cost', 'count', 'country', 'course', 'crack', 'craft', 'crash', 'crazy', 'cream',
    'crop', 'cross', 'crow', 'crowd', 'crown', 'crush', 'cry', 'cup', 'cut', 'cycle',
    'data', 'date', 'dawn', 'deal', 'dear', 'death', 'deck', 'deeply', 'degree', 'desk',
    'detail', 'devil', 'dig', 'dirt', 'dish', 'do', 'dog', 'done', 'dot', 'doubt',
    'down', 'draw', 'dress', 'drive', 'drop', 'dry', 'dust', 'duty', 'eagle', 'east',
    'easy', 'edge', 'eight', 'else', 'empty', 'end', 'energy', 'engine', 'enough', 'enter',
    'event', 'every', 'exact', 'extra', 'eye', 'fact', 'fade', 'fair', 'faith', 'fake',
    'family', 'farm', 'fast', 'father', 'fear', 'feed', 'feel', 'feet', 'field', 'fight',
    'film', 'find', 'fine', 'finish', 'first', 'fish', 'fit', 'five', 'flag', 'flat',
    'flame', 'flashy', 'flavor', 'flesh', 'flight', 'float', 'floor', 'flow', 'fly', 'fold',
    'food', 'fool', 'foot', 'force', 'form', 'fort', 'four', 'frame', 'fresh', 'front',
    'fruit', 'full', 'fun', 'funny', 'future', 'game', 'gap', 'gift', 'girl', 'give',
    'glass', 'glad', 'glow', 'glue', 'go', 'goat', 'god', 'good', 'grab', 'grain',
    'grand', 'grape', 'great', 'grow', 'guess', 'guide', 'gun', 'half', 'hand', 'hang',
    'hard', 'hat', 'head', 'heal', 'hear', 'heat', 'help', 'hero', 'hill', 'hit',
    'hold', 'hole', 'holy', 'hope', 'horse', 'host', 'hour', 'house', 'human', 'hundred',
    'hunt', 'hurt', 'idea', 'image', 'imagine', 'inside', 'interest', 'iron', 'joke', 'joy',
    'jump', 'just', 'keep', 'key', 'kick', 'kid', 'kill', 'king', 'kiss', 'knee',
    'know', 'lady', 'land', 'large', 'last', 'late', 'laughing', 'law', 'lead', 'learn',
    'least', 'leave', 'left', 'lesson', 'life', 'lift', 'line', 'lion', 'list', 'listen',
    'live', 'lock', 'long', 'look', 'lord', 'love', 'machine', 'mail', 'main', 'make',
    'man', 'many', 'map', 'mark', 'master', 'match', 'matter', 'maybe', 'mean', 'meet',
    'melt', 'mind', 'mine', 'minute', 'miss', 'mix', 'moment', 'money', 'month', 'more',
    'most', 'move', 'much', 'mystery', 'name', 'near', 'neck', 'need', 'nest', 'new',
    'nice', 'nine', 'noise', 'none', 'note', 'nothing', 'notice', 'now', 'offer', 'often',
    'old', 'once', 'one', 'open', 'order', 'other', 'outside', 'over', 'own', 'pack',
    'page', 'pain', 'paint', 'pair', 'park', 'part', 'pass', 'past', 'path', 'pay',
    'people', 'perfect', 'pick', 'picture', 'piece', 'pink', 'pipe', 'place', 'plan', 'plant',
    'play', 'please', 'point', 'poor', 'power', 'press', 'pretty', 'price', 'pride', 'prime',
    'print', 'prize', 'promise', 'proud', 'pull', 'pure', 'push', 'quick', 'quiet', 'quite',
    'race', 'radio', 'raise', 'read', 'ready', 'real', 'redwood', 'restless', 'return', 'rich',
    'ride', 'right', 'ring', 'roadside', 'roll', 'room', 'root', 'rope', 'rose', 'rule',
    'run', 'rush', 'sad', 'salt', 'same', 'save', 'school', 'score', 'screen', 'seaweed',
    'second', 'see', 'self', 'send', 'sense', 'seven', 'shape', 'share', 'shelf', 'ship',
    'shirt', 'shoe', 'shop', 'short', 'show', 'side', 'sign', 'simple', 'since', 'six',
    'size', 'skin', 'skyline', 'slip', 'small', 'smart', 'speak', 'speed', 'spell', 'spend',
    'spice', 'spill', 'spin', 'spirit', 'split', 'spot', 'spread', 'stand', 'start', 'state',
    'stay', 'step', 'stick', 'stop', 'store', 'straight', 'strange', 'stream', 'strike', 'string',
    'strip', 'study', 'style', 'sugar', 'suit', 'summerland', 'sure', 'surprise', 'sweetheart', 'table',
    'take', 'talk', 'teach', 'team', 'tell', 'ten', 'thank', 'thing', 'think', 'third',
    'three', 'throw', 'tight', 'tiny', 'togetherness', 'tomato', 'tongue', 'tool', 'township', 'track',
    'trade', 'trainline', 'treasure', 'treat', 'trueblue', 'try', 'tune', 'two', 'type', 'under',
    'understand', 'use', 'usual', 'value', 'very', 'view', 'visit', 'voiceful', 'wait', 'wake',
    'walk', 'wall', 'want', 'war', 'watchful', 'way', 'wear', 'week', 'welcome', 'wheel',
    'whole', 'whose', 'why', 'wildflower', 'win', 'winter', 'wise', 'wishful', 'without', 'woman',
    'word', 'worth', 'write', 'wrong', 'year', 'yes', 'yesterday', 'you', 'your', 'zebra',
    'ability', 'adventure', 'afternoon', 'agreement', 'amazing', 'animal', 'apartment', 'attention', 'balance', 'banana',
    'beginning', 'believe', 'between', 'bicycle', 'birthday', 'brother', 'camera', 'careful', 'carriage', 'carrot',
    'certain', 'channel', 'chapter', 'children', 'chocolate', 'clever', 'company', 'complete', 'concert', 'consider',
    'conversation', 'countryman', 'creative', 'creature', 'customer', 'december', 'decide', 'different', 'difficult', 'discover',
    'distance', 'double', 'driver', 'easily', 'education', 'elephant', 'emotion', 'envelope', 'exercise', 'explain',
    'familyless', 'favorite', 'fifteen', 'finally', 'finishline', 'freedom', 'friendly', 'general', 'gentleman', 'holiday',
    'important', 'impossible', 'incredible', 'instrument', 'intention', 'invitation', 'january', 'journal', 'language', 'library',
    'magazine', 'marriage', 'material', 'medicine', 'midnight', 'million', 'natural', 'necessary', 'ninety', 'october',
    'ordinary', 'original', 'outsideworld', 'particular', 'pepper', 'picturebook', 'popular', 'powerful', 'practice', 'present',
    'problem', 'probably', 'produce', 'promiseful', 'question', 'quietly', 'remembered', 'republic', 'restaurant', 'riverbank',
    'sandcastle', 'Saturday', 'sentence', 'shoulder', 'similar', 'someone', 'special', 'suddenly', 'surround', 'telephone',
    'thousand', 'togetherly', 'triangle', 'underwater', 'vacation', 'vegetable', 'victory', 'visitor', 'whatever', 'yesterday'
];

const rowCount = 24;
const beatCount = 4;
const promptPairCount = rowCount / 2;
const easyBeatIndexes = [1, 3];
const easySwitchCount = 3;
let scrollAnimationId;

function shuffleWords() {
    const shuffledWords = [...new Set(wordBank)];

    for (let index = shuffledWords.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [shuffledWords[index], shuffledWords[swapIndex]] = [shuffledWords[swapIndex], shuffledWords[index]];
    }

    return shuffledWords;
}

function chooseBeat(mode) {
    if (mode === 'easy-random') {
        return easyBeatIndexes[Math.floor(Math.random() * easyBeatIndexes.length)];
    }

    if (mode === 'hard-random') {
        return Math.floor(Math.random() * beatCount);
    }

    return Number(mode.replace('beat-', '')) - 1;
}

function choosePromptLineOffsets(mode) {
    if (mode === 'first') {
        return Array(promptPairCount).fill(0);
    }

    if (mode === 'second') {
        return Array(promptPairCount).fill(1);
    }

    if (mode === 'hard-switching') {
        return Array.from({ length: promptPairCount }, () => Math.floor(Math.random() * 2));
    }

    const offsets = Array(promptPairCount).fill(0);

    if (mode === 'easy-switching') {
        const switchPoints = [];

        while (switchPoints.length < easySwitchCount) {
            const switchPoint = Math.floor(Math.random() * (promptPairCount - 1)) + 1;
            if (!switchPoints.includes(switchPoint)) {
                switchPoints.push(switchPoint);
            }
        }

        switchPoints.sort((firstPoint, secondPoint) => firstPoint - secondPoint);
        switchPoints.forEach((switchPoint) => {
            for (let pairIndex = switchPoint; pairIndex < promptPairCount; pairIndex += 1) {
                offsets[pairIndex] = offsets[pairIndex] === 0 ? 1 : 0;
            }
        });
    }

    return offsets;
}

function createRhythmGrid() {
    const grid = document.getElementById('rhythmGrid');
    const words = shuffleWords();
    const beatMode = document.getElementById('beatMode').value;
    const promptLineOffsets = choosePromptLineOffsets(document.getElementById('rhymeLine').value);
    grid.innerHTML = '';

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
        const row = document.createElement('tr');
        const pairIndex = Math.floor(rowIndex / 2);
        const isPromptRow = rowIndex % 2 === promptLineOffsets[pairIndex];
        row.className = isPromptRow ? 'prompt-row' : 'answer-row';

        const wordBeat = isPromptRow ? chooseBeat(beatMode) : -1;

        for (let beatIndex = 0; beatIndex < beatCount; beatIndex += 1) {
            const cell = document.createElement('td');
            const isWordCell = isPromptRow && beatIndex === wordBeat;
            cell.className = isWordCell ? 'prompt-cell' : 'answer-cell';

            if (isWordCell) {
                cell.textContent = words[pairIndex];
            }

            row.appendChild(cell);
        }

        grid.appendChild(row);
    }
}

function stopAutoscroll() {
    if (scrollAnimationId) {
        cancelAnimationFrame(scrollAnimationId);
        scrollAnimationId = undefined;
    }
}

function startAutoscroll() {
    stopAutoscroll();
    const pixelsPerSecond = Number(document.getElementById('scrollSpeed').value);

    if (!pixelsPerSecond) {
        return;
    }

    let previousTimestamp;
    const scroll = (timestamp) => {
        if (previousTimestamp !== undefined) {
            const elapsedSeconds = (timestamp - previousTimestamp) / 1000;
            window.scrollBy(0, pixelsPerSecond * elapsedSeconds);
        }

        previousTimestamp = timestamp;
        if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight) {
            scrollAnimationId = requestAnimationFrame(scroll);
        } else {
            scrollAnimationId = undefined;
        }
    };

    scrollAnimationId = requestAnimationFrame(scroll);
}

document.getElementById('beatMode').addEventListener('change', createRhythmGrid);
document.getElementById('rhymeLine').addEventListener('change', createRhythmGrid);
document.getElementById('newGameButton').addEventListener('click', createRhythmGrid);
document.getElementById('scrollSpeed').addEventListener('change', startAutoscroll);
createRhythmGrid();
