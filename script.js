// Selectors
const todoInput = document.getElementById("todoInput");
const todoButton = document.getElementById("todoButton");
const todoList = document.getElementById("todoList");
const filterAll = document.getElementById("filterAll");
const filterCompleted = document.getElementById("filterCompleted");
const filterUncompleted = document.getElementById("filterUncompleted");

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterAll.addEventListener('click', optionAll);
filterCompleted.addEventListener('click', optionCompleted);
filterUncompleted.addEventListener('click', optionUncompleted);

// Functions

// ADD
function addTodo(e) {
    e.preventDefault();
    // Create elements
    const todoDiv = document.createElement("div");
    const newTodo = document.createElement("li");

    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Add to local storage
    saveLocalStorage(todoInput.value);

    // Check button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    // Append to list
    todoList.appendChild(todoDiv);

    // Clear input value 
    todoInput.value = "";
}

// DELETE AND CHECK
function deleteCheck(e) {
    const item = e.target;

    // Complete todo
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

    // Delete todo
    if (item.classList[0] === "delete-btn") {
        const todo = item.parentElement;

        // Animation
        todo.classList.add("fall");
        removeLocalStorege(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }
}

// FILTER
function optionAll() {
    const todo = todoList.childNodes;
    todo.style.display = 'flex';
}

function optionCompleted() {
    const todo = todoList.childNodes;
    if (todo.classList.contains('completed')) {
        todo.style.display = 'flex';
    } else {
        todo.style.display = 'none';
    }
}

function optionUncompleted() {
    const todo = todoList.childNodes;
    if (!todo.classList.contains('completed')) {
        todo.style.display = 'flex';
    } else {
        todo.style.display = 'none';
    }
}

// LOCAL STORAGE
function saveLocalStorage(todo) {
    // Check
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    // Check
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        // Create elements
        const todoDiv = document.createElement("div");
        const newTodo = document.createElement("li");

        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // Check button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);

        // Append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalStorege(todo) {
    // Check
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todo.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}