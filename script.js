window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const message = document.querySelector('.guess-message'),
        question = document.querySelector('.question'),
        btnCheck = document.querySelector('.btn.check'),
        btnAgain = document.querySelector('.btn.again'),
        numInput = document.querySelector('.number-input'),
        total = document.querySelector('.score'),
        bestResult = document.querySelector('.highscore');

    let result = generateRandomNumber(); // Загаданное число
    let score = 20;
    let highScore = 0;

    // Генерация случайного числа
    function generateRandomNumber() {
        return Math.floor(Math.random() * 20) + 1;
    }

    // Сброс игры
    function resetGame() {
        message.textContent = 'Начни угадывать!';
        document.body.style.backgroundColor = 'black';
        question.style.width = '25rem';
        question.textContent = '???';
        result = generateRandomNumber();
        score = 20;
        total.textContent = score;
        numInput.value = ''; // Очистка инпута
    }

    // Обработка ввода
    function handleInputValidation(input) {
        if (input.value > 20) {
            input.value = input.value.replace(/\d/g, '');
        }
        input.value = input.value.replace(/\D/g, '');
    }

    // Проверка результата
    function checkGuess(number) {
        if (!number) {
            message.textContent = 'Введите число от 1 до 20';
        } else if (number === result) {
            handleCorrectGuess();
        } else {
            handleIncorrectGuess(number);
        }
    }

    // Логика при правильном угадывании
    function handleCorrectGuess() {
        message.textContent = 'Правильно!';
        document.body.style.backgroundColor = 'green';
        question.style.width = '50rem';
        question.textContent = result;

        if (score > highScore) {
            highScore = score;
            bestResult.textContent = highScore;
        }
    }

    // Логика при неправильном угадывании
    function handleIncorrectGuess(number) {
        if (score > 1) {
            message.textContent = number > result ? 'Слишком много!' : 'Слишком мало!';
            score--;
            total.textContent = score;
        } else {
            message.textContent = 'Игра окончена!';
            total.textContent = 0;
        }
    }

    // Слушатели событий
    numInput.addEventListener('input', () => handleInputValidation(numInput));

    btnCheck.addEventListener('click', (e) => {
        e.preventDefault();
        const number = Number(numInput.value);
        checkGuess(number);
    });

    btnAgain.addEventListener('click', resetGame);
});
