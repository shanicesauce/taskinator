var formEl = document.querySelector ("#task-form");
var taskToDoEl1 = document.querySelector("#task-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var taskInProgressEl = document.querySelector("#tasks-in-progress");
var taskCompletedEl = document.querySelector ("#tasks-completed");

var taskFormHandler= function(event){
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;    

    var isEdit = formEl.hasAttribute("data-task-id");
    
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput,taskTypeInput,taskId);
    }
    else {
        //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
    };
    createTaskEl (taskDataObj);
    //check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert ("You need to fill out the task form!");
        return false;
    }

    formEl.reset();
    // send as an argument to createtask el
};
}
var completeEditTask = function(taskName, taskType,taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    
    alert("Task Updated!");
    formEl.removeAttribute ("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}

var createTaskEl = function(taskDataObj) {
    //create list item
    var listItemEl1= document.createElement("li");
    listItemEl1.className = "task-item";

    //custom attribute
    listItemEl1.setAttribute("data-task-id",taskIdCounter);
    // create div to hold task info and add to the list item
    var taskInfoEl1 =document.createElement("div");
    // class name
    taskInfoEl1.className="task-info"
    // add html content to div
    taskInfoEl1.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3> <span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl1.appendChild (taskInfoEl1);

    var taskActionsEl= createTaskActions(taskIdCounter);
    listItemEl1.appendChild(taskActionsEl);
    // add entire list item to list
    taskToDoEl1.appendChild(listItemEl1);

    //increase task counter for next unique id
    taskIdCounter++;
}

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    
    //edit button
    var editButtonEl = document.createElement ("button");
    editButtonEl.textContent="Edit";
    editButtonEl.className="btn edit-btn";
    editButtonEl.setAttribute("data-task-id",taskId);

    actionContainerEl.appendChild(editButtonEl);

    // delete button
    var deleteButtonEl = document.createElement ("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id",taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    //dropdown
    var statusSelectEl=document.createElement("select");
    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length;i++) {
        var statusOptionEl= document.createElement("option");
        statusOptionEl.textContent= statusChoices[i];
        statusOptionEl.setAttribute("value",statusChoices[i]);
        statusSelectEl.appendChild(statusOptionEl);
    }
    statusSelectEl.className="select-status";
    statusSelectEl.setAttribute ("name","status-change");
    statusSelectEl.setAttribute("data-task-id",taskId);

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event) {
    var targetEl = event.target;
    //edit button
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId)
    }
    //delete button
    if (targetEl.matches(".delete-btn")){
        var taskId = targetEl.getAttribute("data-task-id");
         deleteTask(taskId);
     }
};
var editTask = function(taskId) {
    console.log("editing task #" + taskId);

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
   
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
   
    var taskType = taskSelected.querySelector("span.task-type").textContent
    
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id",taskId);
}
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
}

var taskStatusChangeHandler = function(event){
var taskId = event.target.getAttribute("data-task-id");

var stausValue = event.target.value.toLowerCase();

var taskSelected = document.querySelector (".task-item[data-task-id='" + taskId + "']");

if (stausValue === "to do") {
    taskToDoEl1.appendChild(taskSelected);
}
else if (stausValue === "in progress") {
    taskInProgressEl.appendChild(taskSelected);
}
else if (stausValue === "completed") {
    taskCompletedEl.appendChild(taskSelected);
}
}
pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);
