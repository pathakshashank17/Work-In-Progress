var buttonColors = ["red","blue","green","yellow"], gamePattern = [], userAnswer = [];
var level = 0, id;
$('.btnSR').click(function () { 
    level = 0;
    if (level === 0) {
        $("#level-title").text("Level 0");
        nextSequence();
    }   
});

$('.btn').click(function () {
    id = this.id;
    userAnswer.push(id);
    var audio = new Audio('sounds/'+id+".mp3");
    $('#'+id).fadeOut(200).fadeIn(200);
    audio.play();
    checkAnswer();
});

function nextSequence() {
    userAnswer = []
    level++;
    $("#level-title").text("Level "+level);
    var rand = Math.ceil(Math.random()*4) - 1, randomChosenColor;
    randomChosenColor = buttonColors[rand];
    gamePattern.push(randomChosenColor);
    $('#'+randomChosenColor).fadeOut(200).fadeIn(200);
    var audio = new Audio('sounds/'+randomChosenColor+".mp3");
    audio.play();
}

function checkAnswer() {
    if (userAnswer[userAnswer.length - 1] === gamePattern[userAnswer.length - 1]) {
        console.log("success");
    } else {
        console.log("wrong");
        $('.btn').off();
        displayError();
        startOver();
    }
    if (userAnswer.length === gamePattern.length) {
        setTimeout(nextSequence, 1000);
    }
}

function displayError() {
    $('body').addClass('game-over');
    setTimeout(() => {
        $('body').removeClass('game-over');
    }, 200);
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $('#level-title').text("Game over - Press any key to restart");
}

function startOver() {
    level = 0;
    gamePattern = [];
    userAnswer = [];
    ('html').keydown(function () { 
        if (level === 0) {
            $("#level-title").text("Level 0");
            nextSequence();
        }   
    });
}