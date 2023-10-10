const addBtn = document.getElementById("add-btn");
const inputTask= document.getElementById("task");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("counter");
const completeAll = document.getElementById("complete-all");
const clearCompleted = document.getElementById("clear-task");
const completed = document.getElementById("completed");
const unCompleted = document.getElementById("unCompleted");
const showAll = document.getElementById("showAll"); 

let tasks = [];
let completedTasks = [];
let unCompletedTasks = [];

//function to show add button
inputTask.addEventListener('focus', function(){
    addBtn.style.display = "block";
})

// EventListener on add button
addBtn.addEventListener('click', handleAddButton );

// EventListener on Enter Button
document.addEventListener('keydown', function(event){
    if(event.key == 'Enter')
    {
        handleAddButton();
    }
})

//function to complete all tasks
completeAll.addEventListener('click',function(){
    const complete = true;
    for(let i=0;i<tasks.length;i++){
        tasks[i].completed = complete;
    };
    renderList();
})

//function to clear completed tasks
clearCompleted.addEventListener('click', function(){
   const filteredtask = tasks.filter(task => !task.completed);
    tasks = filteredtask;
    renderList();
})

//Function to hide the add button
document.addEventListener('click', function(event){
    if(event.target !== inputTask){
        addBtn.style.display = "none";
    }
})

// Function to create an object when button is clicked
function handleAddButton(){
    const text = inputTask.value.trim();
    if(text !== "")
    {
        const task = {
            title: text,
            id: Date.now(),
            completed: false,
        }
        // console.log(task);
        inputTask.value ="";
        addTask(task);
    }
}

//Function to push a task in array
function addTask(task){
    if(task)
    {
        tasks.push(task);
        // console.log(tasks);
        renderList();
        return;
    }
}

function renderList(){
    taskList.innerHTML=" ";
    let unCompletedTask= 0;
    for(let i=0;i<tasks.length;i++){
        addTaskToDOM(tasks[i]);
        if(!tasks[i].completed){
            unCompletedTask++;
        }
        taskCounter.textContent = unCompletedTask;
    }
}


function addTaskToDOM(task){
    const li= document.createElement('li');
    li.innerHTML= `<div>
    <label>
        <input type="checkbox" ${task.completed ? 'checked': ''}>
    <span>${task.title}</span>
    </label></div>
    <img src="images/close.png" class="close">`;

    li.addEventListener('click', function(){
        const image = this.querySelector("img");
            image.style.display ="block";
    })

    taskList.appendChild(li);
    inputTask.value = "";
}

showAll.addEventListener('click',function(){
    renderList();
})

completed.addEventListener('click',function(){
    for(let i=0;i<tasks.length;i++){
        const filteredtask = tasks.filter(task =>task.completed);
        completedTasks = filteredtask;
        // console.log("completedTasks", completedTasks);
        completedrenderList();
    };
})

unCompleted.addEventListener('click', function(){
    for(let i=0;i<tasks.length;i++)
    {
        const filteredtask = tasks.filter(task => !task.completed);
        unCompletedTasks = filteredtask;
        // console.log("unCompletedTasks", unCompletedTasks);
        unCompletedrenderList();
    }

})
function completedrenderList(){
    taskList.innerHTML=" ";
    for(let i=0;i<completedTasks.length;i++){
        addTaskToDOM(completedTasks[i]);
    }
}

function unCompletedrenderList(){
    taskList.innerHTML=" ";
    for(let i=0;i<unCompletedTasks.length;i++){
        addTaskToDOM(unCompletedTasks[i]);
    }
}


