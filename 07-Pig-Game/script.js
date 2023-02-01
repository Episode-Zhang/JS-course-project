'use strict';

// playerId always shift from either 1->2 or 2->1, standing for player1 and player2.
let playerId = 1;
const WIN_SCORE = 100;

function clearElementTexts(elements) {
    for (const ele of elements) {
        ele.textContent = '0';
    }
}

/**
 * Get current score element according to current player.
 * @returns {Element} Element which id is either current--0/current--1.
 */
function getCurrentScoreElementById() {
    return playerId === 1 ? document.querySelector('#current--0')
        : document.querySelector('#current--1');
}

/**
 * Get score element according to current player.
 * @returns {Element} Element which id is either score--0/score--1.
 */
function getScoreElementById() {
    return playerId === 1 ? document.querySelector('#score--0')
        : document.querySelector('#score--1');
}

/**
 * Change the player to another one.
 */
function switchPlayer() {
    let playerElement = document.querySelector(`.player--${playerId - 1}`);
    playerElement.classList.remove('player--active');
    playerId === 1 ? playerId = 2 : playerId = 1;
    playerElement = document.querySelector(`.player--${playerId - 1}`);
    playerElement.classList.add('player--active');
}

/**
 * Add the number of dice to the current score after each rolling.
 * @param number The number of the dice in the latest rolling.
 */
function addCurrentScore(number) {
    const currentScoreElement = getCurrentScoreElementById();
    // if dice number != 1, add score to old one
    if (number !== 1) {
        const score = Number(currentScoreElement.textContent);
        currentScoreElement.textContent = String(score + number);
        return;
    }
    // else dice is 1, reset the current score and switch the player
    currentScoreElement.textContent = '0';
    switchPlayer();
}

/**
 * Add the current score to the score corresponding to the current player.
 */
function addScore() {
    const currentScoreElement = getCurrentScoreElementById(playerId);
    const currentScore = Number(currentScoreElement.textContent);
    const scoreElement = getScoreElementById(playerId);
    const score = Number(scoreElement.textContent);
    scoreElement.textContent = String(score + currentScore);
}

/**
 * Display the img element of dice.
 * @param number The number of dice.
 */
function displayDice(number) {
    const dice = document.querySelector('.dice');
    dice.src = `dice-${number}.png`;
    dice.classList.remove('hidden');
}

/**
 * Hide the picture of dice.
 */
function hideDice() {
    const dice = document.querySelector('.dice');
    dice.classList.add('hidden');
}

/**
 * Change the style of the page in winner side.
 */
function setWinnerPage() {
    const section = document.querySelector(`.player--${playerId - 1}`);
    section.classList.remove('player--active');
    section.classList.add('player--winner');
}

/**
 * Recover the page in the winner side to its initial style.
 */
function resetWinnerPage() {
    const section = document.querySelector(`.player--${playerId - 1}`);
    section.classList.remove('player--winner');
    section.classList.add('player--active');
}

/**
 * Check if the game is over. The condition of game ended is one's score achieves WIN_SCORE.
 * @returns {boolean} True if the game is over, otherwise, false.
 */
function checkGameOver() {
    const scoreElement = getScoreElementById();
    const score = Number(scoreElement.textContent);
    if (score >= WIN_SCORE) {
        // change the winner side's style of the page
        setWinnerPage();
        // hide the dice pic
        hideDice();
        return true;
    }
    return false;
}

/**
 * Remove all events registered for roll button and hold button.
 */
function clearButtons() {
    const rollBtn = document.querySelector('.btn--roll');
    const holdBtn = document.querySelector('.btn--hold');
    rollBtn.removeEventListener('click', rollDice);
    holdBtn.removeEventListener('click', hold);
}

/**
 * Roll the dice for a single time.
 */
function rollDice() {
    const number = Math.trunc(Math.random() * 6) + 1;
    // Display the number on a certain dice
    displayDice(number);
    addCurrentScore(number, playerId);
}

/**
 * Hold the current score then add it to the total score for one player.
 */
function hold() {
    addScore();
    if (checkGameOver()) {
        // keep the current data but invalid the roll & hold buttons
        clearButtons();
        return;
    }
    // else just empty the current score and to switch player.
    getCurrentScoreElementById().textContent = '0';
    switchPlayer();
}

function reset() {
    const scores = document.querySelectorAll('.score');
    const currentScores = document.querySelectorAll('.current-score');
    clearElementTexts(scores);
    clearElementTexts(currentScores);
    hideDice();
    resetWinnerPage();
    document.querySelector('.btn--roll').addEventListener('click', rollDice);
    document.querySelector('.btn--hold').addEventListener('click', hold);
    playerId = 1;
}

function main() {
    reset();
    document.querySelector('.btn--new').addEventListener('click', reset);
}

main();
