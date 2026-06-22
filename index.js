const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card= document.querySelector(".card");
const apikey="ab7aff28dac1f8672e1e92b8307a851f";


weatherform.addEventListener("submit", async event =>{
    event.preventDefault(); 
    const city = cityinput.value
       if(city.trim()){
        
            const weatherdata = await getweatherdata(city);
             console.log(weatherdata);
       }
        
});

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

