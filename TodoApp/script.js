const TodosContainer = document.querySelector('.todosJS');
const checkbox = document.querySelector('.checkboxJS');
const trachIcon = document.querySelector('.trashJS');
const TodoItemText = document.getElementById('text');
const todoForm = document.getElementById('formJs');
const formInput = document.querySelector('.FormInputJS');
const allBtn = document.querySelector('.allJS');
const completedBtn = document.querySelector('.completedJS');
const activeBtn = document.querySelector('li.active');
const uncompletedBtn = document.querySelector('.todoJS');

let editedValue = '';

// for categories
let all = false;
let completed = false;
let uncompleted = true;
let filterdTodos = [];
// let uncompletedTodos = [];
//

let todoItems = [];

todoForm.addEventListener(
    'submit',
    (handleTodoForm = (e) => {
        e.preventDefault();

        const newTodo = {
            todoText: formInput.value,
            id: Date.now(),
            completed: false,
            isTodoEditable: false,
        };
        if (formInput.value !== '') {
            todoItems.push(newTodo);
            formInput.value = '';
        }
        addTodo();
        uncompletedFilter();
    })
);

// setting filter for all and completed todos
uncompletedBtn.addEventListener('click', uncompletedFilter);

function uncompletedFilter() {
    completed = false;
    all = false;
    filterdTodos = todoItems.filter((todo) => !todo.completed);
    uncompleted = true;
    allBtn.classList.remove('active');
    completedBtn.classList.remove('active');
    uncompletedBtn.classList.add('active');
    addTodo();
}
uncompletedFilter();
completedBtn.addEventListener('click', () => {
    filterdTodos = todoItems.filter((todo) => todo.completed);
    uncompletedBtn.classList.remove('active');
    allBtn.classList.remove('active');
    completedBtn.classList.add('active');
    all = false;
    uncompleted = false;
    completed = true;
    addTodo();
});
allBtn.addEventListener('click', () => {
    completedBtn.classList.remove('active');
    uncompletedBtn.classList.remove('active');
    allBtn.classList.add('active');
    completed = false;
    uncompleted = false;
    all = true;
    addTodo();
});

function addTodo() {
    TodosContainer.innerHTML = (all ? todoItems : filterdTodos)
        .map((todo, index) => {
            return `<div class="todoItem ${
                todo.isTodoEditable && 'editable'
            } ">
        <input
        ${todo.completed ? 'checked' : ''}
            onChange='toggleComplete(${todo.id})'
            class="checkbox checkboxJS"
            type="checkbox"
            
            id="${index}" />
        <div class="todoText" >
            <input
                class='text ${todo.completed ? 'completed ' : ''} ${
                todo.isTodoEditable && ' autofocus'
            }'
                type="text"
                name="text"
                id="${todo.id}"
                autocomplete="off"
                aria-selected="${todo.isTodoEditable}"
                ${!todo.isTodoEditable ? 'readonly' : 'autofocus'}
                value='${todo.todoText}'
                onKeyUp='todoOnChange(${
                    'this.value'.length < 1 ? todo.text : 'this.value'
                })'
                 />
        </div>
        <div class="edit-save" onClick="EditAndUpdate(${todo.id})">${
                todo.isTodoEditable ? '📁' : '📝'
            }</div>
        <span class="deleteIcon trashJS" onClick="deleteTodo(${
            todo.id
        })"><img src="assets/trash_icon.png" alt=""></span>
    </div>`;
        })
        .join('');
}
addTodo();

const toggleComplete = (id) => {
    todoItems.forEach((todo) => {
        if (todo.id == id) {
            todo.completed
                ? (todo.completed = false)
                : !todo.isTodoEditable && (todo.completed = true);
            console.log(todo.completed);
        }
        addTodo();
        uncompletedFilter();
    });
};

function deleteTodo(id) {
    todoItems = todoItems.filter((todo) => id !== todo.id);
    addTodo();
    console.log(todoItems);
}
function todoOnChange(text) {
    editedValue = text;
}

function EditAndUpdate(id) {
    todoItems.forEach((todo) => {
        if (todo.id == id) {
            if (todo.isTodoEditable == true) {
                todo.todoText =
                    editedValue.length > 0
                        ? editedValue
                        : todo.todoText;
                todo.isTodoEditable = false;
            } else if (!todo.completed) {
                todo.isTodoEditable = true;
            }
        }
        console.log(todo.todoText);
    });
    addTodo();
}

// setting filter for all and completed section
