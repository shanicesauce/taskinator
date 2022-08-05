var buttonE1 = document.querySelector ("#save-task");
console.log(buttonE1);
var taskToDoEl1 = document.querySelector("#task-to-do");

var createTaskHandler= function(){
    var listItemEl1= document.createElement("li");
    listItemEl1.className = "task-item";
    listItemEl1.textContent = "This is a new task.";
    taskToDoEl1.appendChild(listItemEl1);
};

buttonE1.addEventListener("click",createTaskHandler);