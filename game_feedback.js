class GameFeedback {
    constructor() {
        this.tick = 0;
        this.active = true;
    }
    run = () => {
        if(this.active) {
            this.tick += 1
            this.tick = (this.tick % 10000)
            let tickout = this.tick.toString().padStart(4, '0')
            let resp = tickout + localGameEvents
            document.getElementById('fb').innerHTML = resp
        }
    }
}