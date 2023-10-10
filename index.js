const addBtn = document.getElementById("add-btn");
const inputTask= document.getElementById("task");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("counter");
const completeAll = document.getElementById("complete-all")

const tasks = [];

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
        tasks[i].completed= complete;
    };
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
        console.log(tasks);
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
        <input id="${task.id}" type="checkbox" ${task.completed ? 'checked': ''}>
    <span>${task.title}</span></div>
    <img src="images/close.png" id="close">`;
    console.log(task.completed);
    taskList.appendChild(li);
    inputTask.value = "";
}