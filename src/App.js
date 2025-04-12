
import './App.css';

import React, { useState } from 'react';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiId = 'ee97f9ff903c9613bd418ccb385c3c7a';

  const kelvinToCentigrade = (temp) => parseInt(temp - 273.15);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (city.trim() === '' || country.trim() === '') {
      showError('Both inputs are mandatory');
      return;
    }

    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`);
      const data = await res.json();

      if (data.cod === '404') {
        showError('City not found');
        setWeather(null);
      } else {
        setError('');
        setWeather(data);
      }
    } catch (err) {
      console.error(err);
      showError('Error occured obtaining data');
    }
  };

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(''), 3000);
  };

  return (
    <div className="container">
      <form className="get-weather" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          id="city"
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          id="country"
        />
        <button type="submit">Click</button>
        {error && <p className="alert-message">{error}</p>}
      </form>

      <div className="result">
        {weather && (
          <div>
            <h5>Weather in {weather.name}</h5>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
            <h2>{kelvinToCentigrade(weather.main.temp)}°C</h2>
            <p>Max: {kelvinToCentigrade(weather.main.temp_max)}°C</p>
            <p>Min: {kelvinToCentigrade(weather.main.temp_min)}°C</p>
            <p>Wind: {weather.wind.speed} m/s</p>
            <p>Humidity: {weather.main.humidity}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;