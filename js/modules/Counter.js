class Counter {
    constructor(input) {
        this.input = input;
        this.interval;
    }

    init() {
        document.addEventListener("click", () => {
            if (event.target.id === "startCount") {
                this.startCount();
            }
            if (event.target.id === "pauseCount") {
                this.pauseCount();
            }
            if (event.target.id === "resetCount") {
                this.resetCount();
            }
        });
    }

    startCount() {
        if (this.input.value > 0) {
            let output = document.getElementById("counter_output");
            let current = this.input.value;
            this.interval = setInterval(() => {
                if (current > 0) {
                    output.innerText = current--;
                    if (output.innerText < 10) {
                        output.innerText = output.innerText.padStart(2, "0");
                    }
                } else if (current == 0) {
                    alert("Сountdown is over!");
                    this.resetCount();
                } else {
                    this.resetCount();
                }
            }, 1000);
        } else {
            alert("Input number bigger then 0");
        }
    }

    resetCount() {
        clearInterval(this.interval);
        let output = document.getElementById("counter_output");
        output.innerText = 0;
        this.input.value = 0;
    }

    pauseCount() {
        clearInterval(this.interval);
        let output = document.getElementById("counter_output");
        this.input.value = parseInt(output.innerText);
    }
}
