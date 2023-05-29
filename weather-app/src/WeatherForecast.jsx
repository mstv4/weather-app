import React from "react";

const WeatherForecast = ({ weatherData, getWeatherIcon, getWeatherCloth, getUniqueDates }) => {
  return (
    <div className="weather-container">
      <p>Current Weather</p>
      <div className="current-weather">
        <div className="weather-icon">
          <img src={getWeatherIcon(weatherData.list[0].weather[0].main)} alt="Weather Icon" />
        </div>
        <div className="weather-info">
          <div className="temperature">{Math.round(weatherData.list[0].main.temp - 273.15)}°C</div>
          <div className="description">{weatherData.list[0].weather[0].main}</div>
          <div className="clothing-icon">{getWeatherCloth(Math.round(weatherData.list[0].main.temp - 273.15))}</div>
        </div>
      </div>
      <p>Next Days Weather</p>
      <div className="forecast">{getUniqueDates().map((date) => (<div key={date}>
            <div className="date">{date}</div>
            <div className="forecast-item">
              <div className="weather-icon">
                <img src={getWeatherIcon(weatherData.list.find((item) => item.dt_txt.includes(`${date} 12:00`)).weather[0].main)} alt="Weather Icon"/>
              </div>
              <div className="nextday-weather">
                <div className="temperature">
                  {Math.round(weatherData.list.find((item) => item.dt_txt.includes(`${date} 12:00`)).main.temp - 273.15)} °C
                </div>
                <div className="description">
                  {weatherData.list.find((item) => item.dt_txt.includes(`${date} 12:00`)).weather[0].main}
                </div>
                <div className="clothing-icon">
                  {getWeatherCloth(Math.round(weatherData.list.find((item) => item.dt_txt.includes(`${date} 12:00`)).main.temp - 273.15))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
