// Adding clickable event listeners
for (var i=0;i<7;i++) {
    document.querySelectorAll('.drumSet button')[i].addEventListener('click',function() {
        playAudio(this.innerHTML);
    });
}

// Adding keypress event listeners
document.addEventListener('keypress', function() {
    playAudio(event.key);
})

function playAudio(event) {
    switch (event) {
        case 'q':
            var audio = new Audio('audio/tom-1.mp3');
            audio.play();
            break;
        case 'w':
            var audio = new Audio('audio/tom-2.mp3');
            audio.play();
            break;
        case 'e':
            var audio = new Audio('audio/tom-3.mp3');
            audio.play();
            break;
        case 'r':
            var audio = new Audio('audio/tom-4.mp3');
            audio.play();
            break;
        case 't':
            var audio = new Audio('audio/kick-bass.mp3');
            audio.play();
            break;
        case 'y':
            var audio = new Audio('audio/crash.mp3');
            audio.play();
            break;   
        case 'u':
            var audio = new Audio('audio/snare.mp3');
            audio.play();
            break;
    }
}

function buttonPressAnimation (event) {
    var activeButton = document.querySelector('.'+event);
    activeButton.classList.add('pressed');
    setTimeout(function () {
        activeButton.classList.remove('pressed');
    }, 100);
}
