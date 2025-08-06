// DOM elements
const setupSection = document.getElementById('setup-section');
const gameArea = document.getElementById('game-area');
const startGameBtn = document.getElementById('startGame');
const initialNumberInput = document.getElementById('initialNumber');
const initialNumberError = document.getElementById('initialNumberError');
const userNumberInput = document.getElementById('userNumber');
const userNumberError = document.getElementById('userNumberError');
const submitNumberBtn = document.getElementById('submitNumber');
const displayInitialNumber = document.getElementById('displayInitialNumber');
const displayMagicGuess = document.getElementById('displayMagicGuess');
const currentRoundDisplay = document.getElementById('currentRound');
const totalRoundsDisplay = document.getElementById('totalRounds');
const roundLabel = document.getElementById('roundLabel');
const roundsContainer = document.getElementById('roundsContainer');
const resultSection = document.getElementById('result-section');
const finalSumDisplay = document.getElementById('finalSum');
const finalMagicGuess = document.getElementById('finalMagicGuess');
const restartGameBtn = document.getElementById('restartGame');
const showTutorialBtn = document.getElementById('showTutorial');
const tutorialModal = document.getElementById('tutorialModal');
const nextTutorial = document.getElementById('nextTutorial');
const prevTutorial = document.getElementById('prevTutorial');
const closeTutorial = document.getElementById('closeTutorial');
const tutorialStep1 = document.getElementById('tutorialStep1');
const tutorialStep2 = document.getElementById('tutorialStep2');
const skinBtns = document.querySelectorAll('.skin-btn');
const soundToggleBtn = document.getElementById('soundToggle');
const numberLengthSelect = document.getElementById('numberLength');
const roundsSelect = document.getElementById('rounds');

// Game state object
let gameState = {
    numberLength: 4,
    rounds: 2,
    initialNumber: '',
    magicGuess: '',
    currentRound: 1,
    userNumbers: [],
    computerReplies: [],
    currentSkin: 'normal'
};

// Sound toggle variable
let soundEnabled = true;

// Track confetti animation
let confettiInterval;

// Function to trigger confetti animation
const triggerConfetti = () => {
    import('https://cdn.skypack.dev/canvas-confetti').then(module => {
        const confetti = module.default;
        if (confettiInterval) clearInterval(confettiInterval);
        confettiInterval = setInterval(() => {
            confetti({
                particleCount: 50,
                spread: 70,
                origin: { y: 0.6 }
            });
        }, 200);
        setTimeout(stopConfetti, 3000);
    }).catch(err => {
        console.log("Confetti error:", err);
    });
};

// Function to stop confetti
const stopConfetti = () => {
    if (confettiInterval) {
        clearInterval(confettiInterval);
        confettiInterval = null;
    }
};

// Function to play sound effects
const playSound = (type) => {
    if (!soundEnabled) return;
    if (type === 'click') {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'win') {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
        const duration = 0.2;
        notes.forEach((note, i) => {
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(note, audioCtx.currentTime + i * duration * 0.8);
            gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime + i * duration * 0.8);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + (i + 1) * duration);
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.start(audioCtx.currentTime + i * duration * 0.8);
            oscillator.stop(audioCtx.currentTime + (i + 1) * duration);
        });
    }
};

// Function to apply skin (theme) to number displays
function applySkin(skin) {
    const themes = {
        normal: { '--bg-color': '#f5f5f7', font: 'Courier New, monospace', 'background-image': 'none' },
        neon: { '--bg-color': '#1a1a2e', font: 'Monaco, Consolas, monospace', 'background-image': 'none' },
        handwritten: { '--bg-color': '#fff3e0', font: 'Caveat, cursive', 'background-image': 'none' },
        rounded: { '--bg-color': '#e8f4fd', font: 'Verdana, sans-serif', 'background-image': 'none' },
        space: { '--bg-color': '#0a1a3a', font: 'Orbitron, sans-serif', 'background-image': 'ur[](https://images.unsplash.com/photo-1538370965046-79c0d6907d47)' }
    };
    const theme = themes[skin] || themes.normal;
    Object.entries(theme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    });
    gameState.currentSkin = skin;
    document.querySelectorAll('.number-value').forEach(el => {
        el.classList.remove('normal', 'neon', 'handwritten', 'rounded', 'space');
        el.classList.add(skin);
    });
}

