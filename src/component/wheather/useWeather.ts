import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../../service/api-client";

export interface Weather {
    context: string,
    id: string,
    type: string,
    windSpeed: string,
    temperature: string,
    city: string,
    icon: string,
    description: string
  }
  

const useWeather = () => {

 const fetchWeather = () => customFetch.get<Weather>(`/weather/Reims`).then((response) => response.data)
 
 return useQuery<Weather, Error>(
        {
          queryKey: ["weather-reims"],
          queryFn: fetchWeather,
        },
      );
}

export default useWeather;