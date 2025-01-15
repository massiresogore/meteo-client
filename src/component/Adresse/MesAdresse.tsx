import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import axios from "axios";
import "./adresse.css";
import { customFetch } from "../../service/api-client";
function MesAdresse() {
  const [city, setCity] = useState("Reims"); // Ville par défaut
  const [forecast, setForecast] = useState<any>(null);
  const [adresses, setAdresse] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  
    //Récupérer la ville de l'utilisateur
    // requetre sur cette ville
    // recupérer son identifient
    console.log(adresses);
    

    useEffect(() => {
      const fetchInitialForecast = async () => {
        try {

       if (auth.token?.user.id) {
            // //Récupérer la ville de l'utilisateur
            const response = await customFetch.get(`/adresses?user.id=${auth.token?.user.id}`, {
              headers: { Authorization: `Bearer ${auth.token?.token}` },
            });
            setAdresse(response.data);
    //faire la boucle pour chaque adresse et récuperer le name
        setAdresse(response.data);
            const addressNames = response.data.member.map((adresse: any) => adresse.name);
            const weatherPromises = addressNames.map((name: string) =>
              axios.get(`http://localhost:8000/api/weather/${name}`, {
                headers: { Authorization: `Bearer ${auth.token.token}` },
              })
            );

            const weatherResponses = await Promise.all(weatherPromises);
            const weatherData = weatherResponses.map((response) => response.data);
            const citiesWeather = weatherData.map((data) => data.city);

        

            const citiesWeatherPromises = citiesWeather.map((city: string) =>
              axios.get(`http://localhost:8000/api/weather/${city}`, {
                headers: { Authorization: `Bearer ${auth.token.token}` },
              })
            );

            const citiesWeatherResponses = await Promise.all(citiesWeatherPromises);
            const citiesWeatherData = citiesWeatherResponses.map((response) => response.data);

            console.log(citiesWeatherData);
  
  
        }
        

        /************************************ */
          const weatherResponse = await axios.get(
            `http://localhost:8000/api/forecast/2984113`,
            {
              headers: { Authorization: `Bearer ${auth.token.token}` },
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

      };
      fetchInitialForecast();
    }, []);

    return (<div className="app">

        {error && <p className="error-message">{error}</p>}

        {forecast && (
          <div className="forecast-container">
            <h2>Prévisions méteo de la ville de {city} pour - 7 prochains jours.</h2>
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

        <div className="adresses">
          <h2> Mes adresses</h2>
          {adresses?.member?.length > 0 && adresses?.member?.map((adresse: any) => (
            <div key={adresse.id} className="adresse">
              <p>{adresse.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
export default MesAdresse;
