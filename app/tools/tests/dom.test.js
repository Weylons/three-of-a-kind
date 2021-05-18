import { readFileSync } from 'fs';
import { resolve } from 'path';
document.body.innerHTML = readFileSync(resolve(__dirname, '../../index.html'), 'utf8');

import Dom from "../dom.js";

const dom = new Dom();

describe("Dom manipulation test", () => {

    describe("When the game is not started", () => {
        test("the bar is displayed and the dices are empty", () => {
            expect($("#start_bar").css("display")).toBe("block");
            $(".dices").each((_, dice) => expect($(dice).html()).toBe(""));
        });

        test("the buttons and the result panel are hidden", () => {
            expect($("#launch_button").css("opacity")).toBe("0");
            expect($("#stop_button").css("opacity")).toBe("0");
            expect($("#result").css("display")).toBe("none");
        });

        test("I can't click on a dice", () => {
            $(".dices").each((_, dice) => {
                $(dice).trigger("click");
                expect($(dice).hasClass("selected")).not.toBeTruthy();
            });
        })

        test("if i start the game the bar is hidden and the dices are numbered", () => {
            $("#start_bar").trigger("click");
            expect($("#start_bar").css("display")).toBe("none");
        });

        it("changes the dices value", () => {
            $(".dices").each((i, dice) => {
                dom.setDiceValue(i + 1, 2)
                expect($(dice).html()).toBe("2")
            });
        })
    });

    describe("When the game is started", () => {
        test("the remaining launch count is updated", () => {
            const remainingTest = "2";
            dom.setRemainingLaunch(remainingTest)
            expect($('#remaining').html()).toBe(remainingTest);
        });

        test("the buttons are shown", () => {
            expect($("#launch_button").css("opacity")).toBe("1");
            expect($("#stop_button").css("opacity")).toBe("1");
        });

        test("the result panel is hidden", () => {
            expect($("#result").css("display")).toBe("none");
        });

        test("if a dice is clicked he gets a class", () => {
            $(".dices").each((_, dice) => {
                expect($(dice).hasClass("selected")).not.toBeTruthy();
                $(dice).trigger("click");
                expect($(dice).hasClass("selected")).toBeTruthy();
                $(dice).trigger("click");
                expect($(dice).hasClass("selected")).not.toBeTruthy();
            });
        });
    });

    describe("if I stop the game", () => {
        test("the result is displayed", () => {
            $("#stop_button").trigger("click");
            expect($("#result").css("display")).toBe("block");
        });
    });

    describe("if I click on the cross inside the result panel", () => {
        test("The dices are empty", () => {
            $("#close_result").trigger("click");
            $(".dices").each((_, dice) => expect($(dice).html()).toBe(""));
        });
        test("the result panel is closed", () => {
            $("#close_result").trigger("click");
            expect($("#result").css("display")).toBe("none");
        })
        test("the bar is displayed", () => {
            $("#close_result").trigger("click");
            expect($("#start_bar").css("display")).toBe("block");
        });
    });
});