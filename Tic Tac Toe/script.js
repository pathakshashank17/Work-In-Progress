$('table').slideUp();
$('#markerChoices').slideUp();
$('#display').slideUp();

var a = [0,0,0,0,0,0,0,0,0];
var X = 'X', O = 'O';
var turn = 1;
var gameMode, nextGodMove;

// Event listener for Human / God choice
$('.playerChoices').click(function() {
    $('#playerChoices').slideUp();
    if (this.id === "human") {
        gameMode = "human";
        $('#markerChoices').slideDown();
        playAgainstHuman();
    } else {
        $('#markerChoices').slideUp();
        gameMode = "god";
        alert("Player 1 is god, I bet you can't beat him");
        $('#display').slideDown();
        $('table').toggleClass("d-none");
        $('table').slideDown();
        playAgainstGod();
    }
})

// Event listener for X / O marker choice
$('.markerChoices').click(function() {
    if (this.id === 'X') {
        var temp = X;
        X = O;
        O = temp;
    }
    $('#markerChoices').slideUp();
    $('#display').slideDown();
    $('table').toggleClass("d-none");
    $('table').slideDown();
})

// Event listener for moves by click
$('td').click(function() {
    
    // For player one
    if (turn%2!==0 && a[this.id%48] === 0) {
        this.innerHTML = O;
        if (O === 'X') {
            this.classList.toggle('text-warning');
        } else {
            this.classList.toggle('text-danger');
        }
        turn++;
        a[this.id%48] = 1;
        $('#display').text("Player 2's turn");
        console.log(a);
        if (checkWinner(a,0) === 10) {
            $('#display').text("Player 1 Wins!");
            $('td').off();
        }
    } 
    
    // For player two
    else if (turn%2 === 0 && a[this.id%48] === 0) {
        this.innerHTML = X;
        if (X === 'O') {
            this.classList.toggle('text-danger');
        } else {
            this.classList.toggle('text-warning');
        }
        turn++;
        a[this.id%48] = 2;
        $('#display').text("Player 1's turn");
        console.log(a);
        if (checkWinner(a,0) === -10) {
            $('#display').text("Player 2 Wins!");
            $('td').off();
        }
        if (gameMode === 'god') {
            playAgainstGod();
        }
    } 
    
    // For Draw
    if (isMovesLeft(a) === false) {
        if (checkWinner(a,0) === 0) {
            $('#display').text("It's a Draw! Refresh / Ctrl + r to play again");
        }
        $('td').off();
    }
})

// Fetches best move and clicks it
function playAgainstGod() {
    nextGodMove = findBestMove(a);
    $('#'+nextGodMove.toString()).trigger('click');
}

// Return best move
function findBestMove (a) {
    var bestVal = -1000;
    var bestMove = -1;
    for (var i=0;i<9;i++) {
        if (a[i] === 0) {
            a[i] = 1;
            var moveVal = minimax(a, 0, false);
            a[i] = 0;
            if (moveVal > bestVal) {
                bestMove = i;
                bestVal = moveVal;
            }
        }
    }
    console.log(bestMove);
    return bestMove;
}

// Immplementation of minimax algorithm : derived from GFG
function minimax (a, depth, isMax) {
    var score = checkWinner(a,0);
    if (score === 10 || score === -10) {
        return score;
    }
    if (isMovesLeft(a) === false) {
        return 0;
    }
    if (isMax) {
        var best = -1000;
        for (var i=0;i<9;i++) {
            if (a[i] === 0) {
                a[i] = 1;
                best = Math.max(best, minimax(a, depth+1, !isMax));
                a[i] = 0;
            }
        }
        return best;
    } else {
        var best = 1000;
        for (var i=0;i<9;i++) {
            if (a[i] === 0) {
                a[i] = 2;
                best = Math.min(best, minimax(a, depth+1, !isMax));
                a[i] = 0;
            }
        }
        return best;
    }
}

// Checks if anyone has won
function checkWinner (a, depth) {
    if (a[0] === a[3] && a[3]=== a[6] && a[0]!==0) {
        if (a[0] === 1) {
            return 10-depth;
        } else {
            return -10+depth;
        }
    } else if (a[1] === a[4] && a[4] === a[7] && a[1]!==0) {
        if (a[1] === 1) {
            return 10-depth;
        } else {
            return -10+depth;
        }
    } else if (a[2] === a[5] && a[5] === a[8] && a[2]!==0) {
        if (a[2] === 1) {
            return 10-depth;
        } else {
            return -10+depth;
        }
    } else if (a[0] === a[1] && a[1] === a[2] && a[0]!==0) {
        if (a[0] === 1) {
            return 10-depth;
        } else {
            return -10+depth;
        }
    } else if (a[3] === a[4] && a[4] === a[5] && a[3]!==0) {
        if (a[3] === 1) {
            return 10-depth;
        } else {
            return -10+depth;
        }
    } else if (a[6] === a[7] && a[7] === a[8] && a[6]!==0) {
        if (a[6] === 1) {
            return 10-depth;
        } else {
            return -10+depth;
        }
    } else if (a[0] === a[4] && a[4] === a[8] && a[0]!==0) {
        if (a[0] === 1) {
            return 10-depth;
        } else {
            return -10+depth;
        }
    } else if (a[2] === a[4] && a[4] === a[6] && a[2]!==0) {
        if (a[2] === 1) {
            return 10-depth;
        } else {
            return -10+depth;
        }
    } else {
        return 0;
    }
}

// Checks if moves are available
function isMovesLeft (a) {
    for (var i=0;i<9;i++) {
        if (a[i] === 0) {
            return true;
        }
    }
    return false;
}