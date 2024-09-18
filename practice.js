const w_city = document.querySelector('.weather_city');
const w_forecast = document.querySelector('.weather_forecast');
const w_icon = document.querySelector('.weather_icon');
const w_min = document.querySelector('.weather_min');
const w_max = document.querySelector('.weather_max');
const w_feelsLike = document.querySelector('.weather_feelsLike');
const w_humidity= document.querySelector('.weather_humidity');
const w_wind= document.querySelector('.weather_wind');
const w_pressure= document.querySelector('.weather_pressure');
const w_dt= document.querySelector('.weather_date_time');




let city = "pune";

let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5d3e69a640b2ab7af01a4000bec5fa61`;

const getWeather = (e)=>{
    e.preventDefault();
    city = e.srcElement[0].value;
    e.srcElement[0].value = "";
    // console.log(city);
     weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5d3e69a640b2ab7af01a4000bec5fa61`;
    getWeatherDetails();    
}

const getDate = (dt)=>{
const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
console.log(curDate);
// // const date = new Date();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  //   second: "numeric",
};

const formatter = new Intl.DateTimeFormat("en-US", options);
// console.log(formatter);
const formattedDate = formatter.format(curDate);
// console.log(formattedDate);

return formattedDate;
}

const getCountry =(cn)=>{
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(cn);
}

const getWeatherDetails = async ()=>{
    try{
        const fetched = await fetch(weatherUrl);
        // console.log(fetched);
        const data = await fetched.json();
        console.log(data);
        
        w_city.innerHTML = `${data.name} , ${getCountry(data.sys.country)}`;
        w_forecast.innerHTML = `${data.weather[0].main}`;
        w_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
        w_min.innerHTML = ` Min: ${data.main.temp_min}&deg;`;
        w_max.innerHTML = `Max: ${data.main.temp_max}&deg;`;
        w_dt.innerHTML = getDate(data.dt);
        w_feelsLike.innerHTML = `${data.main.feels_like.toFixed()}&deg;`;
        w_humidity.innerHTML = ` ${data.main.humidity} %`;
        w_wind.innerHTML = ` ${data.wind.speed} m/s`;
        w_pressure.innerHTML = ` ${data.main.pressure} hPa`;
    }catch(e){
        console.log(e);   
    }
}

getWeatherDetails();
document.body.addEventListener("load",getWeatherDetails);
document.querySelector('.weather_search').addEventListener('submit',getWeather);
