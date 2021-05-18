import Game from "../game.js";

const game = new Game();
jest.spyOn(game, 'getNewValue');

describe("When I start the game", () => {
    game.start();
    it("start the game", () => {
        expect(game.started).toBeTruthy();
    })
    it("launch the dices", () => {
        game.dices.forEach(dice => expect(dice.value).not.toBe(null));
    })
});

describe("When I launch the dices", () => {
    test("all dices are numbered", () => {
        game.dices.forEach(dice => expect(dice.value).not.toBe(null));
    });
});

describe("When i save a dice", () => {
    it("save it", () => {
        game.save(0);
        expect(game.dices[0].saved).toBeTruthy();
    });
    test("its value won't change", () => {
        jest.clearAllMocks();
        game.dices[0].value = 0;
        game.launch();
        expect(game.dices[0].value).toBe(0);
        expect(game.getNewValue).toHaveBeenCalledTimes(2);
    });
});

describe("When i unsave a dice", () => {
    it("unsave it", () => {
        game.save(0);
        expect(game.dices[0].saved).not.toBeTruthy();
    });
    test("its value change", () => {
        jest.clearAllMocks();
        game.launch();
        expect(game.dices[0].value).not.toBe(0);
        expect(game.getNewValue).toHaveBeenCalledTimes(3);
    });
});

describe("If no launch remains", () => {
    test("I can't launch the dices", () => {
        game.remaining = 0;
        expect(() => game.launch()).toThrowError("No launch remaining");
    });
});

describe("If game is over", () => {
    it("calcul if brelan", () => {
        game.dices = game.dices.map(_ => ({ ..._, value: 5 }));
        expect(game.isBrelan()).toBe(true);
        game.dices[0].value = 1;
        expect(game.isBrelan()).toBe(false);
    });
});