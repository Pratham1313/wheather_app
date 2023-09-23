import React, { useEffect, useState } from "react";
import "./temp.css";
import axios from "axios";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humid_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

export default function Tempapp() {
  const [input, setinput] = useState("pune");
  const [data, setdata] = useState({});

  useEffect(() => {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=3b6262fe8748d765588ffdfea8833ec9&units=metric`;
    axios
      .get(api)
      .then((response) => {
        console.log(response.data);
        setdata({
          celcius: response.data.main.temp,
          name: response.data.name,
          humidity: response.data.main.humidity,
          speed: response.data.wind.speed,
          image: response.data.weather[0].main
        });
      })
      .catch((err) => console.log(err));
  }, [1]);

  function change_country() {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=3b6262fe8748d765588ffdfea8833ec9&units=metric`;
    axios
      .get(api)
      .then((response) => {
        console.log(response.data);
        setdata({
          celcius: response.data.main.temp,
          name: response.data.name,
          humidity: response.data.main.humidity,
          speed: response.data.wind.speed,
          image: response.data.weather[0].main
        });
      })
      .catch((err) => console.log(err));
  }

  function handle_image(name) {
    if (name === "Clouds") {
      return cloud_icon;
    } else if (name === "Clear") {
      return clear_icon;
    } else if (name === "Rain") {
      return rain_icon;
    } else if (name === "Drizzle") {
      return drizzle_icon;
    } else if (name === "Mist") {
      return snow_icon;
    }
  }
  const datee = new Date();

  return (
    <div className="container">
      <div className="main_container">
        <h1>Weather App</h1>
        <input
          className="input"
          value={input}
          placeholder=" Search... "
          onChange={(e) => setinput(e.target.value)}
        />
        <button onClick={change_country}>Search</button>
        <div>
          <div className="wheather">
            <img
              className="weather_icon"
              src={handle_image(data.image)}
              alt="s"
            />
            <h1>{Math.round(data.celcius)}°C</h1>
            <h3>
              {data.name} - {data.image}
            </h3>
          </div>
          <div className="data">
            <div>
              <img className="" src={humid_icon} alt="" />
              <div>humidity</div>
              <div>{data.humidity}%</div>
            </div>
            <div>
              <img className="" src={wind_icon} alt="" />
              <div>wind speed</div>
              <div>{Math.round(data.speed * 3.7)}km/h</div>
            </div>
          </div>
        </div>
      </div>
      <div className="outer_container">
        <h3 className="time">{datee.toLocaleDateString()}</h3>
      </div>
    </div>
  );
}
