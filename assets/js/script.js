var infoinput = document.getElementById("info-input")
var sbutton = document.getElementById("s-button")
var forecastcolumns = document.getElementById("forecast-columns")
var city = document.querySelector("#city")
var todaysweather = document.querySelector("#todays-weather")
var temperature = document.querySelector("#temperature")
var windspeed = document.querySelector("#wind-speed")
var humiditypercentage = document.querySelector("#humidity-percentage")
var uvindex = document.querySelector("#uv-index")
var searched = JSON.parse(localStorage.getItem("searched")) || []
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
    list(searched[i])
}

var todaysforecast = function (location) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=81054108cea086276c96966b6bf32e1c&units=imperial"

    fetch(apiURL)
        then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    if (searched.indexOf(location) === -1) {
                        searched.push(location)
                        localStorage.setItem("searched", JSON.stringify(searched))
                        list(location);
                    }

                    var h2 = document.createElement("h2")
                    h2.textContent = location + " " + new Date().toLocaleDateString()
                    city.appendChild(h2);
                }
            }
        }
}
