const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
let currentQuestion = {};
//if user choose answer by click take false value else take true
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
      "question": "Inside which HTML element do we put the JavaScript??",
      "choice1": "<script>",
      "choice2": "<javascript>",
      "choice3": "<js>",
      "choice4": "<scripting>",
      "answer": 1
    },
    {
      "question": "What is the correct syntax for referring to an external script called 'xxx.js'?",
      "choice1": "<script href='xxx.js'>",
      "choice2": "<script name='xxx.js'>",
      "choice3": "<script src='xxx.js'>",
      "choice4": "<script file='xxx.js'>",
      "answer": 3
    },
    {
      "question": " How do you write 'Hello World' in an alert box?",
      "choice1": "msgBox('Hello World');",
      "choice2": "alertBox('Hello World');",
      "choice3": "msg('Hello World');",
      "choice4": "alert('Hello World');",
      "answer": 4
    },
    {
        "question": " When was Netflix founded?",
        "choice1": "1997",
        "choice2": "2001",
        "choice3": "2009",
        "choice4": "2015",
        "answer": 1
      },
      {
        "question": " What was the most-watched series on Netflix in 2019?",
        "choice1": "Toy Story",
        "choice2": "Central Perk",
        "choice3": "Stranger Things",
        "choice4": "Snow White",
        "answer": 3
      },
      {
        "question": " Which football team is known as ‘The Red Devils’?",
        "choice1": "Real Madrid",
        "choice2": "Manchester United",
        "choice3": "LiverPool",
        "choice4": "Barcelona",
        "answer": 2
      },
      {
        "question": " Where is Billie Eilish from?",
        "choice1": "London",
        "choice2": "Iraq",
        "choice3": "Los Angeles",
        "choice4": "Span",
        "answer": 3
      },
      {
        "question": " When was the first issue of Vogue published?",
        "choice1": "1892",
        "choice2": "1960",
        "choice3": "2000",
        "choice4": "2001",
        "answer": 1
      },
      {
        "question": " How many time zones are there in Russia?",
        "choice1": "2",
        "choice2": "13",
        "choice3": "20",
        "choice4": "11",
        "answer": 4
      },
      {
        "question": " How many days does it take for the Earth to orbit the Sun?",
        "choice1": "200",
        "choice2": "400",
        "choice3": "365",
        "choice4": "500",
        "answer": 3
      }
  ]

//CONSTANTS
//present the value of correct answer selected
const CORRECT_BONUS = 1;
//present the number of quiz's questions
const MAX_QUESTIONS = 10;


//the function which show the question of quiz
getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
      //this equals to choice.data-number=1 or 2 or 3 or 4
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    /*remove one question object which locates on the random questionIndex we generated and showed previously
    inside availableQuesions to prevent question repeating 
    splice(start(index),deletecount(no of element wanted to remove), the elements we want to replace with the deleted elements) */ 
    availableQuesions.splice(questionIndex, 1);
    //this variable to let user to chose answer by click
    acceptingAnswers = true;
};


startGame = () => {
    questionCounter = 0;
    score = 0;
    //... to iterable objects
    availableQuesions = [...questions];
    getNewQuestion();
};

questions.map(item=>{
    startGame();
});

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;
        //can't make another answer
        acceptingAnswers = false;
        //which choice click
        const selectedChoice = e.target;
        //get the value of the selected choice
        const selectedAnswer = selectedChoice.dataset['number'];
        //check if the selected choice is the correct answer
        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
            //show for user the answer is correct by changing the choice to green color and add the score by 1
            if (classToApply === 'correct') {
                incrementScore(CORRECT_BONUS);
            }
    
            selectedChoice.parentElement.classList.add(classToApply);
    
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }, 1000);  

    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};