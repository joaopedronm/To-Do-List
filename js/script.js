// SELEÇÃO DE ELEMENTOS
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const editDate = document.querySelector('#edit-date')
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
const dateInput = document.querySelector("#date-input")
const prioridadeInput = document.querySelector("#prioridades")


let oldInpuValue // valor antigo do input de tarefa
let oldInpuValue2 // valor antigo do input de data


// FUNÇÕES

const saveTodo = (text, date, prioridade) => {

    const todo = document.createElement('div')
    todo.classList.add('todo')

    const todoTitle = document.createElement('h3')
    todoTitle.innerText = text
    todo.appendChild(todoTitle)

    const span = document.createElement('div')
    span.classList.add('span-values')
    todo.appendChild(span)
    
    const todoDate = document.createElement('p')
    todoDate.innerText = date
    todo.appendChild(todoDate)
    span.appendChild(todoDate)

    const todoPrioridade = document.createElement('p')
    todoPrioridade.innerText = prioridade
    todo.appendChild(todoPrioridade)
    span.appendChild(todoPrioridade)

    // Botão de Finalizar
    const doneBtn = document.createElement('button')
    doneBtn.classList.add('finish-todo')
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    // Botão de Editar
    const editBtn = document.createElement('button')
    editBtn.classList.add('edit-todo')
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    // Botão de Remover
    const removeBtn = document.createElement('button')
    removeBtn.classList.add('remove-todo')
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(removeBtn)

    todoList.appendChild(todo)

    todoInput.value = ""
    dateInput.value = ""
}

const toggleForms = () => {
    editForm.classList.toggle('hide')
    todoForm.classList.toggle('hide')
    todoList.classList.toggle('hide')
}

const updadeTodo = (text, date) => {

    const todos = document.querySelectorAll('.todo')
    console.log(todos)
    const datas = document.querySelectorAll('.span-values')
    console.log(datas)

    todos.forEach((i) => {
        let todoTitle = i.querySelector('h3')
        console.log('todoTitle', todoTitle)
        if (todoTitle.innerText === oldInpuValue) {
            todoTitle.innerText = text
        }
    })

    datas.forEach((i) => {
        let dataTitle = i.querySelector('p')
        console.log('dataTitle', dataTitle)
        if (dataTitle.innerText == oldInpuValue2) {
            dataTitle.innerText = date
        }
    })

}

// EVENTOS

// Botão de adicionar tarefa
todoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputValue = todoInput.value
    const dateValue = dateInput.value
    const prioridadeValue = prioridadeInput.value

    // Transformar a data para DD/MM/AA
    const newDate = dateValue.split('-').reverse().join('-')
    console.log(newDate)


    if(inputValue) {
        saveTodo(inputValue, newDate, prioridadeValue)
    }
})


// Botões de forma geral
document.addEventListener('click', (e) => {

    const targetEl = e.target
    const parentEl = targetEl.closest('div')

    let todoTitle;
    let dataTitle;
    let dataTitle2;

    // Pequena condição para verificar algo da edição
    if(parentEl && parentEl.querySelector('h3') && parentEl.querySelector('p')) {
        todoTitle = parentEl.querySelector('h3').innerText
        dataTitle = parentEl.querySelector('p').innerText
        dataTitle2 = dataTitle.split('-').reverse().join('-')
        console.log(dataTitle, typeof(dataTitle))

        // console.log('Título da atividade:', todoTitle, 'Data da atividade:', dataTitle)
    }

    if(targetEl.classList.contains('finish-todo')) {
        console.log('Clicou para finalizar')
        parentEl.classList.toggle('done')
    }

    if(targetEl.classList.contains('remove-todo')) {
        console.log('Clicou para excluir')
        parentEl.remove()
    }

    if(targetEl.classList.contains('edit-todo')) {
        console.log('Clicou para editar')
        toggleForms()

        editInput.value = todoTitle
        oldInpuValue = todoTitle // o oldInputValue será utilizado na função de atualizar o valor da atividade

        editDate.value = dataTitle2
        oldInpuValue2 = dataTitle // o oldInputValue será utilizado na função de atualizar a data da atividade

    }
})

// Botão de cancelar edição
cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault()
    toggleForms()
})

// Concluir a Edição
editForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const editInputValue = editInput.value
    const editInputDate = editDate.value

    const editInputDate2 = editInputDate.split('-').reverse().join('-')

    if(editInputValue && editInputDate) {
        updadeTodo(editInputValue, editInputDate2)
    }

    toggleForms()
})