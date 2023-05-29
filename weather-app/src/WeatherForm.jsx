import React, { useState } from "react";

const WeatherForm = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    if (city) {
      onSearch(city);
    }
  };

  return (
    <div className="search-container">
      <img src="./images/icons/location-icon.png" className="loc_logo" alt="img logo location"/>
      <input type="text" value={city} onChange={handleCityChange} placeholder="Enter city" />
      <button onClick={handleSearch}><img src="./images/icons/search-icon.png" className="search_logo" alt="img logo search"/></button>
    </div>
  );
};

export default WeatherForm;
