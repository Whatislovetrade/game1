window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const message = document.querySelector('.guess-message'),
        question = document.querySelector('.question'),
        btnCheck = document.querySelector('.btn.check'),
        btnAgain = document.querySelector('.btn.again'),
        numInput = document.querySelector('.number-input'),
        total = document.querySelector('.score'),
        form = document.querySelector('#form-value'),
        bestResult = document.querySelector('.highscore')
    
    
    // Рандомное число от 1 до 20
    let randomNumber = (min, max) => {
        return min + Math.round(Math.random() * (max-min))
    }

    function refreshPage() {
        document.querySelector('.guess-message').textContent = 'Начни угадывать!'
        document.querySelector('body').style.backgroundColor = 'black'
        question.style.width = '25rem'
        question.textContent = '???'
        result = randomNumber(1, 20)
        score = 20
        total.textContent = score
        form.reset()
    }

   

    //Проверка числа если больше 20 или если будет введено не число то строка остается пустой
    function checkNum(input) {
        if (input.value > 20) {
            return input.value = input.value.replace(/\d/g, '')
        }
       return input.value = input.value.replace(/\D/g, '')
    }

    
    
    // Слушатель событий для инпут
    numInput.addEventListener('input', () => {
        checkNum(numInput)
    })
    
    let result = randomNumber(1, 20)
    let score = 20
    let highScore = 0
    // question.textContent = result


    // Слушатель событий для кнопки проверить
    btnCheck.addEventListener('click', (e) => {
        e.preventDefault()

        const number = Number(numInput.value)
        
        
        if (!number) { // Если значение пустое(false) то вывовдится сообщение
            message.textContent = 'Введите число от 1 до 20'

            //Победа
        } else if (number === result) {
            message.textContent = 'Правильно!'
            document.querySelector('body').style.backgroundColor = 'green'
            question.style.width = '50rem'
            question.textContent = result

            if (score > highScore) {
                highScore = score
                bestResult.textContent = highScore
            }

        } else if (number > result) {
            if (score > 0) {
                message.textContent = 'Слишком много!'
                score--
                total.textContent = score
            } else {
                message.textContent = 'Игра окочена!'
            }

        } else {
            if (score > 0) {
                message.textContent = 'Слишком мало!'
                score--
                total.textContent = score
            } else {
                message.textContent = 'Игра окочена!'
            }
        }
    })

    btnAgain.addEventListener('click', refreshPage)

})