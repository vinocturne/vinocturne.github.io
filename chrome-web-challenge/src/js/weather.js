const apiKey = '7b71d768f50f90d06027967e50a18aa3';

function onGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const name = data.name;
      const weather = data.main;
      const nameField = document.querySelector('#weather-container #name');
      const tempField = document.querySelector('#weather-container #temp');
      nameField.innerText = `${name}, `;
      tempField.innerHTML = `${Math.floor(weather.temp)}<img class="temp" src="./src/asset/image/celsius.png" />`;
    });
}
function onGeoError() {
  alert("can't find your location");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
