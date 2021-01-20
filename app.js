// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0
const iconElement=document.querySelector(".weather-icon");
const tempElement=document.querySelector(".temperature-value p");
const desclement=document.querySelector(".temperature-description p");
const locationElement=document.querySelector(".location p");
const notificationElement=document.querySelector(".notification");

//app data
const weather ={};
weather.temperature={
    unit:"celsius"
}

//app const and vars
const KELVIN=273;
const key="340b8b62d723d40fef66995557c1a447";

//check if browser supports geolocation
if('geolocation' in navigator)
{

navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else
{
    notificationElement.style.display="block";
    notificationElement.innerHTML="<p> Browser dont support geolocation</p>";
}

//set user position
function setPosition(position)
{
    let latitude=position.coords.latitude;
    let longitude=position.coords.longitude;

    getWeather(latitude,longitude);

}
//show error if any issue with geolocation service
function showError(error)
{
    notificationElement.style.display="block";
     notificationElement.innerHTML=`<p> ${error.message}</p>`;
}


function getWeather(latitude,longitude)
{
    let api=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
.then( (response) => (response.json()))
.then( (result) => {
console.log(result);
})


    fetch(api).then(function(response)
    {
        let data=response.json();
        return data;
    })
    .then(function(data)
    {
        weather.temperature.value=Math.floor(data.main.temp-273);
        weather.description=data.weather[0].description;
        weather.iconId=data.weather[0].icon;
        weather.city=data.name;
        weather.country=data.sys.country;


    }).then(function()
    {
        displayweather();
    });
}
function displayweather()
{
   iconElement.innerHTML=`<img src="icons/${weather.iconId}.png"/>`;
   tempElement.innerHTML=`${weather.temperature.value}<span> C</span>`;
   desclement.innerHTML=weather.description;
   locationElement.innerHTML=`${weather.city}, ${weather.country}`;

 
}
//conversion in temp
function CToF(temperature)
{
    return (temperature* 9/5) +32;
}

//when user clicks on temp element
tempElement.addEventListener("click",function(){
    if(weather.temperature.unit=="celsius")
    {
        let fahrenheit=CToF(weather.temperature.value);
        fahrenheit=Math.floor(fahrenheit);
        tempElement.innerHTML=`${fahrenheit}<span> F</span>`;
        weather.temperature.unit="fahrenheit";

    }
    else{
        tempElement.innerHTML=`${weather.temperature.value}<span> C</span>`;
        weather.temperature.unit="celsius";
    }

})




