// selecting DOM element

let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time")
let w_forecast = document.querySelector(".weather_forecast")
let w_icon = document.querySelector(".weather_icon")
let w_temp = document.querySelector(".weather_temperature")
let w_max = document.querySelector(".weather_max")
let w_min = document.querySelector(".weather_min")
let weatherFeels = document.querySelector(".weather_feelsLike")
let weatherHumidity = document.querySelector(".weather_humidity")
let weatherWind = document.querySelector(".weather_wind")
let weatherPressure = document.querySelector(".weather_pressure")

let citySearch =document.querySelector(".weather_search")


// to get the actual country name

const getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}

// to get the date and time

const getDateTime = (dt) => {
 // its in sec

    const curDate = new Date(dt * 1000) // converted sec into milli sec . new Date is to get date , its a constructor 
    console.log(curDate)


    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        // second:"numeric",
    }

    const formatter = new Intl.DateTimeFormat("en-US", options);

    const formattedDate = formatter.format(curDate);

    return formattedDate

}

let city ="kolkata";

// search functionality
//LINK - here comes the event deligation when we can target the child by calling the parent
citySearch.addEventListener("submit",(e)=>{
    e.preventDefault();

    let cityName =document.querySelector('.city_name')
    console.log(cityName.value)
    city =cityName.value
    getWeatherData();
    cityName.value=""
})



//define the getWeather function here
const getWeatherData = async () => {

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=383ebe07aff4e55710b311536664b28f`;


    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data)

        const { main, name, weather, wind, sys, dt } = data;
        cityName.innerHTML = `${name},${getCountryName(sys.country)}`
        dateTime.innerHTML = getDateTime(dt)

        w_forecast.innerHTML=`${weather[0].main}`// its inside an array
        w_icon.innerHTML=`<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`
        let celTemp= main.temp - 273.15

        w_temp.innerHTML=`${celTemp.toFixed()}&#176;C`;
        // w_temp.innerText=`${main.temp}&#176`;//this will not give the deg sign as it is in content we have to use html to get it
        w_min.innerHTML=`Min: ${(main.temp_min -273.15).toFixed()}&#176;C`
        w_max.innerHTML=`Max: ${(main.temp_max -273.15).toFixed()}&#176`
        weatherFeels.innerHTML=`${(main.feels_like- 273.15).toFixed(2)}&#176`
        weatherHumidity.innerHTML=`${main.humidity}%`
        weatherWind.innerHTML=`${wind.speed}m/s`
        weatherPressure.innerHTML=`${main.pressure}hpa`
    } catch (error) {
        console.log(error)
    }

};


// clock display code



document.body.addEventListener("load", getWeatherData());