// Skin button event listeners
skinBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        playSound('click');
        skinBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applySkin(btn.dataset.skin);
    });
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
});

// Tutorial button event listeners
showTutorialBtn.addEventListener('click', () => {
    playSound('click');
    tutorialModal.classList.add('active');
    tutorialStep1.style.display = 'block';
    tutorialStep2.style.display = 'none';
});
nextTutorial.addEventListener('click', () => {
    playSound('click');
    tutorialStep1.style.display = 'none';
    tutorialStep2.style.display = 'block';
});
prevTutorial.addEventListener('click', () => {
    playSound('click');
    tutorialStep1.style.display = 'block';
    tutorialStep2.style.display = 'none';
});
closeTutorial.addEventListener('click', () => {
    playSound('click');
    tutorialModal.classList.remove('active');
});

// Sound toggle button
soundToggleBtn.addEventListener('click', () => {
    playSound('click');
    soundEnabled = !soundEnabled;
    soundToggleBtn.textContent = soundEnabled ? 'Mute' : 'Unmute';
});

// Format number with spaces and leading zeros
function formatNumber(num, length) {
    const str = num.toString().padStart(length, '0');
    return str.split('').reverse().join(' ').split('').reverse().join('');
}

// Validate initial number input
function validateInitialNumber() {
    const length = parseInt(numberLengthSelect.value);
    const value = initialNumberInput.value.trim();
    if (!value) {
        showError(initialNumberError, 'Please enter a number');
        return false;
    }
    if (!/^\d+$/.test(value)) {
        showError(initialNumberError, 'Digits only please');
        return false;
    }
    if (value.length !== length) {
        showError(initialNumberError, `Must be ${length} digits`);
        return false;
    }
    if (value[0] === '0') {
        showError(initialNumberError, 'Cannot start with 0');
        return false;
    }
    initialNumberError.style.display = 'none';
    return true;
}

// Validate user number input
function validateUserNumber() {
    const value = userNumberInput.value.trim();
    if (!value) {
        showError(userNumberError, 'Please enter a number');
        return false;
    }
    if (!/^\d+$/.test(value)) {
        showError(userNumberError, 'Digits only please');
        return false;
    }
    if (value.length !== gameState.numberLength) {
        showError(userNumberError, `Must be ${gameState.numberLength} digits`);
        return false;
    }
    if (value[0] === '0') {
        showError(userNumberError, 'Cannot start with 0');
        return false;
    }
    userNumberError.style.display = 'none';
    return true;
}

// Show error message
function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

// Calculate magic guess
function calculateMagicGuess(num, rounds) {
    const length = gameState.numberLength;
    const result = (num - rounds).toString().padStart(length, '0');
    return rounds.toString() + result;
}

// Calculate computer reply
function calculateComputerReply(userNum, length) {
    const maxNum = Math.pow(10, length) - 1;
    const reply = maxNum - parseInt(userNum);
    return reply.toString().padStart(length, '0');
}

// Start game
function startGame() {
    if (!validateInitialNumber()) {
        return;
    }
    playSound('click');
    document.body.classList.remove('setup-phase');
    document.body.classList.add('game-active');
    gameState.numberLength = parseInt(numberLengthSelect.value);
    gameState.rounds = parseInt(roundsSelect.value);
    gameState.initialNumber = initialNumberInput.value.trim();
    gameState.magicGuess = calculateMagicGuess(parseInt(gameState.initialNumber), gameState.rounds);
    gameState.currentRound = 1;
    gameState.userNumbers = [];
    gameState.computerReplies = [];
    displayInitialNumber.textContent = formatNumber(gameState.initialNumber, gameState.numberLength);
    displayMagicGuess.textContent = formatNumber(gameState.magicGuess, gameState.magicGuess.length);
    totalRoundsDisplay.textContent = gameState.rounds;
    roundLabel.textContent = '1';
    roundsContainer.innerHTML = '';
    applySkin(gameState.currentSkin);
    setupSection.style.display = 'none';
    gameArea.style.display = 'block';
    resultSection.style.display = 'none';
    setTimeout(() => {
        userNumberInput.focus();
    }, 10);
}

