(function () {
    var audio = document.getElementById("audio1");

    var buttonPlay = document.getElementById("startAudioButton");
    var buttonPause = document.getElementById("pauseAudioButton");
    var buttonStop = document.getElementById("stopAudioButton");
    var buttonMute = document.getElementById("muteButton");
    var changeSrc = document.getElementById("changeSrc");
    
    var showStatsTag = document.getElementById("showStats");

    buttonPlay.addEventListener("click", function () {
        console.log("start button was clicked");
        audio.play();
    });

    buttonPause.addEventListener("click", function () {
        console.log("pause button was clicked");
        audio.pause();
    });

    buttonStop.addEventListener("click", function () {
        console.log("stop button was clicked");
        audio.load();
    });

    buttonMute.addEventListener("click", function () {
        if (audio.muted === false) {
            audio.muted = true;
            buttonMute.innerHTML = "Unmute audio";
        } else {
            audio.muted = false;
            buttonMute.innerHTML = "Mute audio";
        }
        
    });

    showStatsTag.addEventListener("mouseover", function() {
        console.log(audio.currentSrc);
        console.log("length (s): " + audio.duration);
    });
    
    changeSrc.addEventListener("mouseover", function() {
        if (audio.src.endsWith("Sleep_Away.mp3")) {
            audio.src = "silence.mp3";
        } else {
            audio.src = "Sleep_Away.mp3";
        }
    });
})();
