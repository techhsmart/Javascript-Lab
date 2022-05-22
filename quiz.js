// We are getting the reference to dom elements
let questionDisplay = document.getElementById("question");
let choiceD = [];
let buttons = [];

for (var i=0; i < 4; i++) {
    choiceD.push( document.getElementById("choice"+i) );
    buttons.push( document.getElementById("btn"+i) );
}

let progress = document.getElementById("progress");

// Now we create a quiz object to store score and questions
function Question( question, choices, answer ) {
    this.question = question;
    this.choices = choices;
    this.answer = answer;
}

// We define the questions array next.
var questions = [
    new Question("JavaScript supports", ["Functions", "XHTML","CSS", "HTML"], "Functions"),
    new Question("Which of the following object is the main entry point to all client-side JavaScript features and APIs?", ["Position", "Window", "Standard", "Location"], "Position"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("JavaScript is a_language ", ["Pass-by-reference", "Pass-by-value", "Both", "None of them"], "Pass-by-reference")
  ];
  
// The Quiz object will track the current question and user score
function Quiz( questions ) {
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkAnswer = function( userChoice ) {
    if ( userChoice === this.getQuestionByIndex().answer ) {
        this.score += 1;
    }
    this.questionIndex++;
    if ( this.questionIndex == this.questions.length ) {
        endQuiz();
    }
}

// Instantiating the Quiz object
var quiz = new Quiz( questions );

function loadPage() {
    // First we get the current Question object in Quiz
    var currentQuestion = quiz.getQuestionByIndex();

    // Now we show the question in display
    questionDisplay.innerText  = currentQuestion.question;

    // Then we display the choices
    for (var i=0; i < currentQuestion.choices.length; i++) {
        choiceD[i].innerText = currentQuestion.choices[i];

        handleOptionButton( currentQuestion.choices[i], buttons[i] );
    }

    // Finally, we display the progress
    var indexActual = quiz.questionIndex + 1;
    progress.innerText = "Question " + indexActual + " of " + questions.length;
}

function handleOptionButton( choice, btn ) {
    btn.onclick = function() {
        quiz.checkAnswer( choice );
        loadPage();
    }
}

function endQuiz() {
    var userScore = quiz.score;
    var totalScore = quiz.questions.length;
    var scorePercentage = ( userScore / totalScore ) * 100;

    var quizDisplay = document.getElementById("quiz");
    quizDisplay.innerHTML = `
        <p id="score">
            User score is ${userScore}/${totalScore} !! <br/>
            Percentage is ${scorePercentage}%
        </p>
    `;

}

loadPage();

