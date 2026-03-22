import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  const API_URL = `https://api.openweathermap.org/data/2.5/weather`;
  const API_KEY = "971ff9582f1353ac5cb40c8bab91a302";

  let getWeatherInfo = async () => {
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`,
      );
      let jsonResponce = await response.json();
      // console.log(jsonResponce);

      let result = {
        city: city,
        temp: jsonResponce.main.temp,
        minTemp: jsonResponce.main.temp_min,
        maxTemp: jsonResponce.main.temp_max,
        humidity: jsonResponce.main.humidity,
        feelsLike: jsonResponce.main.feels_like,
        weather: jsonResponce.weather[0].description,
      };

      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  };

  let handleChanage = (evt) => {
    setCity(evt.target.value);
  };

  let handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      console.log(city);
      setCity("");
      setError(false);
      let newInfo = await getWeatherInfo();
      updateInfo(newInfo);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChanage}
        />
        <br /> <br />
        <Button variant="contained" type="submit">
          Search
        </Button>
        {error && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            No such place exits
          </p>
        )}
      </form>
    </div>
  );
}
