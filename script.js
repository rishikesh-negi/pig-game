'use strict';

const nameP1 = document.getElementById('name--0');
const nameP2 = document.getElementById('name--1');

const totalScrP1 = document.getElementById('score--0');
const totalScrP2 = document.getElementById('score--1');

const currScrP1 = document.getElementById('current--0');
const currScrP2 = document.getElementById('current--1');

const btnNew = document.getElementById('btn-new');
const btnRoll = document.getElementById('btn-roll');
const btnHold = document.getElementById('btn-hold');

const player1 = document.getElementById('player-1');
const player2 = document.getElementById('player-2');

const dice = document.getElementById('dice');

const players = [player1, player2];
const playerNames = [nameP1, nameP2];
const totals = [totalScrP1, totalScrP2];
const numTotals = [
  Number(totalScrP1.textContent),
  Number(totalScrP2.textContent),
];
const currScores = [currScrP1, currScrP2];

let currScr = 0;
const winScr = 100;

const setWinner = function () {
  for (let i = 0; i < 2; i++) {
    if (Number(totals[i].textContent) >= winScr) {
      btnRoll.classList.add('hidden');
      btnHold.classList.add('hidden');

      players[i - 1 && i + 1].style.backgroundColor = 'rgb(250, 140, 160)';
      players[i - 1 && i + 1].classList.remove('player--active');
      players[i].classList.add('player--active', 'winner');

      playerNames[i].textContent = 'Winner!';
      playerNames[i - 1 && i + 1].style.color = 'rgb(250, 0, 0)';
    }
  }
};

btnRoll.addEventListener('click', function () {
  const dieRoll = Math.trunc(Math.random() * 6) + 1;

  btnHold.classList.remove('hidden');

  for (let i = 0; i < 2; i++) {
    if (
      players[i].classList.contains('player--active') &&
      numTotals[i] < winScr &&
      dieRoll !== 1
    ) {
      currScr = currScr + dieRoll;
      currScores[i].textContent = currScr;
    } else if (dieRoll === 1 && numTotals[i] < winScr) {
      players[i].classList.toggle('player--active');
      btnHold.classList.add('hidden');

      currScr = 0;
      currScores[i].textContent = currScr;
    }
  }

  const dieImg = [
    'dice-1.png',
    'dice-2.png',
    'dice-3.png',
    'dice-4.png',
    'dice-5.png',
    'dice-6.png',
  ];

  for (let i = 1; i < 7; i++) {
    if (i === dieRoll) {
      dice.setAttribute('src', dieImg[i - 1]);
    }
  }
});

btnHold.addEventListener('click', function () {
  for (let i = 0; i < 2; i++) {
    if (
      players[i].classList.contains('player--active') &&
      numTotals[i] < winScr &&
      currScores[i].textContent !== 0
    ) {
      totals[i].textContent = Number(totals[i].textContent) + currScr;
      currScr = 0;
      currScores[i].textContent = currScr;
    } else if (numTotals[i] >= winScr) {
      players[i].style.backgroundColor = '#333';
      btnRoll.classList.add('hidden');
      btnHold.classList.add('hidden');
    }
    players[i].classList.toggle('player--active');
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
