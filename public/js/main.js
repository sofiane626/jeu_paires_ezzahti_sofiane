function startGame() {
  let startPage = document.querySelector('.start-page');
  let gamePage = document.querySelector('.game-page');
  
  startPage.style.opacity = 0;
  setTimeout(() => {
    startPage.style.display = 'none';
    gamePage.style.display = 'flex';
    gamePage.style.opacity = 1;
  }, 500);
}

// --------------------------------------------------------------------------------------
const card = document.querySelectorAll('.cards');
const cardsArray = [...card];
let valuesArray = [1,1,2,2,3,3];

// shuffle the values array
valuesArray = shuffleArray(valuesArray);

// assign values to cards
for (let i = 0; i < cardsArray.length; i++) {
    cardsArray[i].dataset.value = valuesArray[i];
}

// shuffle function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// -------------------------------------------------------------------------------------------

let cards = document.querySelectorAll('.cards');
let remainingCards = cardsArray.length;

function flipCard() {
    this.classList.toggle('flipped');
}

for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', flipCard);
}

let flippedCards = [];
let lockBoard = false;

for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', flipCard);
}

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

