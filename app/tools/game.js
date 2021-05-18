export default class Game {
    eventReceiver = () => null;
    numberOfFace = 6
    started = false;
    remaining = 3;
    dices;

    constructor() {
        this.initDices();
    }

    launch() {
        if (this.remaining) {
            this.dices.forEach((dice, i) => {
                if (!dice.saved) {
                    this.getNewValue(i)
                }
            });
            this.remaining--
            if (!this.remaining) {
                setTimeout(() => this.eventReceiver("result", this.stop()), 500);
            }
            return this.remaining;
        }
        else {
            throw new Error("No launch remaining");
        }
    }

    initDices() {
        this.dices = new Array(3).fill().map(_ => ({ value: null, saved: false }))
    }

    save(index) {
        if(this.started){
            console.log(index);
            this.dices[index].saved = !this.dices[index].saved
        }
    }

    getNewValue(i) {
        const newValue = Math.floor(Math.random() * this.numberOfFace) + 1;
        this.dices[i].value = newValue;
        this.eventReceiver("dice_value", newValue, i + 1)
    }

    start() {
        this.initDices();
        this.remaining = 3;
        this.started = true;
        return this.launch();
    }

    stop() {
        this.started = false;
        if (this.isBrelan()) {
            return "You got three " + this.dices[0].value + ", it's a success !";
        }
        else {
            return "Failure";
        }
    }

    isBrelan() {
        return !this.dices.filter(_ => _.value !== this.dices[0].value).length
    }

    sendEventTo(receiver) {
        this.eventReceiver = receiver;
    }



}