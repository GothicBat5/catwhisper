
const player = document.getElementById("musicPlayer");
const buttons = document.querySelectorAll(".play-sample");

let activeButton = null;
let clipEnd = null;

buttons.forEach(function(button) 
{
    button.addEventListener("click", async function() 
    {

        // Clicking the currently playing sample pauses it
        if (activeButton === button && !player.paused) 
        {
            player.pause();
            button.textContent = "▶ Play Sample";
            return;
        }

        // Stop the previous sample
        player.pause();

        if (activeButton) 
        {
            activeButton.textContent = "▶ Play Sample";
        }

        activeButton = button;
        clipEnd = Number(button.dataset.end);

        player.src = button.dataset.src;

        // Start at the chosen position
        player.currentTime = Number(button.dataset.start);
        button.textContent = "❚❚ Pause";

        try {
            await player.play();
        } 
        catch (error) 
        {
            button.textContent = "▶ Play Sample";
            activeButton = null;
            console.error("Could not play audio:", error);
        }
    });
});

// Stop playback at the end of the sample
player.addEventListener("timeupdate", function() 
{
    if (clipEnd !== null && player.currentTime >= clipEnd) 
        {
        player.pause();
        player.currentTime = clipEnd;

        if (activeButton) 
            {
            activeButton.textContent = "▶ Play Sample";
            activeButton = null;
        }
    }
});

// Reset the button when playback ends naturally
player.addEventListener("ended", function() 
{
    if (activeButton) 
        {
        activeButton.textContent = "▶ Play Sample";
        activeButton = null;
    }
});
