let todoList = [];

const addTodo = text => {
  const todo = {
    text,
    isDone: false,
    id: Date.now()
  };

  todoList.push(todo);
  const list = document.querySelector(".list");
  list.insertAdjacentHTML(
    "beforeend",
    `
    <li class="list__item" data-key="${todo.id}">
      <input id="${todo.id}" type="checkbox" class="check__Todo"/>
      <span>${todo.text}</span>
      <button class="delete__todo">
        Close
      </button>
    </li>
  `
  );
};

const form = document.querySelector(".form").addEventListener("submit", e => {
  e.preventDefault();
  const input = document.querySelector(".form__input--text");

  const text = input.value.trim();
  if (text !== "") {
    addTodo(text);
    input.value = "";
    input.focus();
  }
});

const list = document.querySelector('.list').addEventListener('click', event => {
  if (event.target.classList.contains('check__Todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  if(event.target.classList.contains('delete__todo')){
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

const toggleDone = key => {
  const index = todoList.findIndex(item => item.id === Number(key));
  todoList[index].checked = !todoList[index].checked;

  const item = document.querySelector(`[data-key='${key}']`);
  if (todoList[index].checked) {
    item.classList.add('list__item--done');
  } else {
    item.classList.remove('list__item--done');
  }
}

const deleteTodo = key =>{
  todoList = todoList.filter(item => item.id !== Number(key));
  const item = document.querySelector(`[data-key='${key}']`);
  item.remove();
}