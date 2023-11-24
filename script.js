// elements
const keys = document.querySelectorAll(".key");
const whiteKeys = document.querySelectorAll(".white");
const blackKeys = document.querySelectorAll(".black");
const whiteWords = ["C", "D", "E", "F", "G", "A", "B", "N", "M"];
const blackWords = ["W", "R", "T", "Y", "U", "I", "O", "P"];
const Button1 = document.querySelector('#newButton');
var currentLevel =0;
randomCombo='';
let currentComboIndex = 0;
const alphabet = 'ABCDEFGMN';
const levels = [
    'ABC',
    'DEFG',
    'GHILK',
    'JKLMO',
    'MNOPP'
    // Add more levels as needed
];

  Button1.onclick=startNewLevel;


// Function to generate a random combo for a level
function generateRandomCombo() {
    const comboLength = levels[currentLevel].length;
     randomCombo = '';
    for (let i = 0; i < comboLength; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        randomCombo += alphabet[randomIndex];
    }
    return randomCombo;
}

function compareKey(pressedKey) {
const currentCombo = randomCombo;
const targetKey = currentCombo[currentComboIndex];
if (pressedKey === targetKey) {
    // Key pressed is correct, move to the next key in the combo
    currentComboIndex++;

    if (currentComboIndex === currentCombo.length) {
        // All keys in the combo are pressed, move to the next level
      displayModalMessage(`Level ${currentLevel + 1} completed!`);
        currentLevel++;
        currentComboIndex = 0;
        startNewLevel();
      return true;
    }

}
  else{
  displayModalMessage('Incorrect key pressed. Try again! \n Press New to play again');
  resetLevel();
      return false;
  }
}

function resetLevel() {
    comboDisplay.textContent = '';
    currentLevel = 0;
    currentComboIndex = 0;
    correctKeysPressed = 0;
    clearTimeout(delayTimeout);
    startNewLevel();
}

function displayModalMessage(message) {
    modalContent.textContent = message;
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 2000); // Adjust the display duration
}

function startNewLevel() {
    if (currentLevel < levels.length) {
          displayModalMessage(`Starting Level ${currentLevel + 1}`);
        const randomCombo = generateRandomCombo();
        displayCombo(randomCombo);
    } else {
       displayModalMessage('Congratulations! You completed all levels.');
    }
}


function displayCombo(combo) {
    const comboDisplay = document.getElementById('comboDisplay');
    comboDisplay.textContent = combo;
  
}

 startNewLevel();

// play piano function
function playPiano(item) {
  const noteAudio = document.getElementById(item.dataset.note);
  // remove delay on play
  noteAudio.currentTime = 0;
  noteAudio.play();
}
keys.forEach((item) => {
  item.addEventListener("click", () => playPiano(item));
});
// handle keyboards
document.addEventListener("keydown", function (e) {
  const pressedKey = e.key;
  const pressed=pressedKey.toUpperCase();
  const whiteKeyIndex = whiteWords.indexOf(pressedKey.toUpperCase());
  const blackKeyIndex = blackWords.indexOf(pressedKey.toUpperCase());
  whiteKeyIndex > -1 && playPiano(whiteKeys[whiteKeyIndex]);
  blackKeyIndex > -1 && playPiano(blackKeys[blackKeyIndex]);

  compareKey(pressed);
});