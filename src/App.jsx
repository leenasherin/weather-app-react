import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    setLoading(true);
    const API_KEY = "8ac5c4d57ba6a4b3dfcf622700447b1e";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
        setError("");
      } else {
        setError("City not found!");
        setWeather(null);
      }
    } catch (err) {
      setError("Error fetching data!");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherImage = () => {
    if (!weather) return "";
    const condition = weather.weather[0].main.toLowerCase();
    switch (condition) {
      case "clear":
        return "./images/sunny.png"; 
      case "clouds":
        return "./images/cloudy.png"; 
      case "rain":
        return "./images/rainy.png"; 
      case "snow":
        return "./images/snowy.png"; 
      default:
        return "./images/default.png"; 
    }
  };

  return (
    <div className="app">
      <div className="weather-card">
        <h1>Weather App</h1> 
        <div className="search">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>🔍</button>
        </div>
        {error && <p className="error">{error}</p>}
        {loading && <p>Loading...</p>}
        {weather && (
          <div className="weather-details">
            <img
              src={getWeatherImage()}
              alt="Weather Icon"
              className="weather-image"
            />
            <h2>Weather in {weather.name}</h2> 
            <div className="weather-info">
              <p><i className="fas fa-thermometer-half"></i> Temperature: {Math.round(weather.main.temp)}°C</p>
              <p><i className="fas fa-tint"></i> Humidity: {weather.main.humidity}%</p>
              <p><i className="fas fa-wind"></i> Wind Speed: {weather.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
