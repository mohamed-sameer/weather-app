const searchInput = document.querySelector("#search");
const searchBtn = document.querySelector(".search-btn");
const forecastCards = document.querySelector(".forcast-cards");
const BASE_URL = "https://api.weatherapi.com/";
const API_KEY = "7d77b96c972b4d119a3151101212704";

const days = [
  "Saturday",
  "Sunday",
  "Moday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];
const months = [
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

// get weather data
async function getWeatherData(country = "auto") {
  const url = `${BASE_URL}v1/forecast.json?key=${API_KEY}&q=${
    country === "auto" ? "auto:ip" : country
  }&days=3`;
  const resposne = await fetch(url);
  const data = await resposne.json();
  return data;
}

// extract date
function getDate(localeTime) {
  const date = new Date(localeTime * 1000);
  const dayOfTheWeek = days[date.getDay()];
  const monthOfTheYear = months[date.getMonth()];
  const dayOfTheMonth = date.getUTCDate();

  return [dayOfTheMonth, dayOfTheWeek, monthOfTheYear];
}

// display data into html
async function displayData(searchQ) {
  const {
    location: { name, localtime_epoch },
    current,
    forecast: {
      forecastday: [, day2, day3],
    },
  } = await getWeatherData(searchQ);

  const [dayMonth, currentDay, currentMonth] = getDate(localtime_epoch);
  const [day2Month, current2Day, current2Month] = getDate(day2.date_epoch);
  const [day3Month, current3Day, current3Month] = getDate(day3.date_epoch);

  const html = `
  <div class="col-md-12 col-xl-4">
              <div class="rounded-start-2 overflow-hidden">
                <div
                  class="forcast-date text-white d-flex justify-content-between px-2 py-3 forcast-card-head "
                >
                  <span>${currentDay}</span>
                  <span>${dayMonth} ${currentMonth}</span>
                </div>
                <div
                  class="forcast-details px-3 forcast-card-body text-white pt-5 pb-2"
                >
                  <p class="lead">${name}</p>
                  <h2 class="temperature">${current.temp_c}&deg;C</h2>
                  <div class="d-flex flex-column">
                    <span class="weather-icon mb-3">
                      <img class="w-25" src="${current.condition.icon}" alt="" />
                    </span>
                    <span class="weather-status">${current.condition.text}</span>
                  </div>
                </div>
                <div
                  class="forcast-icons py-3 d-flex justify-content-between align-items-center text-white px-3 forcast-card-body "
                >
                  <div
                    class="rain d-flex justify-content-center align-items-center"
                  >
                    <span class="rain-icon">
                      <img
                        class="me-2"
                        src="imgs/icon-umberella.png"
                        alt="umberella"
                      />
                    </span>
                    <span class="rain-status">20%</span>
                  </div>
                  <div
                    class="wind d-flex justify-content-center align-items-center"
                  >
                    <span class="wind-icon">
                      <img class="me-2" src="imgs/icon-wind.png" alt="wind" />
                    </span>
                    <span class="wind-status">18kmh</span>
                  </div>
                  <div
                    class="direction d-flex justify-content-center align-items-center"
                  >
                    <span class="direction-icon">
                      <img
                        class="me-2"
                        src="imgs/icon-compass.png"
                        alt="compass"
                      />
                    </span>
                    <span class="direction-status">East</span>
                  </div>
                </div>
              </div>
            </div>
              
            <!-- card 1 -->

            <div class="col-md-12 col-xl-4">
              <div class="overflow-hidden">
                <div
                  class="forcast-date forcast-card-head-2 text-white d-flex justify-content-between px-2 py-3 forcast-card-head"
                >
                  <span>${current2Day}</span>
                  <span>${day2Month} ${current2Month}</span>
                </div>
                <div
                  id="day2"
                  class="forcast-details forcast-card-body-2 px-3 forcast-card-body text-white pt-5"
                >
                  <div
                    class="weather-icon d-flex justify-content-center align-items-center pb-5"
                  >
                    <img src="${day2.day.condition.icon}" alt="" />
                  </div>
                  <div
                    class="weather-temprature d-flex flex-column gap-2 justify-content-center align-items-center pb-5 mt-1"
                  >
                    <p class="day h3">${day2.day.maxtemp_c}&deg;C</p>
                    <p class="night">${day2.day.mintemp_c}&deg;C</p>
                    <p class="weather-status mb-5 pb-4 mt-2">${day2.day.condition.text}</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- card 2 -->
            <div class="col-md-12 col-xl-4">
              <div class="rounded-end-2 overflow-hidden">
                <div
                  class="forcast-date text-white d-flex justify-content-between px-2 py-3 forcast-card-head"
                >
                  <span>${current3Day}</span>
                  <span>${day3Month} ${current3Month}</span>
                </div>
                <div
                  id="day2"
                  class="forcast-details px-3 forcast-card-body text-white pt-5"
                >
                  <div
                    class="weather-icon d-flex justify-content-center align-items-center pb-5"
                  >
                    <img src="${day3.day.condition.icon}" alt="" />
                  </div>
                  <div
                    class="weather-temprature d-flex flex-column gap-2 justify-content-center align-items-center pb-5 mt-1"
                  >
                    <p class="day h3">${day3.day.maxtemp_c}&deg;C</p>
                    <p class="night">${day3.day.mintemp_c}&deg;C</p>
                    <p class="weather-status mb-5 pb-4 mt-2">${day3.day.condition.text}</p>
                  </div>
                </div>
              </div>
            </div>`;

  forecastCards.innerHTML = html;
}

function searchHandler(value) {
  getWeatherData(value);
  displayData(value);
}

searchBtn.addEventListener("click", () => searchHandler(searchInput.value));
searchInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    searchHandler(e.target.value);
  }
});
displayData();
