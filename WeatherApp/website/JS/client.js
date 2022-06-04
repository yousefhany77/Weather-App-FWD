const APIKEY = "a8d6ab39591853400732249344cbc92e";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;
const localhost = `http://localhost:3000/`;

// Get Date
let d = new Date();
let newDate = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();

// Function: Get weather data from Open Weather API
let getWeatherData = async (apiurl = "", zip, units = "metric") => {
  try {
    if (zip.length === 5) {
      errorbox.style.display = "none";
      let url = `${apiurl}?zip=${zip}&units=${units}&appid=${APIKEY}`;
      const response = await fetch(url);
      const data = await response.json();
      const weatherData = data;
      return weatherData;
    } else {
      console.error("Zip Code not found or invalid zip code");
    errorbox.style.display = "flex";
    errorDitails.innerHTML = "Zip Code not found";
    }
  } catch (err) {
    console.error(err);
  }
};

let generate = document.getElementById("generate");
let errorbox = document.getElementById('errorbox')
let errorDitails = document.getElementById('errorDitails');
generate.addEventListener("click", async () => {
  let zip = document.getElementById("zip").value;
  let feelings = document.getElementById("feelings").value;
  if (zip) {
    try {
      errorbox.style.display = "none";
      // ---------------- Step 1 ---------------- >>>>> Get Data from API with Client ZIP
      let temperature = await getWeatherData(apiUrl, zip);
      let temp = temperature.main.temp
      let city = temperature.name
      // ---------------- Step 2 ---------------- >>>>> POST Data to the projectData
      await fetch("/postdata", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          temp,
          newDate,
          feelings,
          city
        }),
      });
      // ---------------- Step 3 ---------------- >>>>> update UI
      document.getElementById("entryHolder").style.visibility = "visible";
      let dateDiv = document.getElementById("date");
      let tempDiv = document.getElementById("temp");
      let content = document.getElementById("content");
      let cityDiv = document.getElementById("city");
      let resWeatherData = await fetch("/getall").then((response) =>
        response.json()
      );
      tempDiv.innerHTML = resWeatherData.temp;
      content.innerHTML = resWeatherData.feelings;
      dateDiv.innerHTML = resWeatherData.date;
      cityDiv.innerHTML = `Weather in ${resWeatherData.city}`;
    } catch (e) {
      console.error("Error: " + e);
    }
  }
  else {
    console.error("No ZIP Code found")
    errorbox.style.display = "flex";
    errorDitails.innerHTML = "ZIP Code required";
  }
  
});
