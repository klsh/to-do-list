class List {
    constructor(name, section) {
        this.name = name;
        this.section = document.querySelector(section);
        this.form = this.section.querySelector("form");
        this.list = this.section.querySelector(".list");

        this.items = [];
    }

    addItem() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (this.name === "homeTasks") {
                Array.from(event.target.elements).forEach((input) => {
                    if (input.tagName.toLowerCase() === "input") {
                        this.items.push(
                            new Item(input.value, this.items.length)
                        );
                        this.drawItems(
                            new Item(input.value, this.items.length)
                        );
                    }
                });
            } else if (this.name === "workTasks") {
                this.items.push(
                    new WorkTask(
                        event.target.elements[0].value,
                        event.target.elements[1].value
                    )
                );
                this.drawItems(
                    new WorkTask(
                        event.target.elements[0].value,
                        event.target.elements[1].value,
                        this.items.length
                    )
                );
            } else if (this.name === "shoppingList") {
                this.items.push(
                    new ShoppingList(
                        event.target.elements[0].value,
                        event.target.elements[1].value,
                        this.items.length
                    )
                );
                this.drawItems(
                    new ShoppingList(
                        event.target.elements[0].value,
                        event.target.elements[1].value,
                        this.items.length
                    )
                );
            }
            event.target.reset();
        });
    }

    drawItems(item) {
        let li = document.createElement("li");
        this.addChecker(li, item.id);

        if (this.name === "workTasks") {
            let span = document.createElement("span");
            span.innerText = item.text + " до: " + item.deadline;
            li.appendChild(span);
        } else if (this.name === "homeTasks") {
            let span = document.createElement("span");
            span.innerText = item.text;
            li.appendChild(span);
        } else if (this.name === "shoppingList") {
            let link = document.createElement("a");
            link.setAttribute("href", item.url);
            link.setAttribute("target", "_blank");
            link.innerText = item.text;
            li.appendChild(link);
        }

        this.list.appendChild(li);
    }

    addChecker(parent, id) {
        let checker = document.createElement("input");
        checker.setAttribute("type", "checkbox");

        checker.addEventListener("input", () => {
            this.items[id - 1].done = !this.items[id - 1].done;
            console.log(this.items);
        });

        parent.appendChild(checker);
    }
}
