const addBtn = document.getElementById("add-btn");
const inputTask= document.getElementById("task");
const taskList = document.getElementById("taskList");

const tasks = [];

// EventListener on add button
addBtn.addEventListener('click', handleAddButton );

// EventListener on Enter Button
document.addEventListener('keydown', function(event){
    if(event.key == 'Enter')
    {
        handleAddButton();
    }
})

// Function to create an object when button is clicked
function handleAddButton(){
    const text = inputTask.value;
    if(text !== null)
    {
        const task = {
            title: text,
            id: Date.now(),
            completed: false
        }
        // console.log(task);
        inputTask.value = " ";
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
    for(let i=0;i<tasks.length;i++){
        addTaskToDOM(tasks[i]);
    }
}

function addTaskToDOM(task){
    const li= document.createElement('li');
    li.innerHTML= `<div>
        <input type="checkbox">
    <span>${task.title}</span>
    <img src="images/close.png"></div>`;
    taskList.appendChild(li);
    inputTask.value = " ";
}