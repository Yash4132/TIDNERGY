const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which country has world’s largest tidal power plant?',
        choice1: 'Netherlands',
        choice2: 'Laos',
        choice3: 'Bolivia',
        choice4: 'SouthKorea',
        answer: 4,
    },
    {
        question: 'How many high tides occurs every day?',
        choice1: 'One',
        choice2: 'Two',
        choice3: 'Three',
        choice4: 'Four',
        answer: 2,
    },
    {
        question: 'What is the cause of tides?',
        choice1: 'Gravitaional pull of moon',
        choice2: 'Gravitaional pull of sun and moon and rotation of earth',
        choice3: 'Gravitaional pull of sun and moon ',
        choice4: 'Gravitaional pull of sun',
        answer: 2,
    },
    {
        question: 'In terms of predictability, tidal energy _____ solar and wind.?',
        choice1: 'is more predictable than',
        choice2: 'is less predictable than',
        choice3: 'has similar predictability like',
        choice4: 'cannot be predicted unlike',
        answer: 1,
    },
    {
        question: 'What year were the turbines discovered?',
        choice1: '1981',
        choice2: '1672',
        choice3: '1966',
        choice4: '2000',
        answer: 3,
    },
    {
        question: 'What are the Tidal Turbines similar to?',
        choice1: 'Fans',
        choice2: 'Wind turbines',
        choice3: 'Cellular Towers',
        choice4: 'Generator',
        answer: 2,
    },
    {
        question: 'Which of the tidal barrages has the largest capacity to generate electricity?',
        choice1: 'La Rance',
        choice2: 'Annapolis Royal',
        choice3: 'The Sihwa Lake Tidal Power Station',
        choice4: 'Russian tidal plants',
        answer: 3,
    },
    {
        question: 'Which of the following is a potential problem of a tidal barrage?',
        choice1: 'Impacts on deep marine life',
        choice2: 'Impacts on estuaries of the tidal basin',
        choice3: 'A two-way tidal power system',
        choice4: 'Decrease in turbility',
        answer: 2,
    },
    {
        question: 'Which state is the largest producer of tidal energy in India?',
        choice1: 'Gulf of Kutch',
        choice2: 'Gulf of Khambhat',
        choice3: 'Sunderbans',
        choice4: 'Seashore of Maharashtra',
        answer: 1,
    },
    {
        question: 'For exactly how much time does it take for one tidal cycle?',
        choice1: '22h, 20min',
        choice2: '20h, 10min',
        choice3: '24h, 50min',
        choice4: '22h, 50min',
        answer: 3,
    }
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()