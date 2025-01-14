import React, { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext';
import axios from 'axios';

const ListAdresse = () => {

    const [city, setCity] = useState("Reims"); // Ville par défaut
    const [forecast, setForecast] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const auth = useAuth();
  
    const fetchForecast = async () => {
      setError(null);
      setForecast(null);
  
      useEffect(() => {
        const fetchInitialForecast = async () => {
          try {
            const weatherResponse = await axios.get(
              `http://localhost:8000/api/forecast/2984113`,
              {
                headers: { Authorization: `Bearer ${auth.token?.token}` },
              }
            );
            //const weatherData = await weatherResponse.json();
  
            //Groupé par jour
            const dailyData = weatherResponse.data.list.reduce(
              (acc: any, forecast: any) => {
                const date = forecast.dt_txt.split(" ")[0];
                if (!acc[date]) {
                  acc[date] = [];
                }
                acc[date].push(forecast);
                return acc;
              },
              {}
            );
  
            setForecast(Object.values(dailyData));
          } catch (err) {
            setError(err.message);
            setForecast(null);
          }
  
          fetchInitialForecast();
        };
      }, []);
  
      return <div className="app">
          <header className="header">
            <h1>Prévisions météo - 7 jours</h1>
            <div className="search-container">
              <input
                type="text"
                placeholder="Entrez une ville..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="search-input"
              />
              <button onClick={fetchForecast} className="search-button">
                Rechercher
              </button>
            </div>
          </header>
  
          {error && <p className="error-message">{error}</p>}
  
          {forecast && (
            <div className="forecast-container">
              <h2>Prévisions pour {city}</h2>
              <div className="forecast-grid">
                {forecast.map(([day, data]: any, index: number) => (
                  <div key={index} className="forecast-day">
                    <p>
                      <strong>
                        {new Date(day.dt * 1000).toLocaleDateString("fr-FR", {
                          weekday: "long",
                        })}
                      </strong>
                    </p>
                    <p>Température max : {data.main.temp_max}°C</p>
                    <p>Température min : {data.main.temp_min}°C</p>
                    <p>Météo : {day.weather[0].description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      
    };
}

export default ListAdresse