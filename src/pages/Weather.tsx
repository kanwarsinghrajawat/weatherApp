import { useState } from "react";
import axios from "axios";

type WeatherData = {
  city: string;
  description: string;
  temp: string;
  humidity: string;
  wind: string;
};

const Weather = () => {
  const [city, setCity] = useState<string>("");
  const [cityName, setCityName] = useState<string>(city);
  const [weatherData, setWeatherData] = useState<WeatherData>({
    city: "",
    description: "",
    temp: "",
    humidity: "",
    wind: "",
  });

  console.log(city, "jhgjiokm");
  console.log(cityName, "hghjk");

  const fetchWeather = async () => {
    const apikey = "5afd8605627a18476f92770ed1af18ed";
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
      );
      const data = response.data;
      const { name } = data;
      const { description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      setWeatherData({
        city: name,
        description: "Description: " + description,
        temp: "Temperature: " + temp + "°C",
        humidity: "Humidity:" + humidity + "%",
        wind: "Wind Speed:" + speed + "km/hr",
      });
      setCityName(city);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  const handleSearch = () => {
    fetchWeather();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchWeather();
    }
  };
  const clearSearch = () => {
    setCityName("");
    setCity("");
  };

  return (
    <>
      <div className="card">
        <div className="box">
          <div className="search-weat">
            <div className="search-bar-container">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="search-bar"
                placeholder="Search city here..."
                onKeyPress={handleKeyPress}
              />
              {city.length > 0 && (
                <button
                  type="button"
                  className="btn-click"
                  onClick={clearSearch}
                >
                  <img src="closed.png" className="img-close" alt="Close" />
                </button>
              )}
            </div>

            <button type="button" className="btn-click" onClick={handleSearch}>
              <img src="glass.png" className="img-search" alt="Search" />
            </button>
          </div>
          {cityName.length > 0 && (
            <div className="weather-details">
              <div className="city">Weather in {weatherData.city}</div>
              <div>{weatherData.temp}</div>
              <div>{weatherData.description}</div>
              <div>{weatherData.humidity}</div>
              <div>{weatherData.wind}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Weather;
