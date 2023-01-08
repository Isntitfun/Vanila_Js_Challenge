const temperature = document.getElementById("temperature");
const weather = document.getElementById("weather");
const geo = document.getElementById("geo");
const apiKey = "37d4fa6a5ec81e3393fee85fccdd6925";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

async function success(pos) {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
  const weatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  ).then((res) => res.json());
  geo.innerText = weatherData.name;
  temperature.innerText = `${Math.round(weatherData.main.temp)}℃`;
  weather.innerText = weatherData.weather[0].main;
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
