class Item {
    constructor(text) {
        (this.text = text), (this.done = false), (this.id = Date.now());
    }
}
