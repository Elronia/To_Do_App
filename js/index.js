import { TaskManager, createTaskHtml } from './taskManager.js';

// Initialize a new TaskManager with currentId set to 0
const taskManager = new TaskManager(0);
// taskManager.addTask();
// console.log(taskManager.tasks);

// Load the tasks from localStorage
taskManager.load();

// Render the tasks to the page
taskManager.render();

// Select the New Task Form
const newTaskForm = document.querySelector('#newTaskForm');

// Add an 'onsubmit' event listener
newTaskForm.addEventListener('submit', (event) => {
    // Prevent default action
    event.preventDefault();

    // Select the inputs
    const newTaskNameInput = document.querySelector('#newTaskNameInput');
    const newTaskDescription = document.querySelector('#newTaskDescription');
    const newTaskAssignedTo = document.querySelector('#newTaskAssignedTo');
    const newTaskDueDate = document.querySelector('#newTaskDueDate');
    const inputStatus = document.querySelector('#inputStatus');
    const errorMessage = document.querySelector('#alertMessage');
    
    let taskHTML = createTaskHtml(newTaskNameInput.value, newTaskDescription.value, newTaskAssignedTo.value, newTaskDueDate.value, inputStatus.value);
    console.log(taskHTML);
    
    /*
        Validation code here
    */

    // Get the values of the inputs
    const name = newTaskNameInput.value;
    const description = newTaskDescription.value;
    const assignedTo = newTaskAssignedTo.value;
    const dueDate = newTaskDueDate.value;
    const status = inputStatus.value;
    if(!validFormFieldInput(name)||
        !validFormFieldInput(description) || 
        !validFormFieldInput(assignedTo) || 
        !validFormFieldInput(dueDate) || 
        !validFormFieldInput(status)) {
        // errorMessage.innerHTML = "Invalid name input";
        errorMessage.style.display = "block";
    } else {
        errorMessage.style.display = "none";

        // Add the task to the task manager
        taskManager.addTask(name, description, assignedTo, dueDate, status);
        console.log(taskManager);
        
        //Render the tasks
        taskManager.render();

        // Clear the form
        newTaskNameInput.value = '';
        newTaskDescription.value = '';
        newTaskAssignedTo.value = '';
        newTaskDueDate.value = '';
        inputStatus.value = '';
        }
});

function validFormFieldInput(data){
    return data !== null && data !== '';
}

// Select the Tasks List
const tasksList = document.querySelector('#tasksList');

// Add an 'onclick' event listener to the Tasks List
tasksList.addEventListener('click', (event) => {
    // Check if a "Mark As Done" button was clicked
    if (event.target.classList.contains('done-button')) {
        // Get the parent Task
        const parentTask = event.target.parentElement.parentElement;

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);

        // Get the task from the TaskManager using the taskId
        const task = taskManager.getTaskById(taskId);

        // Update the task status to 'DONE'
        task.status = 'DONE';

        // Save the tasks to localStorage
        taskManager.save();

        // Render the tasks
        taskManager.render();
    }

    // Check if a "Delete" button was clicked
    if (event.target.classList.contains('delete-button')) {
        // Get the parent Task
        const parentTask = event.target.parentElement.parentElement;

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);

        // Delete the task
        taskManager.deleteTask(taskId);

        // Save the tasks to localStorage
        taskManager.save();

        // Render the tasks
        taskManager.render();
    }
});

