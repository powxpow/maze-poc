class GameLoop {
    //generic for other games to be added later
    constructor(game) {
        this.game = game;
        this.timeLast = Date.now();
        this.timeDelta = 0
        this.run();
    }

    run = () => {
        let timeNow = Date.now();
        this.timeDelta = (timeNow - this.timeLast) // milliseconds
        //console.log(this.timeDelta)
        let update = 100 //milliseconds
        if(this.timeDelta > update) {
            this.timeLast = timeNow;
            this.game.run();
        }

        requestAnimationFrame(this.run);
    }
}

