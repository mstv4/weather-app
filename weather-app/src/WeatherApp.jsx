import React, { useState } from "react";
import WeatherForm from "./WeatherForm";
import WeatherForecast from "./WeatherForecast";
import "./styles/WeatherApp.css";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const fetchWeatherData = async (city) => {
    try {
      const apiKey = "2c817747b3a929c811c6322ceeda9f53";
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        setNotFound(false);
      } else {
        setNotFound(true);
        throw new Error("Error fetching weather data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case "Clear":
        return "images/clear.png";

      case "Rain":
        return "images/rain.png";

      case "Snow":
        return "images/snow.png";

      case "Clouds":
        return "images/cloud.png";

      case "Haze":
        return "images/mist.png";

      default:
        return "";
    }
  };

  const getWeatherCloth = (temperature) => {
    if (temperature > 20) {
      return <i><img src="./images/icons/icon-shorts.png" className="cloth_logo" alt="icon cloth"/></i>; // Іконка шорт і футболки
    } else if (temperature >= 15 && temperature <= 20) {
      return <i><img src="./images/icons/icon-pants.png" className="cloth_logo" alt="icon cloth"/></i>; // Іконка штанів і худі
    } else if (temperature >= 5 && temperature < 15) {
      return <i><img src="./images/icons/icon-jacket.png" className="cloth_logo" alt="icon cloth"/></i>; // Іконка куртки
    } else if (temperature >= 0 && temperature < 5) {
      return <i><img src="./images/icons/icon-coat.png" className="cloth_logo" alt="icon cloth"/></i>; // Іконка пальто
    } else {
      return <i><img src="./images/icons/icon-scarf.png" className="cloth_logo" alt="icon cloth"/></i>; // Іконка теплої куртки
    }
  };

  const getUniqueDates = () => {
    if (weatherData) {
      const dates = weatherData.list
        .map((item) => item.dt_txt.split(" ")[0])
        .filter((date, index, array) => array.indexOf(date) === index);

      return dates.slice(1, 4);
    }
    return [];
  };

  return (
    <div className="weather-app">
      <WeatherForm onSearch={fetchWeatherData} />
      {notFound ? (
        <>
        <p>Ops! City not found</p>
        <img src="./images/404.png" alt="logo not found"/>
        </>        
      ) : (
        weatherData && (
          <WeatherForecast
            weatherData={weatherData}
            getWeatherIcon={getWeatherIcon}
            getWeatherCloth={getWeatherCloth}
            getUniqueDates={getUniqueDates}
          />
        )
      )}
    </div>
  );
};

export default WeatherApp;
