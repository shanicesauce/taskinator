var formE1 = document.querySelector ("#task-form");
var taskToDoEl1 = document.querySelector("#task-to-do");

var taskFormHandler= function(event){
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;    

    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    //check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert ("You need to fill out the task form!");
        return false;
    }

    formE1.reset();
    // send as an argument to createtask el
    createTaskE1(taskDataObj);
};
var createTaskE1 = function(taskDataObj) {
    //create list item
    var listItemEl1= document.createElement("li");
    listItemEl1.className = "task-item";
    // create div to hold task info and add to the list item
    var taskInfoEl1 =document.createElement("div");
    // class name
    taskInfoEl1.className="task-info"
    // add html content to div
    taskInfoEl1.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3> <span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl1.appendChild (taskInfoEl1);
    // add entire list item to list
    taskToDoEl1.appendChild(listItemEl1);

}
formE1.addEventListener("submit", taskFormHandler);