export default class Dom {

    eventReceiver = () => null;

    constructor() {
        this.setEvents();
        this.setStopInterface();
    }

    setEvents() {
        this.setStopEvent();
        this.setDiceEvent();
        this.setLaunchEvent();
        this.setStartBarEvent();
        this.setCloseResultEvent();
    }

    setStartBarEvent() {
        $("#start_bar").on("click", (e) => {
            $("#start_bar").css("display", "none");
            this.setStartCurrentInterface();
            const remaining = this.eventReceiver("start");
            this.setRemainingLaunch(remaining);
        });
    }

    setLaunchEvent() {
        $("#launch_button").on("click", (e) => {
            const remaining = this.eventReceiver("launch");
            this.setRemainingLaunch(remaining)
        });
    }

    setDiceEvent() {
        $(".dices").on("click", (e) => {
            if ($("#start_bar").css("display") === "none") {
                $(e.target).toggleClass("selected");
                const id = parseInt(e.target.id.split("_")[1]) - 1;
                this.eventReceiver("selected", id);
            }
        });
    }

    setStopEvent() {
        $("#stop_button").on("click", (e) => {
            const result = this.eventReceiver("stop");
            this.setResult(result);
        });
    }

    setResult(result) {
        this.setEndInterface();
        $("#result_text").html(result);
    }

    setCloseResultEvent() {
        $("#close_result").on("click", e => {
            this.setStopInterface();
        })
    }

    setRemainingLaunch(value) {
        $("#remaining").html(value);
    }

    reinitDices() {
        $(".dices").each((_, dice) => {
            $(dice).html("")
            $(dice).removeClass("selected")
        });
    }

    setDiceValue(index, value) {
        $("#die_" + index).html(value);
    }

    setStartCurrentInterface() {
        $("#launch_button").css("opacity", "1");
        $("#stop_button").css("opacity", "1");
    }

    setStopInterface() {
        $("#launch_button").css("opacity", "0");
        $("#stop_button").css("opacity", "0");
        $("#start_bar").css("display", "block");
        $("#result").css("display", "none");
        this.reinitDices();
    }

    setEndInterface() {
        $("#result").css("display", "block");
    }

    sendEventTo(receiver) {
        this.eventReceiver = receiver;
    }
}