class List {
    constructor(name, section) {
        this.name = name;
        this.section = document.querySelector(section);
        this.form = this.section.querySelector("form");
        this.list = this.section.querySelector(".list");
        this.items = [];
    }

    init() {
        if (localStorage.getItem(this.name)) {
            this.items = JSON.parse(localStorage.getItem(this.name));

            this.items.forEach((item) => {
                this.drawItem(item);
            });
        }
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.addItem();
            event.target.reset();
        });
    }

    addItem() {
        let elems = event.target.elements;
        if (this.name === "homeTasks") {
            let item = new Item(elems[0].value, this.items.length);
            this.drawItem(item);
            this.items.push(item);
        } else if (this.name === "workTasks") {
            let item = new WorkTask(
                elems[0].value,
                elems[1].value,
                this.items.length
            );
            this.drawItem(item);
            this.items.push(item);
        } else if (this.name === "shoppingList") {
            let item = new ShoppingTask(
                elems[0].value,
                elems[1].value,
                this.items.length
            );
            this.drawItem(item);
            this.items.push(item);
        }
        this.addToLocalStorage();
    }

    drawItem(item) {
        let li = document.createElement("li");
        li.id = item.id;
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
        this.addEditBtn(li, item.id);
        this.addDeleteBtn(li, item.id);
        this.list.appendChild(li);
    }

    addChecker(parent, id) {
        let checker = document.createElement("input");
        checker.setAttribute("type", "checkbox");

        checker.addEventListener("input", () => {
            let index = this.items.findIndex((item) => item.id === id);
            if (index >= 0) {
                this.items[id].done = !this.items[id].done;
            }
        });

        parent.appendChild(checker);
    }

    addDeleteBtn(parent, id) {
        let btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.classList.add("remove_item");
        btn.setAttribute("data-id-to-remove", id);
        btn.innerHTML = "&times;";

        btn.addEventListener("click", () => {
            let index = this.items.findIndex((item) => item.id === id);

            if (index >= 0) {
                this.items.splice(index, 1);
                event.target.closest("li").remove();
                this.addToLocalStorage();
            }
        });

        parent.appendChild(btn);
    }

    addEditBtn(parent, id) {
        let btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.classList.add("edit_item");
        btn.setAttribute("data-id-to-edit", id);
        btn.innerHTML = "Edit";

        btn.addEventListener("click", () => {
            let index = this.items.findIndex((item) => item.id === id);
            if (index >= 0) {
                this.startEdit(this.items[index], id);
            }
        });
        parent.appendChild(btn);
    }

    startEdit(item, id) {
        let inputs = event.target
            .closest(".list_wrap")
            .querySelector(".form").elements;

        for (let key in item) {
            if (inputs[key]) {
                inputs[key].value = item[key];
            }
        }

        let btn = Array.from(inputs).find(
            (item) => item.tagName.toLowerCase() === "button"
        );
        btn.innerText = btn.innerText.replace("Add", "Edit");
        console.log(btn);
    }

    addToLocalStorage() {
        if (checkStorage("localStorage")) {
            localStorage[this.name] = JSON.stringify(this.items);
        } else {
            alert("Trouble with Local Storage");
        }
    }
}
