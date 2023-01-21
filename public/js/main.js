let difficultyLevel;
let test;
let valuesArray;
let cardsArray;
let remainingCards;

let cardsEasy = document.querySelectorAll('.game-easy > .ligne > .cards');
let cardsMedium = document.querySelectorAll('.game-medium > .ligne > .cards');
let cardsHard = document.querySelectorAll('.game-hard > .ligne > .cards');

const easyValuesArray = [1, 1, 2, 2, 3, 3];
const mediumValuesArray = [4, 4, 5, 5, 6, 6, 7, 7];
const hardValuesArray = [8, 8, 9, 9, 10, 10, 11, 11, 12, 12];

let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');
let btn3 = document.getElementById('btn3');
let btnClic = false;

let easyButton = document.querySelector("#btn1");
easyButton.addEventListener("click", function() {
  changeButtonColor(easyButton);
});

let mediumButton = document.querySelector("#btn2");
mediumButton.addEventListener("click", function() {
  changeButtonColor(mediumButton);
});

let hardButton = document.querySelector("#btn3");
hardButton.addEventListener("click", function() {
  changeButtonColor(hardButton);
});

function changeButtonColor(selectedButton) {
  let buttons = document.querySelectorAll(".difficulty-level");
  for (let button of buttons) {
    if (button === selectedButton) {
      button.style.backgroundColor = "red";
    } else {
      button.style.backgroundColor = "white";
    }
  }
}

function getDifficulty(level) {
    difficultyLevel = level;
    console.log(difficultyLevel + ' laaaaaaaaa');

if (difficultyLevel === 'easy') {
    test = cardsEasy;
    valuesArray = easyValuesArray;
} else if (difficultyLevel === 'medium') {
    test = cardsMedium;
    valuesArray = mediumValuesArray;
} else if (difficultyLevel === 'hard') { 
    test = cardsHard;
    valuesArray = hardValuesArray;
    }
    cardsArray = [...test];
    remainingCards = cardsArray.length;
    for (let i = 0; i < test.length; i++) {
    test[i].addEventListener('click', flipCard);
    }
    console.log(test);
    shuffleArray(valuesArray);
    assignValuesToCards(valuesArray);
}
  
  let startPage = document.querySelector('.start-page');
  let gameEasy = document.querySelector('.game-easy');
  let gameMedium = document.querySelector('.game-medium');
  let gameHard = document.querySelector('.game-hard');
  const video = document.getElementById("bg-video");

function startGame() {
    console.log('iciiiiiii');
  video.play();
  
  startPage.style.opacity = 0;
  setTimeout(() => {
    startPage.style.display = 'none';
    if (difficultyLevel === 'easy') {
        gameEasy.style.display = 'flex';
        gameEasy.style.opacity = 1;
        console.log(difficultyLevel);
    } else if (difficultyLevel === 'medium') {
        gameMedium.style.display = 'flex';
        gameMedium.style.opacity = 1;
        console.log(difficultyLevel);
    } else if (difficultyLevel === 'hard') {
        gameHard.style.display = 'flex';
        gameHard.style.opacity = 1;
    }
  }, 500);
}

// --------------------------------------------------------------------------------------
// shuffle the values array
function shuffleArray(array) {
for (let i = array.length - 1; i > 0; i--) {
let j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];
}
return array;
}

// assign values to cards
function assignValuesToCards(mode) {
for (let i = 0; i < cardsArray.length; i++) {
cardsArray[i].dataset.value = mode[i];
}
}
// -------------------------------------------------------------------------------------------

let cards = document.querySelectorAll('.cards');

console.log(test);

let flippedCards = [];
let lockBoard = false;



function flipCard() {
    if (lockBoard) return;
    if (this === flippedCards[0]) return;
    
    this.classList.add('flipped');
    flippedCards.push(this);
    
    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    var optionOne = flippedCards[0].dataset.value;
    var optionTwo = flippedCards[1].dataset.value;
    if (optionOne === optionTwo) {
        setTimeout(() => {
            disableCards();
        }, 1000);
    } else {
        unflipCards();
    }
}

// function disableCards() {
//     flippedCards[0].removeEventListener('click', flipCard);
//     flippedCards[1].removeEventListener('click', flipCard);
//     resetBoard();
// }

function disableCards() {
    flippedCards[0].style.visibility = 'hidden';
    flippedCards[1].style.visibility = 'hidden';
    remainingCards -= 2;
    if (remainingCards === 0) {
        displayWinMessage();
    }
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        flippedCards[0].classList.remove('flipped');
        flippedCards[1].classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function displayWinMessage() {
    setTimeout(() => {
        alert("VOUS AVEZ GAGNER");
    }, 400);
}

function resetBoard() {
    flippedCards = [];
    lockBoard = false;
}

