import "./weather.css";
import useWeather from "./useWeather";
import SearchAdress from "../Adresse/SearchAdress";
import AdresseForm from "../Adresse/AdresseForm";
import { useAuth } from "../../auth/AuthContext";

const App = () => {
  const auth = useAuth();
  const { data: weadtherReims, isError, isLoading, error } = useWeather();

  {
    isLoading && <p>Chargement...</p>;
  }

  {
    isError && <p className="error-message">{error.message}</p>;
  }

  return (
    <div>
    {auth.token?.token && <SearchAdress />}
      <div className="weadtherReims">
        {weadtherReims && (
          <div className="weadtherReims-info">
            <h1>Météo actuelle de la ville de {weadtherReims.city}</h1>
            <p>Température : {weadtherReims.temperature}°C</p>
            <p>Météo : {weadtherReims.description}</p>
            {/* <p>Humidité : {weadtherReims.main.humidity}%</p> */}
            <p>Vent : {weadtherReims.windSpeed} km/h</p>
          </div>
        )}
      </div>

      {auth.token?.token && <AdresseForm />}
    </div>
  );
};

export default App;
