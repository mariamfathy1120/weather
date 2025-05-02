let searchInput=document.querySelector('#search-input')
let weatherData;



searchInput.addEventListener('input',function(){
   if(searchInput.value.length>2){
    LocationResult(searchInput.value)
   } 
    
})
async function LocationResult(key){
    weatherData= await getData(key)
     todayData();
     tomorrowData()
     afterTomorrowData()
    console.log(weatherData)
}


async function getData(key){
    let response =await fetch(`http://api.weatherapi.com/v1/forecast.json?key=137fb85c71ac4f31b5a174124252504&q=${key}&days=3`)
    let data=await response.json();
    console.log(data)
    return data
}

function getDayName(dateString) {
    let date = new Date(dateString); 
    let options = { weekday: 'long' };
    return date.toLocaleDateString('en-US', options);
}
function formatDate(dateString) {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.toLocaleString('en-US', { month: 'long' });
    return `${day} ${month}`;
}
function todayData(){
    let dateStr = weatherData.forecast.forecastday[0].date;
    let dayName = getDayName(dateStr);
    let formattedDate = formatDate(dateStr);
    document.querySelector(".today .forecast-header .day").innerHTML=dayName
    document.querySelector(".today .forecast-header .date").innerHTML=formattedDate
    document.querySelector(".today .forecast-content .location").innerHTML=weatherData.location.name
    document.querySelector(".today .forecast-content .degree .num").innerHTML=weatherData.current.temp_c
    document.querySelector(".today .forecast-content .forecast-icon img").setAttribute('src',`https:${weatherData.current.condition.icon}`)
    document.querySelector(".today .forecast-content .custom").innerHTML=weatherData.current.condition.text
    document.querySelector(".today .forecast-content #humidity").innerHTML=weatherData.current.humidity+'%'
    document.querySelector(".today .forecast-content #wind").innerHTML=weatherData.current.wind_kph+'km/h'
    document.querySelector(".today .forecast-content #direction").innerHTML=weatherData.current.wind_dir
}
function tomorrowData(){          
    let forecast = weatherData.forecast.forecastday[1];
    let dayName = getDayName(forecast.date);
    let icon = forecast.day.condition.icon;
    let maxTemp = forecast.day.maxtemp_c;
    let minTemp = forecast.day.mintemp_c;
    let conditionText = forecast.day.condition.text;

    let box = `
        <div class="forecast-header">
            <div class="day">${dayName}</div>
        </div>
        <div class="forecast-content">
            <div class="forecast-icon">
                <img src="https:${icon}" alt="" width="48"> 
            </div>
            <div class="degree">${maxTemp}<sup>°</sup>C</div>
            <small>${minTemp}<sup>°</sup>C</small>
            <div class="custom">${conditionText}</div>
        </div>`;
    
    document.querySelector('.tomorrow').innerHTML = box;      
}
function afterTomorrowData(){   
    let forecast = weatherData.forecast.forecastday[2];
    let dayName = getDayName(forecast.date);
    let icon = forecast.day.condition.icon;
    let maxTemp = forecast.day.maxtemp_c;
    let minTemp = forecast.day.mintemp_c;
    let conditionText = forecast.day.condition.text;

    let box = `
        <div class="forecast-header">
            <div class="day">${dayName}</div>
        </div>
        <div class="forecast-content">
            <div class="forecast-icon">
                <img src="https:${icon}" alt="" width="48"> 
            </div>
            <div class="degree">${maxTemp}<sup>°</sup>C</div>
            <small>${minTemp}<sup>°</sup>C</small>
            <div class="custom">${conditionText}</div>
        </div>`;
    
    document.querySelector('.afterTomorrow').innerHTML = box;        
}