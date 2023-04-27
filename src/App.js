import React, { useState, useEffect } from "react";


const api = {
  key: "8047cbb81d7a8cbf59ebfbdd3db04897",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherinfo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };
  useEffect(() => {
    if (!searchCity) return;
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&appid=${api.key}`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          setWeatherinfo(
            `
            Country:${data.sys.country}
            City:${data.name}
            Temp:${data.main.temp}
            Description:${data.weather[0].description}
            `
          );
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
          setWeatherinfo("");
        }
      } catch (error) {
        setErrorMessage(error);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  return (
    <>
      <form className="wrapped" onSubmit={handleSubmit}>
        <input className="search"
          placeholder="City"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="btn">Search</button>
      </form>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="err-message">{errorMessage}</div>
          <div className="weather-info">{weatherInfo}</div>
        </>
      )}
    </>
  );
}

export default App;
