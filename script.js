const timerEl = document.querySelector(".timer-container")
const pauseBtn = document.getElementById("pause")
const resumeBtn = document.getElementById("resume")

const settings = {
    //in minutes
    pomodoro: 1,
    shortBreak: 5,
    longBreak: 25,
    intervals: 10,
}

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
    }
}

pauseBtn.addEventListener('click', ()=>{
    timer.pause()
})

resumeBtn.addEventListener('click', ()=>{
    timer.resume()
})

timer.start(0, settings)