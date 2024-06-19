const searchInput = document.querySelector("#search");
const currWeatherDate = document.querySelector("#currWeatherDate");
const city = document.querySelector("#city");
const searchBtn = document.querySelector(".search-btn");
const baseUrl = "https://api.weatherapi.com/v1/";
const API_KEY = "7d77b96c972b4d119a3151101212704";
// `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${a}&days=3`
const searchParam = () => {
  searchInput.addEventListener("keyup", function (e) {
    return e.target.value;
  });
};
searchBtn.addEventListener("click", function () {
  const searchText = searchParam();
});
