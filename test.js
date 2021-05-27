let todos = [];

window.onload = function (e) {
    if (JSON.parse(localStorage.getItem("todos")) != null)
    todos = JSON.parse(localStorage.getItem("todos"));
    console.log(todos);
    display();
    document.getElementById("count").value = JSON.parse(localStorage.getItem("todos")).length;
};

const addTodo = (e) => {
    e.preventDefault();
    let todo = {
        value: document.getElementById('todoInput').value,
        status: ("ongoing")
    }
    todos.push(todo);
    document.forms[0].reset();

    localStorage.setItem('todos', JSON.stringify(todos));
    display();
}

let todosData = JSON.parse(localStorage["todos"]);

document.getElementById('todoButton').addEventListener('click', addTodo)
display();

function display() {
    document.getElementById("todo-list").innerHTML = "";
    for (var i = 0; i < todosData.length; i++)
        document.getElementById("todo-list").innerHTML +=
            "<center><div class='element'>" +
            todosData[i].value +
            "<div class='buttons'><i class='fas fa-check' onclick='strike(" +
            i +
            ")'></i><i class='fas fa-edit' onclick='edit(" +
            i +
            ")'></i><i class='fas fa-trash' onclick='del(" +
            i +
            ")'></i></div></div></center><br>";
}
