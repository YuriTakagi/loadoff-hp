/*
Code	Description
0	Clear sky
1, 2, 3	Mainly clear, partly cloudy, and overcast
45, 48	Fog and depositing rime fog
51, 53, 55	Drizzle: Light, moderate, and dense intensity
56, 57	Freezing Drizzle: Light and dense intensity
61, 63, 65	Rain: Slight, moderate and heavy intensity
66, 67	Freezing Rain: Light and heavy intensity
71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
77	Snow grains
80, 81, 82	Rain showers: Slight, moderate, and violent
85, 86	Snow showers slight and heavy
95 *	Thunderstorm: Slight or moderate
96, 99 *	Thunderstorm with slight and heavy hail
*/

export const WMO_WEATHER_CODES: WeatherCodeAndImage[] = [
  { code: 0, description: "Sunny", image: "/sunny.svg" },
  { code: 1, description: "Sunny", image: "/sunny.svg" },
  { code: 2, description: "Cloudy", image: "/cloudy.svg" },
  { code: 3, description: "Cloudy", image: "/cloudy.svg" },
  { code: 45, description: "Fog", image: "/fog.svg" },
  { code: 48, description: "Fog", image: "/fog.svg" },
  { code: 51, description: "Rainy", image: "/rainy.svg" },
  { code: 53, description: "Rainy", image: "/rainy.svg" },
  { code: 55, description: "Rainy", image: "/rainy.svg" },
  { code: 56, description: "Rainy", image: "/rainy.svg" },
  { code: 61, description: "Rainy", image: "/rainy.svg" },
  { code: 63, description: "Rainy", image: "/rainy.svg" },
  { code: 65, description: "Rainy", image: "/rainy.svg" },
  { code: 66, description: "Rainy", image: "/rainy.svg" },
  { code: 67, description: "Rainy", image: "/rainy.svg" },
  { code: 71, description: "Snow", image: "/snow.svg" },
  { code: 73, description: "Snow", image: "/snow.svg" },
  { code: 75, description: "Snow", image: "/snow.svg" },
  { code: 80, description: "Rainy", image: "/rainy.svg" },
  { code: 81, description: "Rainy", image: "/rainy.svg" },
  { code: 82, description: "Rainy", image: "/rainy.svg" },
  { code: 85, description: "Snow", image: "/snow.svg" },
  { code: 86, description: "Snow", image: "/snow.svg" },
  { code: 95, description: "Thunderstorm", image: "/thunderstorm.svg" },
  { code: 96, description: "Thunderstorm", image: "/thunderstorm.svg" },
  { code: 99, description: "Thunderstorm", image: "/thunderstorm.svg" },
] as const;
