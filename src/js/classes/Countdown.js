export class Countdown {
    constructor(nodeElement, finishDate) {
        this.finishDate = finishDate;

        this.daysDOM = nodeElement.children[0].children[0];
        this.hoursDOM = nodeElement.children[1].children[0];
        this.minutesDOM = nodeElement.children[2].children[0];
        this.secondsDOM = nodeElement.children[3].children[0];

        let countdown;
    }

    start() {
        this.countdown = setInterval(() => {
            this.refresh();
        }, 1000);
    }

    stop() {
        clearInterval(this.countdown);
    }

    getCurrentDate() {
        return new Date().getTime();
    }
    getDays() {
        return Math.floor(
            new Date(this.finishDate).getTime() / (1000 * 60 * 60 * 24) -
                this.getCurrentDate() / (1000 * 60 * 60 * 24),
        );
    }
    getHours() {
        return Math.floor(
            (new Date(this.finishDate).getTime() / (1000 * 60 * 60) -
                this.getCurrentDate() / (1000 * 60 * 60)) %
                24,
        );
    }
    getMinutes() {
        return Math.floor(
            (new Date(this.finishDate).getTime() / (1000 * 60) -
                this.getCurrentDate() / (1000 * 60)) %
                60,
        );
    }
    getSeconds() {
        return Math.floor(
            (new Date(this.finishDate).getTime() / 1000 -
                this.getCurrentDate() / 1000) %
                60,
        );
    }
    refresh() {
        const template = (value) => {
            if (value < 10) {
                return `0${value}`;
            } else {
                return value;
            }
        };

        this.daysDOM.textContent = template(this.getDays());
        this.hoursDOM.textContent = template(this.getHours());
        this.minutesDOM.textContent = template(this.getMinutes());
        this.secondsDOM.textContent = template(this.getSeconds());
    }
}
