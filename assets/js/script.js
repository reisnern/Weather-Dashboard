var infoinput = document.getElementById("info-input")
var sbutton = document.getElementById("s-button")
var forecastcolumns = document.getElementById("forecast-columns")
var city = document.querySelector("#city")
var todayinfo = document.querySelector("#todays-weather")
var temperature = document.querySelector("#temperature")
var windspeed = document.querySelector("#wind-speed")
var humiditypercent = document.querySelector("#humidity-percent")
var uvindex = document.querySelector("#uv-index")
var searchedcity = JSON.parse(localStorage.getItem("searched")) || []
var savedsearch = document.querySelector("#saved-input")
var currentday = document.getElementById("current-day")

// Save Search History

var citylist = function (searched) {
    var listelement = document.createElement("button")
    listelement.textContent = searched
    savedsearch.append(listelement)
    listelement.setAttribute("class", "btn btn-secondary save-now")

    listelement.addEventListener("click",
        function() {
            getweather(searched);
            todaysforecast(searched)

            temperature.innerHTML = ""
            windspeed.innerHTML = ""
            humiditypercent = ""
            uvindex.innerHTML = ""
            city.innerHTML = ""

        })
}
// Start loop for history
for (var i = 0; i < searchedcity.length; i++) {
    citylist(searchedcity[i])
}
// Get Weather for today
var getweather = function (location) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=81054108cea086276c96966b6bf32e1c&units=imperial"

    fetch(apiURL)
        then(function (response) {
            if (response.ok) {
               //console.log(response); 
                response.json().then(function (data) {

                    if (searchedcity.indexOf(location) === -1 ){
                        searchedcity.push(location)
                        localStorage.setItem("searched", JSON.stringify(searchedcity))
                        citylist(location);
                    }

                    var h2 = document.createElement("h2")
                    h2.textContent = location + " " + new Date().toLocaleDateString()
                    city.appendChild(h2);
                
                    var weatherimg = document.createElement("img")
                    weatherimg.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
                    h2.appendChild(weatherimg)

                    var pcurrentemp = document.createElement("p")
                    pcurrentemp.textContent = "temperature: " + data.main.temp + " °F"
                    temperature.appendChild(pcurrenttemp);

                    var pshowwind = document.createElement("p")
                    pshowwind.textContent = "Wind: " + data.wind.speed + " MPH"
                    windspeed.appendChild(pshowwind);
                    console.log(data);

                    var phumidity = document.createElement("p")
                    phumidity.textContent = "Humidity: " + data.main.humidity + "%"
                    humiditypercent.appendChild(phumidity);

                    getUV(data.coord.lat, data.coord.lon)
                    infoinput.value = ""

                    currentday.classList.add("column-1")

                })
        } else {
            alert("Error: Location not found. Please enter a valid city name and try again.");
        }
    })
}

//Start UV Index
var uvinfo = function (lat, lon) {
    var apiURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&&appid=81054108cea086276c96966b6bf32e1c"
    //console.log(lon, lat)
    fetch(apiURL)
        .then = (function (response) {
            if (response.ok) {
                //console.log(response);
                response.json().then(function (data) {
                    //console.log(data);

                    var btn = document.createElement("button")
                    if (data.value < 3) {
                        btn.classList.add("btn-success")
                    } else if (data.value < 7) {
                        btn.classList.add("btn-warning")
                    } else {
                        btn.classList.add("btn-danger")
                    }
                    btn.textContent = "UV: " + data.value
                    btn.classList.add("uv")
                    uvIndex.appendChild(btn);
                })
            }
        })
}

//Create Forecast Columns/Cards
var todaysforecast = function (location) {
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=81054108cea086276c96966b6bf32e1c&units=imperial"

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {

                response.json().then(function (data) {
                forecastcolumns.innerHTML += "<div class='h4'>" + "5-Day Forecast:" + "</div>"
                    for (var i = 0; i < data.list.length; i++) {
                        if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                            var card = "<div class=\"card col card border-secondary text-info\"><div class\"card-title\">" + new Date(data.list[i].dt_txt).toLocaleDateString() + "</div>"
                                + "<img src='https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png'" + "/>"
                                + "<div>temperature: " + data.list[i].main.temp + " °F</div></br>"
                                + "<div>windspeed: " + data.list[i].wind.speed + " MPH</div></br>"
                                + "<div>humiditypercent: " + data.list[i].main.humidity + "%</div></div>"
                            forecastcolumns.insertAdjacentHTML('beforeend', card)
                        }
                    }
                })
            }
        })
}

sbutton.addEventListener("click", function (event) {
    event.preventDefault()
    temperature.innerHTML = ""
    windspeed.innerHTML = ""
    humiditypercent = ""
    uvindex.innerHTML = ""
    city.innerHTML = ""
    forecastcolumns.innerHTML = ""
    

    getweather(infoinput.value)
    todaysforecast(infoinput.value)

})