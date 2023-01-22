//  CHRONO

let chrono = document.getElementById("chrono");
let minutes = 0;
let secondes = 0;
let timeout;
let estArrete = true;

const demarrer = () => {
  if (estArrete) {
    estArrete = false;
    defilerTemps();
    console.log("par laaaaaaaaaaaaaaaaa");
  }
};

const arreter = () => {
  if (!estArrete) {
    estArrete = true;
    clearTimeout(timeout);
  }
};

const defilerTemps = () => {
  if (estArrete) return;

  secondes++;

  if (secondes === 60) {
    minutes++;
    secondes = 0;
  }

  // affichage
  //   if (secondes < 10) {
  //     secondes = "0" + secondes;
  //   }
  //   if (minutes < 10) {
  //     minutes = "0" + minutes;
  //   }
  chrono.innerText = `${minutes}:${secondes}`;
  timeout = setTimeout(defilerTemps, 1000);
};

const reset = () => {
  chrono.textContent = "00:00";
  estArrete = true;
  minutes = 0;
  secondes = 0;
  clearTimeout(timeout);
};

// ----------------------------------------------------------------------------------------------------------------------------

let difficultyLevel;
let test;
let valuesArray;
let cardsArray;
let remainingCards;

let cardsEasy = document.querySelectorAll(".game-easy > .ligne > .cards");
let cardsMedium = document.querySelectorAll(".game-medium > .ligne > .cards");
let cardsHard = document.querySelectorAll(".game-hard > .ligne > .cards");

const easyValuesArray = [1, 1, 2, 2, 3, 3];
const mediumValuesArray = [4, 4, 5, 5, 6, 6, 7, 7];
const hardValuesArray = [8, 8, 9, 9, 10, 10, 11, 11, 12, 12];

let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let btnClic = false;

function changeButtonColor(selectedButton) {
  let buttons = document.querySelectorAll(".difficulty-level");
  for (let button of buttons) {
    if (button === selectedButton) {
      button.style.backgroundColor = "#ED344A";
    } else {
      button.style.backgroundColor = "white";
    }
  }
}

let easyButton = document.querySelector("#btn1");
easyButton.addEventListener("click", function () {
  changeButtonColor(easyButton);
});

let mediumButton = document.querySelector("#btn2");
mediumButton.addEventListener("click", function () {
  changeButtonColor(mediumButton);
});

let hardButton = document.querySelector("#btn3");
hardButton.addEventListener("click", function () {
  changeButtonColor(hardButton);
});

function getDifficulty(level) {
  difficultyLevel = level;
  console.log(difficultyLevel + " laaaaaaaaa");

  if (difficultyLevel === "easy") {
    test = cardsEasy;
    valuesArray = easyValuesArray;
  } else if (difficultyLevel === "medium") {
    test = cardsMedium;
    valuesArray = mediumValuesArray;
  } else if (difficultyLevel === "hard") {
    test = cardsHard;
    valuesArray = hardValuesArray;
  }
  cardsArray = [...test];
  remainingCards = cardsArray.length;
  for (let i = 0; i < test.length; i++) {
    test[i].addEventListener("click", flipCard);
  }
  console.log(test);
  shuffleArray(valuesArray);
  assignValuesToCards(valuesArray);
}

// --------------------------------------------------------------------------------------------------------------

let startPage = document.querySelector(".start-page");
let gameEasy = document.querySelector(".game-easy");
let gameMedium = document.querySelector(".game-medium");
let gameHard = document.querySelector(".game-hard");
const video = document.getElementById("bg-video");

function startGame() {
  console.log(difficultyLevel);
  let pseudo = document.getElementById("username").value;
  if (difficultyLevel == undefined || pseudo === "") {
    alert(
      "Veuillez choisir un niveau de difficulté et entrer un pseudo avant de commencer la partie"
    );
    return;
  }
  console.log("iciiiiiii");
  video.play();
  demarrer();

  startPage.style.opacity = 0;
  setTimeout(() => {
    startPage.style.display = "none";
    if (difficultyLevel === "easy") {
      gameEasy.style.display = "flex";
      gameEasy.style.opacity = 1;
      chrono.style.display = "flex";
      console.log(difficultyLevel);
    } else if (difficultyLevel === "medium") {
      gameMedium.style.display = "flex";
      gameMedium.style.opacity = 1;
      chrono.style.display = "flex";
      console.log(difficultyLevel);
    } else if (difficultyLevel === "hard") {
      gameHard.style.display = "flex";
      gameHard.style.opacity = 1;
      chrono.style.display = "flex";
    }
  }, 500);
}

// --------------------------------------------------------------------------------------

function shuffleArray(array) {
  // On crée une variable "temp" qui va nous servir à échanger les valeurs dans le tableau
  let temp;
  // On fait une boucle qui parcours tout le tableau
  for (let i = 0; i < array.length; i++) {
    // On choisit un index aléatoire dans le tableau
    let randomIndex = Math.floor(Math.random() * array.length);
    // On échange la valeur de l'index courant avec celle de l'index aléatoire
    temp = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = temp;
  }
  // On retourne le tableau mélangé
  return array;
}

// met une valeur a la carte
function assignValuesToCards(mode) {
  for (let i = 0; i < cardsArray.length; i++) {
    cardsArray[i].dataset.value = mode[i];
  }
}
// -------------------------------------------------------------------------------------------

let cards = document.querySelectorAll(".cards");

console.log(test);

let flippedCards = [];
let lockBoard = false;

function flipCard() {
  if (lockBoard) return;
  if (this === flippedCards[0]) return;

  this.classList.add("flipped");
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

function disableCards() {
  flippedCards[0].style.visibility = "hidden";
  flippedCards[1].style.visibility = "hidden";
  remainingCards -= 2;
  if (remainingCards === 0) {
    displayWinMessage();
  }
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    flippedCards[0].classList.remove("flipped");
    flippedCards[1].classList.remove("flipped");
    resetBoard();
  }, 1000);
}

let gameScore = document.querySelector(".game-score");

function displayWinMessage() {
  arreter();
  setTimeout(() => {
    if (difficultyLevel === "easy") {
      gameEasy.style.display = "none";
      gameScore.style.display = "flex";
    } else if (difficultyLevel === "medium") {
      gameMedium.style.display = "none";
      gameScore.style.display = "flex";
    } else if (difficultyLevel === "hard") {
      gameHard.style.display = "none";
      gameScore.style.display = "flex";
    }
    const username = document.getElementById("username").value;
    const time = document.getElementById("chrono").textContent;
    const scoreboard = document.getElementById("scoreboard");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<td>${username}</td><td>${difficultyLevel}</td><td>${time}</td>`;
    scoreboard.appendChild(newRow);
  }, 400);
}

function resetBoard() {
  flippedCards = [];
  lockBoard = false;
}

// ------------------------------------------------------------------------------------------------------------
