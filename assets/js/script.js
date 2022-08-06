var formE1 = document.querySelector ("#task-form");
var taskToDoEl1 = document.querySelector("#task-to-do");

var createTaskHandler= function(event){
    event.preventDefault();

    var listItemEl1= document.createElement("li");
    listItemEl1.className = "task-item";
    listItemEl1.textContent = "This is a new task.";
    taskToDoEl1.appendChild(listItemEl1);
};

formE1.addEventListener("submit", createTaskHandler);