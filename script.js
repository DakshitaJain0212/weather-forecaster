const inputBox =document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temp');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed')
const not_found = document.querySelector('.not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city){
	const API_key = "721b69933b23c800cfc20b28060b9a7d";
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;

	const weatherData = await fetch(`${url}`).then(response => response.json());

	if(weatherData.cod == `404`){
		not_found.style.display = "flex";
		weather_body.style.display = "none";
		console.error("404");
		return;
		
	}

	not_found.style.display = "none";
	weather_body.style.display = "flex";
	temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
	description.innerHTML = `${weatherData.weather[0].description}`;
	windSpeed.innerHTML = `${weatherData.wind.speed}Km/H`;
	humidity.innerHTML = `${weatherData.main.humidity}%`;

	switch(weatherData.weather[0].main){
	     case 'Clouds' :
			weather_img.src = "./images/cloudy.png";
			break;
		case 'Clear' :
			weather_img.src = "./images/sun.png";
			break;
		case 'Rain' :
			weather_img.src = "./images/rainy-day.png";
			break;
	    case 'Snow' :
			weather_img.src = "./images/snow.png";
			break;
		case 'Mist' :
			weather_img.src = "./images/mist.png";
			break;
	}
	console.log(weatherData);


}
searchBtn.addEventListener('click', () =>{
	checkWeather(inputBox.value)
})