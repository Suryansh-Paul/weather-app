const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card= document.querySelector(".card");
const apikey="ab7aff28dac1f8672e1e92b8307a851f";


weatherform.addEventListener("submit", async event =>{
    event.preventDefault(); 
    const city = cityinput.value
       if(city.trim()){
        
            const weatherdata = await getweatherdata(city);
            displayweatherinfo(weatherdata);
            
        
       }}     
);
async function getweatherdata(city) {

 const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
 const response = await fetch(apiurl);
 if(!response.ok){
    throw new Error("could not fetch weather data!");
 }
else{
    const data= await response.json();
    return data;
}
   }

function displayweatherinfo(data){
   const{name:city, 
      main:{temp,humidity},
    weather:[{description, id}]}=data;

    card.textContent="";
    card.style.display="flex";
    

    const cityDisplay= document.createElement("h1");
  
    const tempDisplay= document.createElement("p");
    
    const humidityDisplay= document.createElement("p");
    
    const descDisplay= document.createElement("p");
   
    const weatheremojidisplay= document.createElement("p");
  

    cityDisplay.textContent=city;
    cityDisplay.classList.add("cityDisplay");

     tempDisplay.textContent=`Temperature:${(temp-273.15).toFixed(1)}°C`;
    tempDisplay.classList.add("tempDisplay");

     humidityDisplay.textContent=`Humidity: ${humidity}%`;
    humidityDisplay.classList.add("humidityDisplay");

     descDisplay.textContent=description;
    descDisplay.classList.add("descDisplay");

     weatheremojidisplay.textContent= weatheremoji(id);
    weatheremojidisplay.classList.add("weatherEmoji");


      card.appendChild(cityDisplay);
      card.appendChild(tempDisplay);
      card.appendChild(humidityDisplay);
      card.appendChild(descDisplay);
      card.appendChild(weatheremojidisplay);




}

function weatheremoji(weatherid){


    switch(true){

        case (weatherid >= 200 && weatherid < 300):
            return "⛈️"; 

        case (weatherid >= 300 && weatherid < 500):
            return "🌦️"; 

        case (weatherid >= 500 && weatherid < 600):
            return "🌧️"; // Rain

        case (weatherid >= 600 && weatherid < 700):
            return "❄️"; 

        case (weatherid >= 700 && weatherid < 800):
            return "🌫️"; 
        case (weatherid === 800):
            return "☀️"; 

        case (weatherid >= 801 && weatherid < 810):
            return "☁️"; 

        default:
            return "❓";
    }
}




