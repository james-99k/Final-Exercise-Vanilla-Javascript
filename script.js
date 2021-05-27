var elements = [];

window.onload = function (e) {
    if (JSON.parse(localStorage.getItem("elements")) != null)
        elements = JSON.parse(localStorage.getItem("elements"));
    console.log(elements);
    display();
    document.getElementById("count").value = JSON.parse(localStorage.getItem("elements")).length;
};

function addElement() {
    if (document.getElementById("todoInput").value.trim() != "") {
        elements.push(document.getElementById("todoInput").value.trim());
        if (localStorage.getItem("elements") == null) {
            localStorage.setItem("elements", JSON.stringify(elements));
        } else {
            localStorage.setItem("elements", JSON.stringify(elements));
        }
        display();
        document.getElementById("count").value = JSON.parse(localStorage.getItem("elements")).length;
    }
}

function display() {
    document.getElementById("todo-list").innerHTML = "";
    for (var i = 0; i < elements.length; i++)
        document.getElementById("todo-list").innerHTML +=
            "<center><div class='element'>" +
            elements[i] +
            "<div class='buttons'><i class='fas fa-check' onclick='strike(" +
            i +
            ")'></i><i class='fas fa-edit' onclick='edit(" +
            i +
            ")'></i><i class='fas fa-trash' onclick='del(" +
            i +
            ")'></i></div></div></center><br>";
}

function del(index) {
    elements.splice(index, 1);
    if (localStorage.getItem("elements") == null) {
        localStorage.setItem("elements", JSON.stringify(elements));
    } else {
        localStorage.setItem("elements", JSON.stringify(elements));
    }
    display();
    document.getElementById("count").value = JSON.parse(localStorage.getItem("elements")).length;
}

function strike(index) {
    if (elements[index].includes("<strike>")) {
        elements[index] = elements[index].replace("<strike>", "");
    } else {
        elements[index] = "<strike>" + elements[index] + "</strike>";
    }
    if (localStorage.getItem("elements") == null) {
        localStorage.setItem("elements", JSON.stringify(elements));
    } else {
        localStorage.setItem("elements", JSON.stringify(elements));
    }
    display();
}

function delCompleted() {
    elements.splice("<strike>");
    if (localStorage.getItem("elements") == null) {
        localStorage.setItem("elements", JSON.stringify(elements));
    } else {
        localStorage.setItem("elements", JSON.stringify(elements));
    }
}

// function filterAll() {
// }

// function filterCompleted(index) {
// }

// function filterOngoing() {
// }