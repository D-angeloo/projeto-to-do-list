// seleçao de elementos
const todoForm = document.querySelector("#todoForm")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#editForm")
const editInput = document.querySelector("#editInput")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
const filterSelect = document.querySelector("#filter-select")
const searchInput = document.querySelector("#search-input")
const eraseButton = document.querySelector("#erase-button")

let oldInputValue

// function salvar uma nova tarefa
const saveTodo = (Text) => {
    const todo = document.createElement("div")
    todo.classList.add("todo")

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = Text
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)
    
    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deletBtn = document.createElement("button")
    deletBtn.classList.add("remove-todo")
    deletBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deletBtn)

    todoList.appendChild(todo)

    todoInput.value = ""
    todoInput.focus()


}
// function para alternar entre os formularios de ediçao e adiçao de tarefas
const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}
//  atualizar uma tarefa
const uptadeTodo = (Text) => {
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3")

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = Text
        }
    })
}

// filtragem de tarefa
const filterTodo = () => {
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        switch (filterSelect.value) {
            case "all":
                todo.style.display = "flex"
                break
            case "done":
                if (todo.classList.contains("done")) {
                    todo.style.display = "flex"
                }else{
                    todo.style.display ="none"
                }
                break
            case "todo":
                if(!todo.classList.contains("done")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break
        }
    })
}
// pesquisa de tarefas
const searchTodo = () => {
    const searchText = searchInput.value.toLowerCase()
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        const todoTitle = todo.querySelector("h3").innerText.toLowerCase()
        if (todoTitle.includes(searchText)) {
            todo.style.display = "flex"
        } else {
            todo.style.display = "none"
        }
    })
}

// events buttons
todoForm.addEventListener("submit", (e) => {
    
    e.preventDefault()

    const inputValue = todoInput.value.trim()

    if(inputValue) {
        saveTodo(inputValue)  

    }

})
// events buttons 2
document.addEventListener("click", (e) => {
    const targetEl = e.target
    const parentEl = targetEl.closest ("div")
    let todoTitle

    if(parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText
    }

    if(targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done")
    }

    if(targetEl.classList.contains("remove-todo")) {
        parentEl.remove()
    }

    if(targetEl.classList.contains("edit-todo")) {
        toggleForms()

        editInput.value = todoTitle
        oldInputValue = todoTitle
    }
})

cancelEditBtn.addEventListener("click", (e) =>{
    e.preventDefault()
    toggleForms()
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const editInputValue = editInput.value
    if(editInputValue){
        uptadeTodo(editInputValue)

    }

    toggleForms()
})
// eventos
filterSelect.addEventListener("change", filterTodo);

searchInput.addEventListener("input", searchTodo)

eraseButton.addEventListener("click", () => {
    searchInput.value = ""
    searchTodo()
})
