var randP1 = Math.ceil(Math.random() * 6), randP2 = Math.ceil(Math.random() * 6);
var p1 = document.querySelector('#p1'), p2 = document.querySelector('#p2');
displayDice(randP1, p1);
displayDice(randP2, p2);
var result = document.querySelector('h2');
if (randP2 > randP1) {
    result.innerHTML = "Player 2 wins!";
} else if (randP1 > randP2) {
    result.innerHTML = "Player 1 wins!";
} else {
    result.innerHTML = "Its a draw! please try again";
}

function displayDice (n, p) {
    if (n === 1) {
        p.setAttribute('src','imgs/dice1.png');
    } else if (n === 2) {
        p.setAttribute('src','imgs/dice2.png');
    } else if (n === 3) {
        p.setAttribute('src','imgs/dice3.png');
    } else if (n === 4) {
        p.setAttribute('src','imgs/dice4.png');
    } else if (n === 5) {
        p.setAttribute('src','imgs/dice5.png');
    } else if (n === 6) {
        p.setAttribute('src','imgs/dice6.png');
    }
}