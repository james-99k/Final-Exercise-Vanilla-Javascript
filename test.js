const todoInput = document.querySelector("#todo-input");
const todosContainer = document.querySelector(".todos");
const completedCount = document.querySelector(".completedCount");

var elem = null;
let todos = [];

function changeTheme() {
    document.body.classList.toggle("dark");
}

function isBefore(el1, el2) {
    for (
        var cur = el1.previousSibling;
        cur && cur.nodeType !== 9;
        cur = cur.previousSibling
    )
        if (cur === el2) return true;
    return false;
}

window.onload = function (e) {
    if (JSON.parse(localStorage.getItem("todos")) != null)
        elements = JSON.parse(localStorage.getItem("todos"));
    console.log(elements);
};

todoInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
        //if (e.target.value !== "") createTodo(e.target.value);
        todos.push({ value: e.target.value, checked: false });
        newTodo(e.target.value);
        todoInput.value = "";
        localStorage.setItem("todos", JSON.stringify(todos));
        countCompleted();
    }
});

function newTodo(value) {
    const todo = document.createElement("div");
    const todoText = document.createElement("p");
    const todoCheckbox = document.createElement("input");
    const todoCheckboxLabel = document.createElement("label");
    const todoCross = document.createElement("span");

    // let obj = todos.find((t) => t.value === value);

    todoText.textContent = value;
    todoCheckbox.type = "checkbox";
    todoCheckbox.name = "checkbox";
    todoCheckboxLabel.htmlFor = "checkbox";

    todoCheckboxLabel.addEventListener("click", function (e) {
        if (todoCheckbox.checked) {
            todoCheckbox.checked = false;
            todoText.style.textDecoration = "none";
            todoCheckboxLabel.classList.remove("active");
            // obj.checked = false;
            updateTodos(value, false);
            countCompleted();
        } else {
            // obj.checked = true;
            updateTodos(value, true);
            countCompleted();
            todoCheckbox.checked = true;
            todoText.style.textDecoration = "line-through";
            todoCheckboxLabel.classList.add("active");
        }
    });

    todoCross.textContent = "X";
    todoCross.addEventListener("click", function (e) {
        // e.target.parentElement.remove();
        // todos = todos.filter((t) => t !== obj);
        // countCompleted();
        // localStorage.setItem("todos", JSON.stringify(todos));
        e.target.parentElement.remove();
        todos = todos.filter((t) => t.value !== value);
        countCompleted();
        if (todos.length === 0) {
            updateUi(true);
        }
        localStorage.setItem("todos", JSON.stringify(todos));
    });

    todo.classList.add("todo");
    todoCheckboxLabel.classList.add("circle");
    todoCross.classList.add("cross");

    todo.appendChild(todoCheckbox);
    todo.appendChild(todoCheckboxLabel);
    todo.appendChild(todoText);
    todo.appendChild(todoCross);

    todo.draggable = true;
    todo.addEventListener("dragstart", (e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", null);
        elem = e.target;
        localStorage.setItem("todos", JSON.stringify(todos));
    });
    todo.addEventListener("dragover", (e) => {
        let el1;
        e.preventDefault();
        if (e.target.classList.contains("todo")) {
            el1 = e.target;
        } else {
            el1 = e.target.parentElement;
        }
        if (isBefore(elem, el1)) {
            el1.parentNode.insertBefore(elem, el1);
        } else {
            el1.parentNode.insertBefore(elem, el1.nextSibling);
        }
        localStorage.setItem("todos", JSON.stringify(todos));
    });
    todo.addEventListener("dragend", (e) => {
        elem = null;
        let index = todos.findIndex((t) => t.value === value);
        todos.splice(index, 1);
        if (todo.nextSibling) {
            let index1 = todos.findIndex(
                (t) => t.value === todo.nextSibling.querySelector("p").textContent
            );
            todos.splice(index1, 0, {
                value: value,
                checked: todo.querySelector("input").checked,
            });
        } else {
            todos.push({
                value: value,
                checked: todo.querySelector("input").checked,
            })
        }
        localStorage.setItem("todos", JSON.stringify(todos));
    });
    
    localStorage.setItem("todos", JSON.stringify(todos));

    todosContainer.appendChild(todo);
}

function updateTodos(value, bool) {
    todos.forEach((t) => {
        if (t.value === value) {
            t.checked = bool;
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    });
}

function countCompleted() {
    completedCount.textContent = `${todos.filter((t) => t.checked === false).length
        } items left`;
}

function clearCompleted() {
    document.querySelectorAll(".todo").forEach((todo) => {
        if (todo.querySelector("input").checked) {
            todo.remove();
        }
    });
}

function showAll(e) {
    document.querySelectorAll("filter div").forEach((d, i) => {
        if (i == 0) {
            d.classList.add("filterActive");
        } else {
            d.classList.remove("filterActive");
        }
    });
    document.querySelectorAll(".todo").forEach((todo) => {
        todo.style.display = "grid";
    })
}

function filterCompleted() {
    document.querySelectorAll(".filters div").forEach((d, i) => {
        if (i === 2) {
            d.classList.add("filterActive");
        } else {
            d.classList.remove("filterActive");
        }
    });
    document.querySelectorAll(".todo").forEach((todo) => {
        todo.style.display = "grid";
        if (!todo.querySelector("input").checked) {
            todo.style.display = "none";
        }
    });
}

function filterActive(e) {
    document.querySelectorAll(".filters div").forEach((d, i) => {
        if (i === 1) {
            d.classList.add("filterActive");
        } else {
            d.classList.remove("filterActive");
        }
    });
    document.querySelectorAll(".todo").forEach((todo) => {
        todo.style.display = "grid";
        if (todo.querySelector("input").checked) {
            todo.style.display = "none";
        }
    });
}