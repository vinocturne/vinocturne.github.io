const dayArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const imageArray = [
  'url("./src/asset/image/1.jpg")',
  'url("./src/asset/image/2.jpg")',
  'url("./src/asset/image/3.jpg")',
  'url("./src/asset/image/4.jpg")',
  'url("./src/asset/image/5.jpg")',
  'url("./src/asset/image/6.jpg")',
  'url("./src/asset/image/7.jpg")',
];

// 날짜
function getDate() {
  const currentTime = new Date();
  const calendar = document.getElementById('day');
  const day = currentTime.getDay();
  const month = currentTime.getMonth();
  const year = currentTime.getFullYear();
  const date = currentTime.getDate();
  calendar.innerText = `${year}.${month + 1}.${date} ${dayArray[day]}`;
}
function getClock() {
  const currentTime = new Date();
  const clock = document.getElementById('clock');
  const hours = String(currentTime.getHours()).padStart(2, '0');
  const minutes = String(currentTime.getMinutes()).padStart(2, '0');
  const seconds = String(currentTime.getSeconds()).padStart(2, '0');
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}

function getBackgroundImg() {
  const body = document.querySelector('body');
  body.style.backgroundImage = imageArray[Math.floor(Math.random() * imageArray.length)];
  body.style.backgroundSize = 'cover';
  body.style.backgroundRepeat = 'no-repeat';
  body.style.backgroundPosition = 'center';
}

getDate();
setInterval(getClock, 1000);
getBackgroundImg();

// 로그인
const loginContainer = document.getElementById('login-container');
const loginButton = document.getElementById('login-button');
const loginName = document.getElementById('login-name');
const userContainer = document.getElementById('user-container');
function checkName() {
  const name = localStorage.getItem('loginName');
  if (name != null) {
    loginContainer.classList.add('hidden');
    const userName = document.getElementById('user-name');
    userName.innerText = `Welcome ${name}!`;
    userContainer.style.display = 'block';
  }
}

checkName();

function onClickLogin(event) {
  event.preventDefault();
  localStorage.setItem('loginName', loginName.value);
  checkName();
}

loginButton.addEventListener('click', onClickLogin);

// todo-list
let todoArray = [];
const TODOS_KEY = 'todos';
const todoIcon = document.getElementById('todo-icon');
const exitIcon = document.getElementById('exit-icon');
const todoContainer = document.getElementById('todo-container');
const addBtn = document.getElementById('todo-add-button');
const listContainer = document.getElementById('list-container');

function onClickTodo() {
  todoIcon.classList.add('animate-slideout');
  todoIcon.addEventListener('animationend', function () {
    todoIcon.style.display = 'none';
  });
  todoContainer.classList.add('animate-slidein');
  todoContainer.addEventListener('animationend', function () {
    todoContainer.style.right = 0;
  });
}

function onClickExit() {
  todoContainer.classList.remove('animate-slidein');
  todoIcon.classList.remove('animate-slideout');
  todoContainer.classList.add('animate-slideout');
  todoIcon.style.display = 'block';
  todoContainer.addEventListener('animationend', function () {
    todoContainer.style.right = '-50%';
  });

  todoIcon.classList.add('animate-slidein');
  todoIcon.addEventListener('animationend', function () {
    todoIcon.style.display = 'block';
    todoIcon.classList.remove('animate-slidein');
  });
}

function onClickAdd(event) {
  event.preventDefault();
  const todoText = document.getElementById('todo');
  if (todoText.value.length != 0) {
    const newObj = {
      text: todoText.value,
      id: Date.now(),
    };
    todoArray.push(newObj);
    paintTodo(newObj);
    saveTodos();
    todoText.value = '';
  }
}

function paintTodo(todoObj) {
  const li = document.createElement('li');
  li.id = todoObj.id;
  const span = document.createElement('span');
  span.innerText = todoObj.text;
  const button = document.createElement('button');
  button.innerText = '❌';
  button.addEventListener('click', deleteTodo);
  li.appendChild(span);
  li.appendChild(button);
  listContainer.appendChild(li);
}

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todoArray));
}

function deleteTodo(event) {
  event.preventDefault();
  const li = event.target.parentElement;
  li.remove();
  todoArray = todoArray.filter(todo => todo.id !== parseInt(li.id));
  saveTodos();
}

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos) {
  const parsedTodos = JSON.parse(savedTodos);
  parsedTodos.forEach(item => paintTodo(item));
  todoArray = parsedTodos;
}

addBtn.addEventListener('click', onClickAdd);
todoIcon.addEventListener('click', onClickTodo);
exitIcon.addEventListener('click', onClickExit);
