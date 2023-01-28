let homeTasksList = new List("homeTasks", "#homeTasks");
let shoppingList = new List("shoppingList", "#shoppingList");
let workTasksList = new List("workTasks", "#workTasks");

homeTasksList.init();
shoppingList.init();
workTasksList.init();

function checkStorage(type) {
    try {
        var storage = window[type];
        let x = "storage test";
        storage.setItem(x, x), storage.removeItem(x);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

let counter = new Counter(document.querySelector('[name="counter_num"]'));
counter.init();

let watch = new StopWatch(document.querySelector('[name="stopwatch_num"]'));
watch.init();
