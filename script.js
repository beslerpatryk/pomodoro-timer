const timerEl = document.querySelector(".timer-container")
// Buttons
const startBtn = document.getElementById("start")
const pauseBtn = document.getElementById("pause")
const resumeBtn = document.getElementById("resume")
const resetBtn = document.getElementById("reset")

// Put default settings inside localStorage
if(!localStorage.focusTime){
    localStorage.setItem("focusTime", 25);
    localStorage.setItem("shortBreak", 5);
    localStorage.setItem("longBreak", 15);
    localStorage.setItem("intervals", 10);
}

// Initialize default settings (in minutes) if localStorage is empty
const settings = {
    pomodoro: localStorage.getItem("focusTime"),
    shortBreak: localStorage.getItem("shortBreak"),
    longBreak: localStorage.getItem("longBreak"),
    intervals: localStorage.getItem("intervals"),

    updateSettings(){
        this.pomodoro = localStorage.getItem("focusTime");
        this.shortBreak = localStorage.getItem("shortBreak");
        this.longBreak = localStorage.getItem("longBreak");
        this.intervals = localStorage.getItem("intervals");
    }
}

document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    const focusTime = document.getElementById("focusTime");
    const shortBreak = document.getElementById("shortBreak");
    const longBreak = document.getElementById("longBreak");
    const intervals = document.getElementById("intervals");

    localStorage.setItem("focusTime", focusTime.value);
    localStorage.setItem("shortBreak", shortBreak.value);
    localStorage.setItem("longBreak", longBreak.value);
    localStorage.setItem("intervals", intervals.value);

    settings.updateSettings();
})

const timer = {
    status: "run",

    pad(number) {
        return number < 10 ? `0${number.toString()}` : number
    },

    count(time, seconds = 59){
        let minutesRemaining = time-1;
        minutesRemaining<0?minutesRemaining=0:"nothing";
        let secondsRemaining = seconds;
        timerEl.innerText = `${this.pad(minutesRemaining)}:${this.pad(secondsRemaining)}`               

        const counter = setInterval(()=>{
            secondsRemaining--
            if(secondsRemaining === 0 && minutesRemaining !== 0){
                minutesRemaining--
                secondsRemaining = 59
            }else if(minutesRemaining === 0 && secondsRemaining ===0){
                clearInterval(counter)
            }

            timerEl.innerText = `${this.pad(minutesRemaining)}:${this.pad(secondsRemaining)}`               
            
        }, 1000)
    },

    start(state, settings){
        switch(state){
            case 0: this.count(settings.pomodoro); break;
            case 1: this.count(settings.shortBreak); break;
            case 2: this.count(settings.longBreak); break;
        }
    },

    pause(){
        for (var i = 1; i < 99999; i++)
        window.clearInterval(i);
        this.status = "pause"
    },

    resume(){
        if(this.status==="pause"){
            this.status = "run"
            let time = timerEl.innerText
            let minutesRemaining = Number(time[0]+time[1])
            let secondsRemaining = Number(time[3]+time[4])
            timerEl.innerText = `${this.pad(minutesRemaining)}:${this.pad(secondsRemaining)}`               
            this.count(minutesRemaining+1, secondsRemaining-1)
        }
    },

    reset(){
        for (var i = 1; i < 99999; i++){
            window.clearInterval(i);
        }
        timerEl.innerText = `${this.pad(settings.pomodoro)}:${this.pad(0)}`;        
        this.status = "run";
    }
}

timerEl.innerText = `${timer.pad(settings.pomodoro)}:${timer.pad(0)}`;        


startBtn.addEventListener('click', ()=>{
    timer.start(0, settings);
    startBtn.disabled = true;
})

pauseBtn.addEventListener('click', ()=>{
    timer.pause();
})

resumeBtn.addEventListener('click', ()=>{
    timer.resume();
})

resetBtn.addEventListener('click', ()=>{
    timer.reset();
    startBtn.disabled = false;
})