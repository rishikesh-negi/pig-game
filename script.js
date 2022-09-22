'use strict';

const totalScrP1 = document.getElementById('score--0');
const totalScrP2 = document.getElementById('score--1');
const btnNew = document.getElementById('btn-new');
const btnRoll = document.getElementById('btn-roll');
const btnHold = document.getElementById('btn-hold');
const dice = document.getElementById('dice');

const players = [
  document.getElementById('player-0'),
  document.getElementById('player-1'),
];
const playerNames = [
  document.getElementById('name--0'),
  document.getElementById('name--1'),
];
const totals = [totalScrP1, totalScrP2];
const numTotals = [
  Number(totalScrP1.textContent),
  Number(totalScrP2.textContent),
];
const currScores = [
  document.getElementById('current--0'),
  document.getElementById('current--1'),
];
let currScr = 0;
const winScr = 100;
dice.classList.add('hidden');

const setWinner = function () {
  for (let i = 0; i < 2; i++) {
    if (Number(totals[i].textContent) >= winScr) {
      btnRoll.classList.add('hidden');
      btnHold.classList.add('hidden');
      dice.classList.add('hidden');
      players[i - 1 && i + 1].classList.remove('player--active');
      players[i].classList.add('player--active', 'winner');
      playerNames[i].textContent = 'Winner!';
    }
  }
};

btnRoll.addEventListener('click', function () {
  const dieRoll = Math.trunc(Math.random() * 6) + 1;
  btnHold.classList.remove('hidden');
  dice.classList.remove('hidden');
  dice.src = `dice-${dieRoll}.png`;
  for (let i = 0; i < 2; i++) {
    if (players[i].classList.contains('player--active') && dieRoll !== 1) {
      currScr = currScr + dieRoll;
      currScores[i].textContent = currScr;
    } else if (dieRoll === 1) {
      players[i].classList.toggle('player--active');
      btnHold.classList.add('hidden');
      currScr = 0;
      currScores[i].textContent = currScr;
    }
  }
});

btnHold.addEventListener('click', function () {
  for (let i = 0; i < 2; i++) {
    if (
      players[i].classList.contains('player--active') &&
      currScores[i].textContent !== 0
    ) {
      totals[i].textContent = Number(totals[i].textContent) + currScr;
      currScr = 0;
      currScores[i].textContent = currScr;
    }
    players[i].classList.toggle('player--active');
    dice.classList.add('hidden');
  }
  this.classList.add('hidden');
  setWinner();
});

btnNew.addEventListener('click', function () {
  for (let i = 0; i < 2; i++) {
    totals[i - 1 && i + 1].textContent = 0;
    numTotals[i - 1 && i + 1] = 0;
    currScores[i - 1 && i + 1].textContent = 0;
    players[i - 1 && i + 1].classList.remove('player--active');
    players[0].classList.add('player--active');
    players[i - 1 && i + 1].style.backgroundColor = '';
    players[i - 1 && i + 1].classList.remove('winner');
    playerNames[i - 1 && i + 1].style.color = '';
    playerNames[0].textContent = 'Player 1';
    playerNames[1].textContent = 'Player 2';
    btnRoll.classList.remove('hidden');
  }
});
