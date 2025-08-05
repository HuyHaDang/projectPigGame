'use strict';
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
const current1El = document.getElementById(`current--1`);
const current0El = document.getElementById(`current--0`);

//start condition
let score;
let activePlayer;
let currentScore;
let playing;
//function for initial
const reset = function () {
  score = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  score0El.textContent = `0`;
  score1El.textContent = `0`;
  diceEl.classList.add(`hidden`);
};
reset();

//function for switch player
const switchPlayer = function () {
  //switch player
  // 2. Reset the currentScore variable.
  currentScore = 0;
  //  1. Reset the current player's score display to 0
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  // 3. switch to the next player.
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling dice
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    //show dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //win the game
    if (score[activePlayer] >= 10) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      playing = false;
      diceEl.classList.add(`hidden`);
    } else {
      switchPlayer();
    }
  }
});

document.querySelector(`.btn--new`).addEventListener(`click`, function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--winner`);
  player0El.classList.remove(`player--active`);
  player1El.classList.remove(`player--active`);
  player0El.classList.add(`player--active`);
  current0El.textContent = 0;
  current1El.textContent = 0;
  reset();
});
