//create global variables to track question number and score count
let questionCount = 0;
let scoreCount = 0;

//updates the questionNumber when function is called and updates text
function updateQuestionCount (){
    questionCount++;
    $('.questionCount').text(questionCount);
} 

//updates the scoreCount when function is called and updates text
function updateScoreCount (){
    scoreCount++;
    $('.scoreCount').text(scoreCount);
} 

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
        submitAnswerButtonClicked();
    })  
} 

//generates html for questionArea pulling in questions and answer options 
//from STORE array using current scoreCount
function generateQuestion(){
    $('.questionArea').html(
        `<form class="questionAreaForm">
        <legend> ${STORE[questionCount-1].question} </legend>
        <div class="radioContainer"></div>
        </form>`
    );
    generateRadios();
    $(`<button type="submit" class="submitAnswer">Submit</button>`).appendTo($('.questionAreaForm'));
} 

//generates radios using the answer options from STORE array
function generateRadios(){
    STORE[questionCount-1].options.forEach(function (optionValue, optionIndex) {
        $(`<label class="sizeMe" for="${optionIndex}">
            <input class="radio" type="radio" id="${optionIndex}" value="${optionValue}" name="option" required>
            <span>${optionValue}</span>
          </label>
          `).appendTo($('.radioContainer'));
      });
} 

//when submitAnswer button is clicked, checks if selected answer is correct
//if correct, displays correctResponseArea
//if incorrect, displays incorrectResponseArea
function submitAnswerButtonClicked (){
    $('.questionAreaForm').on('submit',function(event){ //why is this restarting the quiz
        event.preventDefault();
        if ($('input[name="option"]:checked').val() == STORE[questionCount-1].answer){
            correctAnswerResponse();
        }
        else{
            incorrectAnswerResponse();
        };
    })
} 

//displayed when the correct answer is selected and updates score count
function correctAnswerResponse(){
    $('.responseArea').html(`<h2>Correct!</h2><img class="responseImg" src="images/correct.png" alt="pumpkin"><p>${STORE[questionCount-1].additional}</p><button class="next">Next</button>`);
    $('.questionArea').toggleClass('notDisplayed');
    $('.responseArea').toggleClass('notDisplayed');
    updateScoreCount();
    nextButtonClicked();
} 

//displayed when the incorrect answer is selected
function incorrectAnswerResponse(){
    $('.responseArea').html(`<h2>Boo!</h2> <p> The correct answer is: ${STORE[questionCount-1].answer}</p><img class="responseImg" src="images/incorrect.png" alt="bats"><p>${STORE[questionCount-1].additional}</p><button class="next">Next</button>`);
    $('.questionArea').toggleClass('notDisplayed');
    $('.responseArea').toggleClass('notDisplayed');
    nextButtonClicked();
} 

//when next button clicked, updateQuestionCount, call generateQuestion 
//if more questions remain. if no more questions, show finalArea and 
//calls showUserFinalScore function
function nextButtonClicked (){
    $('.next').on('click',function(event){
        event.preventDefault();
        if (questionCount<10){
            updateQuestionCount();
            $('.responseArea').toggleClass('notDisplayed');
            $('.questionArea').toggleClass('notDisplayed');
            generateQuestion();
        }
        else {
            $('.responseArea').toggleClass('notDisplayed');
            $('.finalArea').toggleClass('notDisplayed');
            showUserFinalScore();
        };
        submitAnswerButtonClicked();
    })
}

//display finalArea message depending on score, creates restart button
function showUserFinalScore (){
    if (scoreCount > 5){
        $('.finalArea').html(`<h2>Congrats! You're the scariest ghost in the graveyard!</h2> <h3> Your score is: ${scoreCount}/10 </h3><img class="responseImg" src="images/goodEnd.png" alt="trick-or-treat candy"><p> If this were trick-or-treating, you'd get the king size bar.</p><button class="restartButton">Try Again</button>`)
    }
    else {
        $('.finalArea').html(`<h2>Not so good... your Halloween knowledge must be cursed!</h2> <h3> Your score is: ${scoreCount}/10 </h3><img class="responseImg" src="images/badEnd.jpg" alt="witch"> <p> If this were trick-or-treating, you'd get some black licorice. Better luck next time.</p> <button class="restartButton">Try Again</button>`)
    };
    restartQuiz();
}

//when tryAgain button is clicked, reset questionCount and scoreCount
//to 0 and display openingPage
function restartQuiz(){
    $('.restartButton').on('click',function(event){
        questionCount=0;
        $('.questionCount').text(questionCount);
        scoreCount=0;
        $('.scoreCount').text(scoreCount);
        $('.finalArea').toggleClass('notDisplayed');
        $('.openingPage').toggleClass('notDisplayed');
    })
}

function createQuiz(){
    startButtonClicked();
    generateQuestion();
    submitAnswerButtonClicked();
    nextButtonClicked();
    showUserFinalScore();
}

$(createQuiz)