// https://api.openweathermap.org/data/2.5/weather?q=Los%20Angeles,cl&units=metric&appid=ef346e9776b0d2c392d145292aea5870&lang=sp


// api.openweathermap.org/data/2.5/forecast?lat=48.8534&lon=2.3488&appid=ef346e9776b0d2c392d145292aea5870

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

        tempReal = Math.ceil(temp)
        tempMax = Math.trunc(temp_max)
        tempMin = Math.trunc(temp_min)
        speedKmH = Math.trunc(speed * 3,6)

        console.log(name,icon,description,temp,temp_min, temp_max, humidity,speed, tempReal)

// variables coordenadas

        const {lon, lat} = data.coord;

        console.log(lon,lat)

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
        
             },
             search: function (){
                this.fetchWeather(document.querySelector(".search-bar").value);
             }
   };

   document.querySelector(".search button").addEventListener("click", function (){
    weather.search();


   })

