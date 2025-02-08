import { useState } from "react";
import { useAuth } from "../../auth/AuthContext"
import { customFetch } from "../../service/api-client";
import { Weather } from "../wheather/useWeather";

interface Adresse {
    "@context": "string",
    "@id": "string",
    "@type": "string",
    city: string,
    label: string,
    postcode: string,
    street: string,
    housenumber: string,
    context: string,
    distance: string
}

const SearchAdress = () => {

const auth = useAuth();
const [adresse, setAdresse] = useState("");
const [data, setData] = useState("VILLE");
const [weather, setWeather] = useState(null as Weather | null);
const [error, setError] = useState<string | null>(null);



const fetchWeather = async () => {
  if (!adresse) {
    setError("Veuillez entrer une ville.");
    setWeather(null);
    return;
  }
  setError(null);
  try {
    if (data === "ADRESSE") {
      const dataResponse = await customFetch.get<Adresse>(`/search/${adresse}`, {
        headers: { Authorization: `Bearer ${auth.token?.token}` },
      }).then((response) => response.data);
     

      const weatherResponse = await customFetch.get<Weather>(
        `/weather/${dataResponse.city}`,
        {
          headers: { Authorization: `Bearer ${auth.token?.token}` },
        }
      ).then((response) => response.data);
      setWeather(weatherResponse);
      setAdresse("");
    } else {
      const weatherAdresseData = await customFetch.get<Weather>(`/weather/${adresse}`, {
        headers: { Authorization: `Bearer ${auth.token?.token}` },
      }).then((response) => response.data);

      setWeather(weatherAdresseData);
      setAdresse("");
    }
  } catch (err) {
    setError(err.message);
    setWeather(null);
  }
};


  return <>
  
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
        {weather && (
          <div className="weadtherReims">
            <div className="weadtherReims-info">
              <h1>Météo actuelle de la ville de {weather.city}</h1>
              <p>Température : {weather.temperature}°C</p>
              <p>Météo : {weather.description}</p>
              {/* <p>Humidité : {weather.main.humidity}%</p> */}
              <p>Vent : {weather.windSpeed} km/h</p>
            </div>    
          </div>
        )}
  </> 
}

export default SearchAdress


