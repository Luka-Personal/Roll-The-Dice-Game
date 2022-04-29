`use strict`;
// consts
const mainGame = document.querySelector(`.game-main`);
const dicePhoto = document.querySelector(`.dice`);
const rollBTN = document.querySelector(`.btn-roll`);
const holdBTN = document.querySelector(`.btn-hold`);
const newBTN = document.querySelector(`.btn-new`);
const howBTN = document.querySelector(`.btn-how`);
const rollScoreEl0 = document.querySelector(`.score__roll_0`);
const rollScoreEl1 = document.querySelector(`.score__roll_1`);
const holdScoreEl0 = document.querySelector(`.score__hold--0`);
const holdScoreEl1 = document.querySelector(`.score__hold--1`);
const holdScore = document.querySelector(`.score`);
const activePlayerEl0 = document.querySelector(`.game--0`);
const activePlayerEl1 = document.querySelector(`.game--1`);
const closeTutBtn = document.querySelector(`.close-tutorial`);
const tutText = document.querySelector(`.how-to`);
// FUNCTIONS
// switch player after winning or holding
const switchPlayer = function () {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  activePlayerEl0.classList.toggle(`active-player`);
  activePlayerEl1.classList.toggle(`active-player`);
};
// clear scores after winning or holding
const clearScores = function () {
  rollScoreEl0.textContent = 0;
  rollScoreEl1.textContent = 0;
  rollScore = 0;
};
// close tutorial text after clicking X or escape on keyboard
const closeTutorial = function () {
  tutText.style.display = `none`;
  mainGame.classList.remove(`blur`);
  mainGame.style.pointerEvents = `all`;
};
// init lets
let randomNumber;
let rollScore;
let activePlayer;
let scores;
let playing;

// init function
const init = function () {
  randomNumber = Math.trunc(Math.random() * 6) + 1;
  rollScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  holdScoreEl0.textContent = 0;
  holdScoreEl1.textContent = 0;
  clearScores();
  activePlayerEl0.classList.add(`active-player`);
  activePlayerEl1.classList.remove(`active-player`);
  activePlayerEl0.classList.remove(`winner-player`);
  activePlayerEl1.classList.remove(`winner-player`);
  dicePhoto.classList.add(`hidden`);
};
init();
// roll dice
rollBTN.addEventListener(`click`, function () {
  if (playing) {
    dicePhoto.classList.remove(`hidden`);
    randomNumber = Math.trunc(Math.random() * 6) + 1;
    dicePhoto.src = `img/dice-${randomNumber}.png`;
    // console.log(randomNumber);
    if (randomNumber != 1) {
      rollScore += randomNumber;
      document.querySelector(`.score__roll_${activePlayer}`).textContent = rollScore;
    } else {
      switchPlayer();
      clearScores();
      console.log(activePlayer);
    }
  }
});
// hold score
holdBTN.addEventListener(`click`, function () {
  if (playing) {
    scores[activePlayer] += rollScore;
    if (scores[activePlayer] >= 100) {
      document.querySelector(`.game--${activePlayer}`).classList.add(`winner-player`);
      playing = false;
      dicePhoto.classList.add(`hidden`);
    }
    document.querySelector(`.score__hold--${activePlayer}`).textContent = scores[activePlayer];
    switchPlayer();
    clearScores();
    console.log(scores);
  }
});
// start new game
newBTN.addEventListener(`click`, init);
// open tutorial
howBTN.addEventListener(`click`, function () {
  tutText.style.display = `block`;
  mainGame.classList.add(`blur`);
  mainGame.style.pointerEvents = `none`;
});
// close tutorial
closeTutBtn.addEventListener(`click`, function () {
  closeTutorial();
});
// close tut esc
document.addEventListener(`keydown`, function (e) {
  if (e.key === `Escape` && mainGame.style.pointerEvents === `none`) {
    closeTutorial();
  }
});
