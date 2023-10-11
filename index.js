"use Strict";
const addBtn = document.getElementById("add-btn");
const inputTask = document.getElementById("task");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("counter");
const completeAll = document.getElementById("complete-all");
const clearCompleted = document.getElementById("clear-task");
const completed = document.getElementById("completed");
const unCompleted = document.getElementById("unCompleted");
const showAll = document.getElementById("showAll");


let tasks = [] ;
let completedTasks = [];
let unCompletedTasks = [];

// Load tasks from local storage when the page loads
window.onload = () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderList();
    }
};

//Eventlistener to show add button
inputTask.addEventListener('focus', function () {
    addBtn.style.display = "block";
})

// EventListener on add button
addBtn.addEventListener('click', handleAddButton);

// EventListener on Enter Button
document.addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
        handleAddButton();
    }
})

// Function to create an object when button is clicked
function handleAddButton() {
    const text = inputTask.value.trim();
    if (text !== "") {
        const task = {
            title: text,
            id: Date.now(),
            completed: false,
        }
        inputTask.value = "";
        addTask(task);
    }
}

//Function to push a task in array
function addTask(task) {
    if (task) {
        tasks.push(task);
        renderList();
        return;
    }
}
//function to render the list
function renderList() {
    taskList.innerHTML = " ";
    let unCompletedTask = 0;
    for (let i = 0; i < tasks.length; i++) {
        addTaskToDOM(tasks[i]);
        if (!tasks[i].completed) {
            unCompletedTask++;
        }}
        taskCounter.textContent = unCompletedTask;

    localStorage.setItem("tasks",JSON.stringify(tasks));
    // console.log(localStorage.getItem("tasks"));

}

//function to show the rendered list on the user interface
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.innerHTML = `<div>
    
        <input id=${task.id} type="checkbox" ${task.completed ? 'checked' : ''}>
        <label for=${task.id}>
    <span id=${task.id}>${task.title}</span>
    </label>
    
    <img id=${task.id} src="images/close.png" class="close">
    </div>`;

    li.addEventListener('mouseover', function () {
        const image = this.querySelector("img");
        image.style.display = "block";
    })

    li.addEventListener('mouseout', function () {
        const image = this.querySelector("img");
        image.style.display = "none";
    })
    taskList.appendChild(li);
    inputTask.value = "";
}

taskList.addEventListener("click",(e) =>{
    // if(e.target.classList.contains())
    const taskId = e.target.id;
    // console.log(taskId);
    const task = tasks.find(task => task.id == taskId);
    if(task){
    task.completed = !task.completed;
    renderList();
    }
} )

taskList.addEventListener("click",(e)=>{
    if(e.target.matches(".close"))
    {
        const taskId = e.target.id;
        // console.log(taskId);
        const filteredTask = tasks.filter( task=> task.id != taskId );
        console.log(filteredTask);
        tasks = filteredTask;
        renderList();
    }
})

//Eventlistener to complete all tasks
completeAll.addEventListener('click', function () {
    const complete = true;
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].completed = complete;
    };
    renderList();
})

//Eventlistener to clear completed tasks
clearCompleted.addEventListener('click', function () {
    const filteredtask = tasks.filter(task =>
        !task.completed);
    tasks = filteredtask;
    renderList();
})

//Eventlistener to hide the add button
document.addEventListener('click', function (event) {
    if (event.target !== inputTask) {
        addBtn.style.display = "none";
    }
})

//Eventlistener for the all button which show all the tasks
showAll.addEventListener('click', function () {
    renderList();
})

//Eventlistener for rendering the completed tasks
completed.addEventListener('click', function () {
    for (let i = 0; i < tasks.length; i++) {
        const filteredtask = tasks.filter(task => task.completed);
        completedTasks = filteredtask;
        completedrenderList();
    };
})

//Eventlistener for rendering the uncompleted tasks
unCompleted.addEventListener('click', function () {
    for (let i = 0; i < tasks.length; i++) {
        const filteredtask = tasks.filter(task => !task.completed);
        unCompletedTasks = filteredtask;
        unCompletedrenderList();
    }

})

//function to render completed tasks
function completedrenderList() {
    taskList.innerHTML = " ";
    for (let i = 0; i < completedTasks.length; i++) {
        addTaskToDOM(completedTasks[i]);
    }
}

//function to render uncompleted tasks
function unCompletedrenderList() {
    taskList.innerHTML = " ";
    for (let i = 0; i < unCompletedTasks.length; i++) {
        addTaskToDOM(unCompletedTasks[i]);
    }
}

