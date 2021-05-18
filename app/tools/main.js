import Dom from "./dom.js";
import Game from "./game.js";

const dom = new Dom();
const game = new Game();
game.sendEventTo(gameEvent)
dom.sendEventTo(domEvent)

function domEvent(event, value){
    switch (event) {
        case "start": return game.start();
        case "launch": return game.launch();
        case "selected": return game.save(value);
        case "stop": return game.stop();
    }
}

function gameEvent(event, value, index){
    switch (event) {
        case "result": return dom.setResult(value);
        case "dice_value": dom.setDiceValue(index, value);
    }
}