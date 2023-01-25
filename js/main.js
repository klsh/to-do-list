// let workTask = new WorkTask("workTask", "Work task description", "18-12-22");
// let toBuy = new ShoppingTask(
//     "shoppingTask",
//     "Shopping task description",
//     "google.com"
// );

// console.log(workTask);
// console.log(toBuy);

// let myLists = {
//     homeTasks: [],
//     workTasks: [],
//     shoppingList: [],
//     createItem: function () {},
//     addItem: function () {},
// };

// let homeForm = document.querySelector("#homeTasks .form");

let homeTasksList = new List("homeTasks", "#homeTasks");
let workTasksList = new List("workTasks", "#workTasks");
let shoppingList = new List("shoppingList", "#shoppingList");

homeTasksList.init();
workTasksList.init();
shoppingList.init();

// document.querySelector(".test_storage").onclick = () => {
//     console.log("test");

//     localStorage.setItem("testItemName", "test item value for local storage");
//     sessionStorage.setItem(
//         "testItemName",
//         "test item value for session storage"
//     );

//     localStorage.removeItem("testItemName");
//     sessionStorage.removeItem("testItemName");
// };

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

// checkStorage("localStorage");
// checkStorage("sessionStorage");

// if (checkStorage("localStorage")) {
//     // что-то делать
//     console.log("OK");
// } else {
//     // видать сообщение, что сторадж не работает и сайт может работать некорректно
//     console.error("Not OK");
// }

// localStorage["newItem1"] = "test new item";
// localStorage.newItem2 = "test new item";
// localStorage.setItem("itemName3", "item value");

// localStorage.clear();
