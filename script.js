const timerEl = document.querySelector(".timer-container")

const settings = {
    //in minutes
    pomodoro: 1,
    shortBreak: 5,
    longBreak: 25,
    intervals: 10,
}

const timer = {
    pad: function(number) {
        return number < 10 ? `0${number.toString()}` : number
    },

    count: function(time){
        let minutesRemaining = time-1;
        let secondsRemaining = 59;
        timerEl.innerText = `${minutesRemaining}:${secondsRemaining}`

        const counter = setInterval(()=>{
            secondsRemaining--
            if(secondsRemaining === 0 && minutesRemaining !== 0){
                minutesRemaining--
                secondsRemaining = 59
            }else if(minutesRemaining === 0 && secondsRemaining ===0){
                clearInterval(counter)
            }

            timerEl.innerText = `${this.pad(minutesRemaining)}:${this.pad(secondsRemaining)}`               
            
        }, 100)
    },

    start: function(state, settings){
        switch(state){
            case 0: this.count(settings.pomodoro); break;
            case 1: this.count(settings.shortBreak); break;
            case 2: this.count(settings.longBreak); break;
        }
    }
}

timer.start(0, settings)