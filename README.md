
# Router
installationde router
```bash
npm i react-router-dom
```










# On cherche id de la ville par nom de la ville
https://api.openweathermap.org/data/2.5/weather?q=Reims&appid=598376d6b5b90d5d074809b11a251ed2
on aura cette réppnse
{
  "coord": {
    "lon": 4.0833,
    "lat": 49.1667
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 267.03,
    "feels_like": 264.34,
    "temp_min": 267.03,
    "temp_max": 267.03,
    "pressure": 1038,
    "humidity": 93,
    "sea_level": 1038,
    "grnd_level": 1019
  },
  "visibility": 10000,
  "wind": {
    "speed": 1.54,
    "deg": 0
  },
  "clouds": {
    "all": 0
  },
  "dt": 1736821803,
  "sys": {
    "type": 1,
    "id": 6553,
    "country": "FR",
    "sunrise": 1736840014,
    "sunset": 1736871089
  },
  "timezone": 3600,
  "id": 2984113,
  "name": "Arrondissement de Reims",
  "cod": 200
}

# on recherche la méteo de 5 prochain jour de cette ville
https://api.openweathermap.org/data/2.5/forecast?id=2984113&appid=598376d6b5b90d5d074809b11a251ed2&units=metric&lang=fr

{
  "cod": "200",
  "message": 0,
  "cnt": 40,
  "list": [
    {
      "dt": 1736823600,
      "main": {
        "temp": -6.12,
        "feels_like": -6.12,
        "temp_min": -6.12,
        "temp_max": -2.55,
        "pressure": 1038,
        "sea_level": 1038,
        "grnd_level": 1019,
        "humidity": 93,
        "temp_kf": -3.57
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "ciel dégagé",
          "icon": "01n"
        }
      ],
      "clouds": {
        "all": 0
      },
      "wind": {
        "speed": 1.16,
        "deg": 67,
        "gust": 1.05
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2025-01-14 03:00:00"
    },
  "city": {
    "id": 2984113,
    "name": "Reims",
    "coord": {
      "lat": 49.1667,
      "lon": 4.0833
    },
    "country": "FR",
    "population": 0,
    "timezone": 3600,
    "sunrise": 1736840014,
    "sunset": 1736871089
  }
}]