// Submit user number
function submitNumber() {
    if (!validateUserNumber()) return;
    playSound('click');
    const userNum = userNumberInput.value.trim();
    const computerReply = calculateComputerReply(userNum, gameState.numberLength);
    gameState.userNumbers.push(userNum);
    gameState.computerReplies.push(computerReply);
    const roundDiv = document.createElement('div');
    roundDiv.className = 'number-row';
    roundDiv.innerHTML = `
        <div class="number-label user-label">Round ${gameState.currentRound}:</div>
        <div class="number-value ${gameState.currentSkin}">${formatNumber(userNum, gameState.numberLength)}</div>
    `;
    roundsContainer.appendChild(roundDiv);
    const replyDiv = document.createElement('div');
    replyDiv.className = 'number-row';
    replyDiv.innerHTML = `
        <div class="number-label computer-label">Round ${gameState.currentRound}:</div>
        <div class="number-value ${gameState.currentSkin}">${formatNumber(computerReply, gameState.numberLength)}</div>
    `;
    roundsContainer.appendChild(replyDiv);
    userNumberInput.value = '';
    if (gameState.currentRound >= gameState.rounds) {
        endGame();
    } else {
        gameState.currentRound++;
        currentRoundDisplay.textContent = gameState.currentRound;
        roundLabel.textContent = gameState.currentRound;
        userNumberInput.focus();
    }
}

// End game and show results
function endGame() {
    document.body.classList.remove('game-active');
    document.body.classList.add('game-complete');
    const sum = parseInt(gameState.initialNumber) + 
                gameState.userNumbers.reduce((a, b) => a + parseInt(b), 0) + 
                gameState.computerReplies.reduce((a, b) => a + parseInt(b), 0);
    finalSumDisplay.textContent = formatNumber(sum, sum.toString().length);
    finalMagicGuess.textContent = formatNumber(gameState.magicGuess, gameState.magicGuess.length);
    applySkin(gameState.currentSkin);
    document.querySelector('.current-input').style.display = 'none';
    resultSection.style.display = 'block';
    playSound('win');
    triggerConfetti();
}

// Reset game to initial state
function resetGame() {
    playSound('click');
    stopConfetti();
    document.body.classList.remove('game-complete', 'game-active');
    document.body.classList.add('setup-phase');
    gameState.currentRound = 1;
    currentRoundDisplay.textContent = '1';
    roundLabel.textContent = '1';
    setupSection.style.display = 'block';
    gameArea.style.display = 'none';
    document.querySelector('.current-input').style.display = 'block';
    initialNumberInput.value = '';
    userNumberInput.value = '';
    initialNumberError.style.display = 'none';
    userNumberError.style.display = 'none';
}

// Event listeners for buttons
startGameBtn.addEventListener('click', startGame);
submitNumberBtn.addEventListener('click', submitNumber);
restartGameBtn.addEventListener('click', resetGame);

// Allow Enter key for input submission
initialNumberInput.addEventListener('keypress', e => e.key === 'Enter' && startGame());
userNumberInput.addEventListener('keypress', e => e.key === 'Enter' && submitNumber());

// Restrict input to digits only
initialNumberInput.addEventListener('input', function() {
    this.value = this.value.replace(/[^\d]/g, '');
    const maxLength = parseInt(numberLengthSelect.value);
    if (this.value.length > maxLength) this.value = this.value.slice(0, maxLength);
});
userNumberInput.addEventListener('input', function() {
    this.value = this.value.replace(/[^\d]/g, '');
    if (this.value.length > gameState.numberLength) this.value = this.value.slice(0, gameState.numberLength);
});

// Update input placeholders based on number length
numberLengthSelect.addEventListener('change', () => {
    const length = numberLengthSelect.value;
    initialNumberInput.placeholder = `Enter a ${length}-digit number`;
    userNumberInput.placeholder = `Enter a ${length}-digit number`;
});

// Initial setup
document.body.classList.add('setup-phase');
initialNumberInput.focus();
applySkin('normal');