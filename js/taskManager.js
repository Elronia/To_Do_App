// Create the HTML for a task
const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => 
        `<a href="#" class="list-group-item list-group-item-action list-group-item-primary" data-task-id=${id}>
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${name}</h5>
                <span class="badge badge-info py-2 ${status === 'TODO' ? 'badge-danger' : 'badge-success'}">${status}</span> 
            </div>
            <div class="d-flex w-100 justify-content-between">
                <p class="mb-1">${description}</p>
                <p class="mb-1">Assigned To: ${assignedTo}</p>
                <small>Due: ${dueDate}</small>
                 <!-- <button href="#" class="btn btn-danger py-2">Delete</button>  -->
                 <!-- <a href="#" class="btn btn-danger py-2 my-5">Delete</a> -->
            </div>
            <div class="d-flex w-100 justify-content-end">
               <button class="btn btn-outline-success done-button ${status === 'TODO' ? 'visible' : 'invisible'}">Mark As Done</button>
            </div>
        </a>`
    
    
// Create a TaskManager class
class TaskManager {
    // Set up the tasks and currentId property in the contructor
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    // Create the addTask method
    addTask(name, description, assignedTo, dueDate, status = 'TODO') {
        const task = {
            // Increment the currentId property
            id: this.currentId++,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status
        };

        // Push the task to the tasks property
        this.tasks.push(task);
        
    }

    getTaskById(taskId) {
        // Create a variable to store the found task
        let foundTask;

        // Loop over the tasks and find the task with the id passed as a parameter
        for (let i = 0; i < this.tasks.length; i++) {
           // Get the current task in the loop
            const task = this.tasks[i];

           // Check if its the right task by comparing the task's id to the id passed as a parameter
            if (task.id === taskId) {
                // Store the task in the foundTask variable
                foundTask = task;
            }
        }

        // Return the found task
        return foundTask;
    }

// Create the render method
    render() {
        // Create an array to store the tasks' HTML
        const tasksHtmlList = [];

        // Loop over our tasks and create the html, storing it in the array
        for (let i = 0; i < this.tasks.length; i++) {
            // Get the current task in the loop
            const task = this.tasks[i];

            // Format the date
            const date = new Date(task.dueDate);
            const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

            // Create the task html
            const taskHtml = createTaskHtml(task.id, task.name, task.description, task.assignedTo, formattedDate, task.status);

            // Push it to the tasksHtmlList array
            tasksHtmlList.push(taskHtml);
        }

        // Create the tasksHtml by joining each item in the tasksHtmlList
        // with a new line in between each item.
        const tasksHtml = tasksHtmlList.join('\n');

        // Set the inner html of the tasksList on the page
        const tasksList = document.querySelector('#tasksList');
        tasksList.innerHTML = tasksHtml;
    }
}

export { TaskManager, createTaskHtml }

