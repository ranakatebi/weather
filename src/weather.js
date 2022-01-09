function formatDate(now) {
  let year = now.getFullYear();
  let date = now.getDate();
  let hour = now.getHours();
  let min = now.getUTCMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (min < 10) {
    min = `0${min}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let timeValue = ` ${day} ${date} ${month} ${hour}:${min}`;
  let gettoday = document.querySelector("div #time");
  gettoday.innerHTML = timeValue;
}
formatDate(new Date());
//////////////////////////////////////////////////////////////////////////////

function displayWeatherCondition(response) {
  temperature = response.data.main.temp;
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#city-temp").innerHTML = Math.round(temperature);

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  function convertToFahrenheit(event) {
    event.preventDefault();
    c.classList.remove("active");
    f.classList.add("active");
    let Celsius = document.querySelector("#city-temp");
    let Farenheit = Math.round((temperature * 9) / 5 + 32);
    Celsius.innerHTML = Farenheit;
  }
  let findf = document.querySelector("#f");
  findf.addEventListener("click", convertToFahrenheit);

  function convertToCelsius(event) {
    event.preventDefault();
    c.classList.add("active");
    f.classList.remove("active");
    let Celsius = document.querySelector("#city-temp");
    Celsius.innerHTML = math.round(temperature);
  }
  let findc = document.querySelector("#c");
  findc.addEventListener("click", convertToCelsius);
}

function searchCity(city) {
  let apiKey = "89df1cb5a298dd0aab1a82b6c4062896";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "89df1cb5a298dd0aab1a82b6c4062896";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let temperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#loc");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Zurich");
