'use strict';

let ans = Math.trunc(Math.random() * 20) + 1;
let success = false;

function handleScore(currentScore) {
    const highestScore = Number(document.querySelector('.highscore').textContent);
    if (currentScore > highestScore) {
        document.querySelector('.highscore').textContent = String(currentScore);
    }
}

function compareNumber() {
    let score = Number(document.querySelector('.score').textContent);
    if (score === 0) {
        document.querySelector('.message').textContent = '🥵 You lose game!';
        return;
    } else if (success) {
        return;
    }
    // Each click consumes one score
    score -= 1;
    const userInput = Number(document.querySelector('.guess').value);
    if (!userInput) {
        document.querySelector('.message').textContent = '🤗 No number entered!';
    } else {
        if (userInput === ans) {
            document.querySelector('.message').textContent = '😋 Correct number!';
            document.querySelector('.number').textContent = String(ans);
            document.querySelector('.number').style.width = '25rem';
            document.querySelector('body').style.backgroundColor = '#60b347';
            success = true;
            handleScore(score);
        } else if (userInput < ans) {
            document.querySelector('.message').textContent = '😅 Too small!';
        } else {
            document.querySelector('.message').textContent = '😅 Too big!';
        }
        document.querySelector('.score').textContent = String(score);
    }
}

function reset() {
    success = false;
    document.querySelector('.score').textContent = '20';
    ans = Math.trunc(Math.random() * 20) + 1;
    document.querySelector('.message').textContent = 'Guess My Number!';
    document.querySelector('.number').textContent = '?';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
}

console.log(ans);

document.querySelector('.check').addEventListener('click', compareNumber);
document.querySelector('.again').addEventListener('click', reset);
