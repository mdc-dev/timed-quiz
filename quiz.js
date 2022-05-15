const data = {
    "Movies": [
        {
            "question": "What movie does not star actor/comedian Will Ferrell?",
            "choices": ["Dodgeball", "Step Brothers", "Zoolander", "Anchorman"],
            "answer": "Dodgeball"
        },
        {
            "question": "Han Solo is played by what actor?",
            "choices": ["Leonardo DiCaprio", "Ben Stiller", "Harrison Ford", "Keaneu Reeves"],
            "answer": "Harrison Ford"
        }
    ],
    "Sports": [
        {
            "question": "What is the national sport of Canada?",
            "choices": ["Hockey", "Baseball", "Lacrosse", "Basketball"],
            "answer": "Lacrosse"
        },
        {
            "question": "What country has competed the most times in the Summer Olympics yet hasn’t won a gold medal?",
            "choices": ["Russia", "Ukraine", "Ghana", "Phillipines"],
            "answer": "Phillipines"
        }
    ],
    "History": [
        {
            "question": "Which of these countries did the Soviet Union NEVER invade?",
            "choices": ["Afghanistan", "Finland", "Poland", "Sweden"],
            "answer": "Sweden"
        },
        {
            "question": "How many wives did Henery VIII have?",
            "choices": ["1", "2", "3", "6"],
            "answer": "6"
        }
    ],
    "Tv Shows": [
        {
            "question": "What is the name of Negan’s bat on The Walking Dead?",
            "choices": ["Becky", "Linda", "Lucille", "Sweetie"],
            "answer": "Lucille"
        },
        {
            "question": "South Park takes place in which state?",
            "choices": ["Arizona", "Colorado", "Montana", "Nebraska"],
            "answer": "Colorado"
        }
    ]
}

let iterator = 0;
let questionData;
let score = 0;

const questionContainer = document.querySelector('#quiz-question');
const optionButtonsContainer = document.querySelector('.quiz-choices');
const resultContainer = document.querySelector('#result')
const headline = document.querySelector('.headline')
const subHead = document.querySelector('.sub-heading')
const continueButton = document.querySelector('.continue')

function logValue() {
    console.log(this.innerHTML)
}

let buttons = document.querySelectorAll('.type');
buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const quizType = e.target.innerHTML;
        beginQuiz(quizType);
    })
});

function handleEndOfGame(answer) {
    iterator ++;
    continueButton.replaceWith(continueButton.cloneNode(false))
    let newContinueButton = document.querySelector('.continue')
    questionContainer.style.display = 'none';
    optionButtonsContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    console.log(score)
    answer === 'correct' ? score = score + 25 : score = score - 10;
    document.querySelector('.result-headline').innerHTML = 'All Done!'
    document.querySelector('.result-text').innerHTML = 'You got a score of ' + score + '/100!';
}

function checkAnswer(event) {
    let userChoice = event.target.innerHTML;
    if (userChoice === questionData[iterator].answer) {
        let answer = 'correct'
        questionContainer.style.display = 'none';
        optionButtonsContainer.style.display = 'none';
        resultContainer.style.display = 'block';
        document.querySelector('.result-headline').innerHTML = 'Congrats!'
        document.querySelector('.result-text').innerHTML = 'You got it right!';
        if (iterator < questionData.length - 1) {
            console.log(iterator, questionData.length)
            score = score + 25;
            console.log(score)
            iterator++;
        } else if (iterator === questionData.length - 1) {
            handleEndOfGame(answer)
        }

    } else {
        let answer = 'incorrect';
        if (iterator < questionData.length - 1) {
            score = score - 10;
            console.log(score)
            questionContainer.style.display = 'none';
            optionButtonsContainer.style.display = 'none';
            resultContainer.style.display = 'block';
            document.querySelector('.result-headline').innerHTML = 'Oh No!'
            document.querySelector('.result-text').innerHTML = 'You got it wrong!';
            iterator++;
        } else {
            score = score - 10;
            handleEndOfGame(answer);
        }
    }

    if (iterator < questionData.length) {
        let continueButton = document.querySelector('.continue')
        continueButton.replaceWith(continueButton.cloneNode(false))
        let newContinueButton = document.querySelector('.continue')
        newContinueButton.innerHTML = 'Continue'
        newContinueButton.addEventListener('click', fillChoices)
    } else {
        let newContinueButton = document.querySelector('.continue')
        newContinueButton.replaceWith(newContinueButton.cloneNode(false))
        let continueButton = document.querySelector('.continue')
        continueButton.innerHTML = 'Continue'
        continueButton.addEventListener('click', () => {
            console.log("The End", score)  
            redirectToMenu() 
        })
    }
}

function fillChoices() {
    questionContainer.innerHTML = questionData[iterator].question;
    questionContainer.style.display = 'block'
    optionButtonsContainer.style.display = 'block'
    resultContainer.style.display === 'block' ? resultContainer.style.display = 'none' : resultContainer.style.display;

    const options = optionButtonsContainer.querySelector('ul').querySelectorAll('li');
        options.forEach(opt => {
            opt.innerHTML = '';
            opt.innerText = ''
            opt.replaceWith(opt.cloneNode(false))
        })
    const newOptions = optionButtonsContainer.querySelector('ul').querySelectorAll('li');
    newOptions.forEach((opt, i) => {
        opt.innerHTML = questionData[iterator].choices[i];
        opt.addEventListener('click', (e) => {
            checkAnswer(e)
        })
    });

    if (!optionButtonsContainer.classList.contains('container-display')) {
        optionButtonsContainer.classList.add('container-display');
    }
}

function beginQuiz(quizType) {
    document.querySelector('.intro-message').style.display = 'none';
    document.querySelector('#quiz-options').style.display = 'none';

    questionData = data[quizType]

    document.querySelector('#header').classList.add('purple-dropdown')
    headline.classList.add('headline-vanish');
    subHead.classList.add('headline-vanish');

    fillChoices(questionData);
}

function redirectToMenu() {
    iterator = 0;
    score = 0;
    resultContainer.style.display = 'none';
    document.querySelector('.intro-message').style.display = 'block';
    document.querySelector('#quiz-options').style.display = 'block';

    headline.classList.remove('headline-vanish');
    subHead.classList.remove('headline-vanish');
    document.querySelector('#header').classList.remove('purple-dropdown')
}