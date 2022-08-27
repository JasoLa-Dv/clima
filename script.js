// https://api.openweathermap.org/data/2.5/weather?q=Los%20Angeles,cl&units=metric&appid=ef346e9776b0d2c392d145292aea5870&lang=sp


// api.openweathermap.org/data/2.5/forecast?lat=48.8534&lon=2.3488&appid=ef346e9776b0d2c392d145292aea5870

// api.openweathermap.org/data/2.5/forecast?lat=-37.4667&lon=-72.35&appid=ef346e9776b0d2c392d145292aea5870

// lon= -72.35   lat=-37.4667

// https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid={API key}

// https://openweathermap.org/weathermap?basemap=map&cities=true&layer=radar&lat=48.8534&lon=2.3488&zoom=6

// Buscar Ciudad

let weather = {
    "apiKey":"49cc8c821cd2aff9af04c9f98c36eb74",
    fetchWeather: function (city) {
    
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=sp&appid=" + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    
            },

// Funcion para obtener variables

    displayWeather: function(data){
                            const {name} = data;
                            const {icon, description } = data.weather[0];
                            const {temp, humidity, temp_min, temp_max, pressure } = data.main;
                            const { speed } = data.wind;

                            tempReal = Math.trunc(temp);
                            tempMax = Math.trunc(temp_max);
                            tempMin = Math.trunc(temp_min);
                            speedKmH = Math.trunc(speed * 3,6);

                            console.log(name,icon,description,temp,temp_min, temp_max, humidity,speed, tempReal);

                            const lon = data.coord.lon;
                            const lat = data.coord.lat;

                            console.log(lon);
                            console.log(lat);

                    // variables coordenadas

                            document.querySelector(".city").innerText = "Clima en " + name;

                            document.querySelector(".icon").src =
                            "https://openweathermap.org/img/wn/" + icon + "@4x.png";

                            document.querySelector(".description").innerText = description;
                            document.querySelector(".temp").innerText = tempReal + " °C";

                            document.querySelector(".max").innerText = "Máx.: " + tempMax + " °C";

                            document.querySelector(".min").innerText = "Mín.: " + tempMin + " °C";

                            document.querySelector(".Pressure").innerText = "Presión: " + pressure + " hPa";

                            document.querySelector(".humidity").innerText =
                            "Humedad: " + humidity + "%";
                            document.querySelector(".wind").innerText =
                            "Velocidad del viento: " + speedKmH + " Km/h";

                            var map = L.map('map').
                            setView([lat,lon],14);

                            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
                            maxZoom: 18
                            }).addTo(map);

                            L.control.scale().addTo(map);

                            L.marker([lat,lon],{draggable: true}).addTo(map);
        
                             },
             
    search: function (){
                this.fetchWeather(document.querySelector(".search-bar").value);
             }
};

document.querySelector(".search button").addEventListener("click", function (){
    weather.search();
   });

document.querySelector(".search-bar").addEventListener("keyup", function (event){
    if (event.key == "Enter") {
        weather.search();
    }   
});
/* 
weather.fetchWeather("Los Angeles, cl"); */

