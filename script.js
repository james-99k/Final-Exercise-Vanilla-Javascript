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
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].includes("<strike>")) {
            elements[i].splice(i, 1);
        }
    }
    display();
}

// function filterAll() {
// }

// function filterCompleted(index) {
// }

// function filterOngoing() {
// }

function darkMode() {
    document.querySelector(".banner__background").style.backgroundImage="linear-gradient(to bottom,rgba(56, 56, 56, 0.52), rgba(20, 15, 19, 0.73)), url('images/6-things-to-do-list.webp')";
    document.querySelector("body").style.background = "	#181818";
    document.querySelector(".name__container").style.background = "	#404040";
    document.querySelector(".list__name").style.background = "	#404040";
    document.querySelector(".task__container").style.background = "	#404040";
    document.querySelector(".task__list").style.background = "	#404040";
    document.querySelector(".list__functions").style.background = "	#404040";
    document.querySelector(".list__functions").style.background = "	#404040";
}