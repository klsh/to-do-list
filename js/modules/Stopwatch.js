class StopWatch {
    constructor(input) {
        this.input = input;
        this.interval;
    }

    init() {
        document.addEventListener("click", () => {
            if (event.target.id === "startWatch") {
                this.startWatch();
            }
            if (event.target.id === "pauseWatch") {
                this.pauseWatch();
            }
            if (event.target.id === "resetWatch") {
                this.resetWatch();
            }
        });
    }

    startWatch() {
        if (this.input.value >= 0) {
            let output = document.getElementById("stopwatch_output");
            let current = 0;
            current = this.input.value;
            this.interval = setInterval(() => {
                if (current >= 0) {
                    output.innerText = current++;
                    if (output.innerText < 10) {
                        output.innerText = output.innerText.padStart(2, "0");
                    }
                } else {
                    this.resetWatch();
                }
            }, 1000);
        } else {
            alert("Input number bigger then 0");
        }
    }

    resetWatch() {
        clearInterval(this.interval);
        let output = document.getElementById("stopwatch_output");
        output.innerText = 0;
        this.input.value = 0;
    }

    pauseWatch() {
        clearInterval(this.interval);
        let output = document.getElementById("stopwatch_output");
        this.input.value = parseInt(output.innerText);
    }
}
