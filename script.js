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
    todoDiv.classList.add("todo");
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
        removeLocalStorage(todo);
        todo.addEventListener("transitionend", e => {
            todo.remove();
        });
    }
}

// FILTER
function optionAll(e) {
    const todos = todoList.childNodes;
    todo.style.display = 'flex';
}

function optionCompleted(e) {
    const todos = todoList.childNodes;
    if (todos.classList.contains("completed")) {
        todos.style.display = "flex";
    } else {
        todos.style.display = "none";
    }
}

function optionUncompleted(e) {
    const todos = todoList.childNodes;
    if (!todos.classList.contains("completed")) {
        todos.style.display = "flex";
      } else {
        todos.style.display = "none";
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
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        //Create todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create list
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        todoInput.value = "";
        //Create Completed Button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Create trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add("delete-btn");
        todoDiv.appendChild(trashButton);
        //attach final Todo
        todoList.appendChild(todoDiv);
    });
}

function removeLocalStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}