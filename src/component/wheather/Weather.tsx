import React, { useEffect, useState } from "react";
import "./weather.css";
import { useAuth } from "../../auth/AuthContext";
import { customFetch } from "../../service/api-client";

const App: React.FC = () => {
  const [adresse, setAdresse] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState("VILLE");

  const auth = useAuth();

  const fetchWeather = async () => {
    if (!adresse) {
      setError("Veuillez entrer une ville.");
      setWeather(null);
      return;
    }
    setError(null);
    try {
      if (data === "ADRESSE") {
        const cityResponse = await customFetch.get(`/search/${adresse}`, {
          headers: { Authorization: `Bearer ${auth.token?.token}` },
        });

        console.log(cityResponse.data.city);

        const response = await customFetch.get(
          `/weather/${cityResponse.data.city}`,
          {
            headers: { Authorization: `Bearer ${auth.token?.token}` },
          }
        );
        setWeather(response.data);
        setAdresse("");
      } else {
        const response = await customFetch.get(`/weather/${adresse}`, {
          headers: { Authorization: `Bearer ${auth.token?.token}` },
        });

        setWeather(response.data);
        setAdresse("");
      }
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  useEffect(() => {
    const fetchInitialWeather = async () => {
      try {
        const response = await customFetch.get(`/weather/Reims`, {});

        setWeather(response.data);
      } catch (err) {
        setError(err.message);
        setWeather(null);
      }
    };

    fetchInitialWeather();
  }, []);

  return (
 <div id="weather">
         <div className="app-weather">
      <header className="header">
        <h1>Rechercher la météo Par</h1>
        <div className="search-type">
          <button
            onClick={() => setData("VILLE")}
            className="search-button active"
          >
            Ville
          </button>
          <button onClick={() => setData("ADRESSE")} className="search-button">
            Adresse
          </button>
        </div>

        {data === "VILLE" && (
          <div className="search-container">
            <input
              type="text"
              placeholder="Entrez une ville..."
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              className="search-input"
            />
            <button onClick={fetchWeather} className="search-button">
              Rechercher
            </button>
          </div>
        )}
        {data === "ADRESSE" && (
          <div className="search-container">
            <input
              type="text"
              placeholder="Entrez une adresse..."
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              className="search-input"
            />
            <button onClick={fetchWeather} className="search-button">
              Rechercher
            </button>
          </div>
        )}
      </header>

      {error && <p className="error-message">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h1>Météo actuelle de la ville de {weather.city}</h1>
          <p>Température : {weather.temperature}°C</p>
          <p>Météo : {weather.description}</p>
          {/* <p>Humidité : {weather.main.humidity}%</p> */}
          <p>Vent : {weather.windSpeed} km/h</p>
        </div>
      )}
    </div>
  <div>
    <form className="save-address-form">
      <input
        type="text"
        placeholder="Entrez une adresse à enregistrer..."
        value={adresse}
        onChange={(e) => setAdresse(e.target.value)}
        className="save-address-input"
      />
      <button type="submit" className="save-address-button">
        Enregistrer
      </button>
    </form>
  </div>
 </div>
  );
};

export default App;
