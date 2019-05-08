(
    function() {
        var audio = document.querySelectorAll("audio")[1];
        console.log(audio);
        
        var container = document.querySelector("div");
        console.log(container);
        
        container.addEventListener("click", function() {
            console.log("clicked, mp3 started");
            audio.play();
        });
        
        document.onload = function() {
            console.log("mp3 started");
            audio.play();
        }
    }
)();