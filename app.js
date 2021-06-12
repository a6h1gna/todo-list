//variable declaration
const inputTodo = document.querySelector(".input-todo");
const inputBtn = document.querySelector(".input-btn");
const selectOption = document.querySelector("#select-options");
const todoUl = document.querySelector(".todo-list");

//event listerners
document.addEventListener("DOMContentLoaded", getTodos);
inputBtn.addEventListener("click", addTodo);
todoUl.addEventListener("click", btnCheck);
selectOption.addEventListener("click", filterTodo);

//functions
function addTodo(e){
    e.preventDefault();
    //checking input
    if(inputTodo.value === "")    return;
    else{
        //creating div
        let todoDiv = document.createElement("div");
        todoDiv.classList.add("todo-div");
        //creating li
        let todoLi = document.createElement("li");
        todoLi.classList.add("todo-li");
        todoLi.innerText = inputTodo.value;
        //saving data to local storage
        saveTodos(inputTodo.value);
        //creating completed btn
        let completedBtn = document.createElement("button");
        completedBtn.innerHTML = `<i class="fa fa-check" aria-hidden="true"></i>`;
        completedBtn.classList.add("completed-btn");
        //creating delete btn
        let deletedBtn = document.createElement("button");
        deletedBtn.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
        deletedBtn.classList.add("deleted-btn");
        //appending li to div
        todoDiv.appendChild(todoLi);
        //appending btns to li
        todoDiv.appendChild(completedBtn);
        todoDiv.appendChild(deletedBtn);        
        //appending it to ul
        todoUl.appendChild(todoDiv);
        //clearing input value
        inputTodo.value = "";
    }
}

function btnCheck(e){
    let btn = e.target;
    if(btn.classList.contains("deleted-btn"))
    {
        btn.parentElement.classList.add("fall");
        deleteTodoFromStorage(btn.parentElement);
        document.addEventListener("transitionend", () =>{
            btn.parentElement.remove();
        });
    }
    if(btn.classList.contains("completed-btn")){
        btn.parentElement.classList.toggle("completed");
        //saving compoleted list data to local storage
        if(btn.parentElement.classList.contains("completed"))
            saveCompletedTodos(btn.parentElement.children[0].innerText);
        else
            deleteCompletedTodos(btn.parentElement);
    }
}

function filterTodo(e) {
    let option = e.target.value;
    let todos = todoUl.childNodes;
    todos.forEach((todo) =>{
        switch(option)
        {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed"))
                    todo.style.display = "flex";
                else
                    todo.style.display = "none";
                break;
            case "to-be-done":
                if(!todo.classList.contains("completed"))
                    todo.style.display = "flex";
                else
                    todo.style.display = "none";
                break;
        }
    });
}

function checkLocalStorage(listName){
    if(localStorage.getItem(listName) === null)
    {
        listName = [];
    }
    else
    {
        listName = JSON.parse(localStorage.getItem(listName));
    }
    return listName;
}

function saveTodos(todo)
{
    let todos = checkLocalStorage("todos");
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function saveCompletedTodos(todo)
{
    let completedTodos = checkLocalStorage("completedTodos");
    completedTodos.push(todo);
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
}

function getTodos()
{
    let todos = checkLocalStorage("todos");
    let completedTodos = checkLocalStorage("completedTodos");
    // let completedTodos = checkLocalStorage("completedTodos");
    todos.forEach((todo) =>{
        //creating div
        let todoDiv = document.createElement("div");
        todoDiv.classList.add("todo-div");
        //creating li
        let todoLi = document.createElement("li");
        todoLi.classList.add("todo-li");
        todoLi.innerText = todo;
        //creating completed btn
        let completedBtn = document.createElement("button");
        completedBtn.innerHTML = `<i class="fa fa-check" aria-hidden="true"></i>`;
        completedBtn.classList.add("completed-btn");
        //creating delete btn
        let deletedBtn = document.createElement("button");
        deletedBtn.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
        deletedBtn.classList.add("deleted-btn");
        //appending li to div
        todoDiv.appendChild(todoLi);
        //appending btns to li
        todoDiv.appendChild(completedBtn);
        todoDiv.appendChild(deletedBtn);        
        //appending it to ul
        todoUl.appendChild(todoDiv);
        for( let i=0; i< completedTodos.length; i++)
        {
            if(completedTodos[i] === todo)
            {
                todoDiv.classList.add("completed");
            }
        }
    });
}

function deleteTodoFromStorage(todo)
{
    let todos = checkLocalStorage("todos")
    let completedTodos = checkLocalStorage("completedTodos");
    let todoIndex = todo.children[0].innerText;
    for(let i=0; i<completedTodos.length; i++)
    {
        if(completedTodos[i] === todoIndex)
        {
            deleteCompletedTodos(todo);
        }
    }
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteCompletedTodos(todo)
{
    let completedTodos = checkLocalStorage("completedTodos")
    let todoIndex = todo.children[0].innerText;
    completedTodos.splice(completedTodos.indexOf(todoIndex), 1);
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
}

