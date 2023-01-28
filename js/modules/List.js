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

            if (this.form.getAttribute("data-edit")) {
                let id = this.form.elements.id.value;
                let itemToEdit = this.items.find((item) => +item.id === +id);

                if (itemToEdit) {
                    for (let key in itemToEdit) {
                        if (key !== "id" && key !== "done") {
                            itemToEdit[key] = this.form.elements[key].value;
                        }
                    }
                    this.reDrawItem(itemToEdit);
                }
                this.addToLocalStorage();
                this.renameBtn();
                this.form.removeAttribute("data-edit");
            } else {
                this.addItem();
            }
            event.target.reset();
        });

        document.addEventListener("click", () => {
            if (event.target.classList.contains("nav_link")) {
                this.changeList(event.target.getAttribute("href"));
                localStorage.setItem(
                    "lastOpenedList",
                    event.target.getAttribute("href")
                );
            }
        });
        this.openDefaultList();
    }

    addItem() {
        let elems = event.target.elements;
        if (this.name === "homeTasks") {
            let item = new Item(elems[0].value);
            this.drawItem(item);
            this.items.push(item);
        } else if (this.name === "workTasks") {
            let item = new WorkTask(elems[0].value, elems[1].value);
            this.drawItem(item);
            this.items.push(item);
        } else if (this.name === "shoppingList") {
            let item = new ShoppingTask(elems[0].value, elems[1].value);
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
            span.classList.add("item_text");
            span.innerText = item.text + " до: " + item.deadline;
            li.appendChild(span);
        } else if (this.name === "homeTasks") {
            let span = document.createElement("span");
            span.classList.add("item_text");
            span.innerText = item.text;
            li.appendChild(span);
        } else if (this.name === "shoppingList") {
            let link = document.createElement("a");
            link.classList.add("item_text");
            link.setAttribute("href", item.url);
            link.setAttribute("target", "_blank");
            link.innerText = item.text;
            li.appendChild(link);
        }
        this.addEditBtn(li, item.id);
        this.addDeleteBtn(li, item.id);
        this.list.appendChild(li);
    }

    reDrawItem(item) {
        let liToReDraw = this.list.querySelector("[id='" + item.id + "']");

        if (this.name === "workTasks") {
            let span = liToReDraw.querySelector(".item_text");
            span.innerText = item.text + " до: " + item.deadline;
        } else if (this.name === "homeTasks") {
            let span = liToReDraw.querySelector(".item_text");
            span.innerText = item.text;
        } else if (this.name === "shoppingList") {
            let link = liToReDraw.querySelector(".item_text");
            link.setAttribute("href", item.url);
            link.innerText = item.text;
        }
    }

    addToLocalStorage() {
        if (checkStorage("localStorage")) {
            localStorage[this.name] = JSON.stringify(this.items);
        } else {
            alert("Trouble with Local Storage");
        }
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
        let inputs = this.form.elements;

        for (let key in item) {
            if (inputs[key]) {
                inputs[key].value = item[key];
            }
        }
        this.renameBtn();
        this.form.setAttribute("data-edit", "true");
    }

    renameBtn() {
        let btn = Array.from(this.form.elements).find(
            (item) => item.tagName.toLowerCase() === "button"
        );
        if (btn) {
            btn.innerText = this.form.getAttribute("data-edit")
                ? btn.innerText.replace("Edit", "Add")
                : btn.innerText.replace("Add", "Edit");
        }
    }

    changeList(targetList) {
        let section = document.querySelector(targetList);
        Array.from(document.querySelectorAll(".list_wrap")).forEach((item) => {
            item.setAttribute("hidden", "");
        });
        section
            ? section.removeAttribute("hidden")
            : document.querySelector(".list_wrap").removeAttribute("hidden");
    }

    openDefaultList() {
        let target =
            window.location.hash || localStorage.getItem("lastOpenedList");
        this.changeList(target);
    }
}
