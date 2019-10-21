//create global variables to track question number and score count
let questionCount = 0;
let scoreCount = 0;

//updates the questionNumber when function is called and updates text
function updateQuestionCount (){
    questionCount++;
    $('.questionCount').text(questionCount);
} //WORKS

//updates the scoreCount when function is called and updates text
function updateScoreCount (){
    scoreCount++;
    $('.scoreCount').text(scoreCount);
} //WORKS

//when startButton is clicked, toggles on notDisplayed for openingPage 
//and toggles off notDisplayed for questionArea
//and calls updateQuestionCount
function startButtonClicked (){
    $('.startButton').on('click',function(event){
        event.preventDefault();
        $('.openingPage').toggleClass('notDisplayed');
        $('.questionArea').toggleClass('notDisplayed');
        updateQuestionCount();
        generateQuestion();
    })  
} //WORKS

//generates html for questionArea pulling in questions and answer options 
//from STORE array using current scoreCount
function generateQuestion(){
    $('.questionArea').html(
        `<form class="questionAreaForm">
            <legend> ${STORE[questionCount-1].question} </legend>
        </form>`
    );
    generateRadios();
    $(`<button type="submit" class="submitAnswer">Submit</button>`).appendTo($('.questionAreaForm'));
} //WORKS

//generates radios using the answer options from STORE array
function generateRadios(){
    STORE[questionCount-1].options.forEach(function (optionValue, optionIndex) {
        $(`<label class="sizeMe" for="${optionIndex}">
            <input class="radio" type="radio" id="${optionIndex}" value="${optionValue}" name="option" required>
            <span>${optionValue}</span>
          </label>
          `).appendTo($('.questionAreaForm'));
      });
} //WORKS

//when submitAnswer button is clicked, checks if selected answer is correct
//if correct, displays correctResponseArea and calls updateScoreCount
//if incorrect, displays incorrectResponseArea
function submitAnswerButtonClicked (){
    $('.questionArea').on('submit','.submitAnswer',function(event){ //why is this restarting the quiz
        event.preventDefault();
        alert("clicked");
        //$('.questionArea').toggleClass('notDisplayed');
        //$('.correctResponseArea').toggleClass('notDisplayed');
        
        //let selectedAnswer = $('input:checked');
        //let correctAnswer = STORE[questionCount-1].answerIndex;
        //if (selectedAnswer === correctAnswer){
            //correctAnswerResponse();
        //}
        //else{
            //incorrectAnswerResponse();
        //};
    })
}

function correctAnswerResponse(){
    $('.correctResponseArea').text(hello)
    $('.questionArea').toggleClass('notDisplayed');
    $('.correctResponseArea').toggleClass('notDisplayed');
}

function incorrectAnswerResponse(){
    $('.correctResponseArea').text(hello)
    $('.questionArea').toggleClass('notDisplayed');
    $('.correctResponseArea').toggleClass('notDisplayed');
}

//when next button clicked, updateQuestionCount, call generateQuestion 
function nextButtonClicked (){

}

//if questionCount is at 10, generate a seeScore button instead of a nextB button
function generateSeeScoreButton (){

}

//when seeScoreButton is clicked, display finalArea and show scoreCount
//generate tryAgain button
function showUserFinalScore (){

}

//when tryAgain button is clicked, reset questionCount and scoreCount
//to 0 and display openingPage
function restartQuiz(){

}

function createQuiz(){
    startButtonClicked();
    generateQuestion();
    submitAnswerButtonClicked();
    nextButtonClicked();
    generateSeeScoreButton();
    showUserFinalScore();
    restartQuiz();
}

$(createQuiz)