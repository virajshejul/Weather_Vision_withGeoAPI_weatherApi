async function getWeather() {
    const cityName = document.getElementById("cityInput").value;

    if (!cityName) {
        alert("Please enter a city name.");
        return;
    }

    // Step 1: Get latitude & longitude from API
    const geoAPI = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`;

    const geoRes = await fetch(geoAPI);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
        alert("City not found!");
        return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // Step 2: Get weather details
    const weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    const weatherRes = await fetch(weatherAPI);
    const weatherData = await weatherRes.json();

    const w = weatherData.current_weather;

    document.getElementById("cityName").innerText = `${name}, ${country}`;
    document.getElementById("temp").innerText = `🌡 Temperature: ${w.temperature}°C`;
    document.getElementById("wind").innerText = `💨 Wind Speed: ${w.windspeed} km/h`;
    document.getElementById("humidity").innerText = `📉 Humidity data not available (Free API)`;

    document.getElementById("weatherResult").classList.remove("hidden");
}
