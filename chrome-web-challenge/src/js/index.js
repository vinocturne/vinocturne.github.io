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

const loginContainer = document.getElementById('login-container');
const loginButton = document.getElementById('login-button');
const loginName = document.getElementById('login-name');

function checkName() {
  const name = window.localStorage.getItem('loginName');
  if (name == null) {
    console.log('없음');
  } else {
    loginContainer.classList.add('hidden');
    const userName = document.getElementById('user-name');
    userName.innerText = `Welcome ${name}!`;
  }
}

checkName();

function onClickLogin(event) {
  event.preventDefault();
  window.localStorage.setItem('loginName', loginName.value);
  checkName();
}
loginButton.addEventListener('click', onClickLogin);
