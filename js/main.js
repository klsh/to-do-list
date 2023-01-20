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

homeTasksList.addItem();
workTasksList.addItem();
shoppingList.addItem();
