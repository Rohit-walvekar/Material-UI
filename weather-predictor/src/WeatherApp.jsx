import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";
import "./WeatherApp.css";

export default function WeatherApp() {
  const [WeatherInfo, setWeatherInfo] = useState("");

  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };
  return (
    <div className="app-container">
      <h1>Weather Predictor</h1>
      <SearchBox updateInfo={updateInfo} />
      {WeatherInfo && <InfoBox info={WeatherInfo} />}
    </div>
  );
}
