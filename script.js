const hh = document.getElementById("hoursInput");
const mm = document.getElementById("minutesInput");
const ss = document.getElementById("secondsInput");
const set = document.getElementById("set");
const timersContainer = document.querySelector(".timersContainer");
const stopSound = document.getElementById("timer-end");


function noTimerCheck(){
    if(timersContainer.childElementCount == 0){
        // No timer present , display you have no timers present currently
        const noTimerMsg = document.createElement("p");
        noTimerMsg.textContent = "You have no timers currently!";
        document.querySelector(".noTimer").appendChild(noTimerMsg);
    }
    else {
        document.querySelector(".noTimer").innerHTML = "";
    }
}

noTimerCheck();

set.addEventListener('click', () => {
    const hours = parseInt(hh.value) || 0;
    const minutes = parseInt(mm.value) || 0;
    const seconds = parseInt(ss.value) || 0;

    // calculate the total time in seconds 
    let totalTimeInSec = hours * 3600 + minutes * 60 + seconds;
    
    // create timer element 
    const timerElement = document.createElement("div");
    timerElement.classList.add("timerElementCount");
    let text = document.createElement("p");
    text.innerText = "Time Left: ";
    let p = document.createElement("p");
    p.textContent = formatTime(hours, minutes, seconds);

    // create delete btn 
    const deleteButton = document.createElement('button');
    deleteButton.classList.add("deleteBtn");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', ()=> {
        timerElement.remove(text,timerElement,deleteButton);
        clearInterval(intervalId);
        noTimerCheck();
    });

    
    // Append the timer element to the timers container 
    timerElement.append(text,p,deleteButton);
    timersContainer.append(timerElement);
   
    noTimerCheck();

    // Start the timer using setInterval
    const intervalId = setInterval( ()=> {
        if(totalTimeInSec > 0){
            totalTimeInSec--;

            // update the timer text 
            p.textContent = formatTime(
                Math.floor(totalTimeInSec / 3600),
                Math.floor((totalTimeInSec % 3600) / 60),
                totalTimeInSec % 60
            );
        } else {
            // Timer has reached 0
            clearInterval(intervalId);
            timerElement.classList.add("isFinished");
            text.textContent = "";
            p.textContent = "Timer is Up !";
            deleteButton.textContent = "Stop";
            // When timer is of play sound 
            stopSound.play();   
        }
    },1000);
    
    deleteButton.addEventListener('click',()=>{
        stopSound.pause();
    });

});

function formatTime(hours,minutes,seconds) {
    return (
        padZero(hours) +' '+' '+':' +' '+' '+
        padZero(minutes) +' '+' '+':'+' '+' '+
        padZero(seconds)
    );
}

// Helper function to pad single digit number with a leading zero 
function padZero(num){
    return num < 10 ? '0' + num : num;
}