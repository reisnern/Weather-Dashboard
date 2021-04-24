var infoinput = document.getElementById("info-input")
var sbutton = document.getElementById("s-button")
var forecastcolumns = document.getElementById("forecast-columns")
var city = document.querySelector("#city")
var todaysweather = document.querySelector("#todays-weather")
var temperature = document.querySelector("#temperature")
var windspeed = document.querySelector("#wind-speed")
var humiditypercentage = document.querySelector("#humidity-percentage")
var uvindex = document.querySelector("#uv-index")
var searchedcity = JSON.parse(localStorage.getItem("searched")) || []
var savedSearch = document.querySelector("#saved-input")
var currentday = document.getElementById("current-day")

// Save Search History

var list = function (searched) {
    var listelement = document.createElement("button")
    listelement.textContent = searched
    savedSearch.append(listelement)
    listelement.setAttribute("class", "button btn-secondary save-now")

    listelement.addEventListener("click",
        function() {
            todaysforecast(searched);
            getweather(searched)

            temperature.innerHTML = ""
            windspeed.innerHTML = ""
            humiditypercentage = ""
            uvindex.innerHTML = ""
            city.innerHTML = ""

        })
}
// Start loop for history
for (var i = 0; i < searche.length; i++) {
    list(searchedcity[i])
}
// Get Wehater for today
var todaysforecast = function (location) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=81054108cea086276c96966b6bf32e1c&units=imperial"

    fetch(apiURL)
        then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    if (searchedcity.indexOf(location) === -1) {
                        searchedcity.push(location)
                        localStorage.setItem("searched", JSON.stringify(searchedcity))
                        list(location);
                    }

                    var h2 = document.createElement("h2")
                    h2.textContent = location + " " + new Date().toLocaleDateString()
                    city.appendChild(h2);
                
                    var weatherimg = document.createElement("img")
                    weatherimg.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
                    h2.appendChild(weatherimg)

                    var currentemp = document.createElement("p")
                    currentemp.textContent = "Temperature: " + data.main.temp + " °F"
                    currentemp.appendChild(currenttemp);