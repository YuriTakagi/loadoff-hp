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

export const WMO_WEATHER_CODES: WeatherCode[] = [
  { code: 0, description: "sunny" },
  { code: 1, description: "sunny" },
  { code: 2, description: "cloudy" },
  { code: 3, description: "cloudy" },
  { code: 45, description: "fog" },
  { code: 48, description: "fog" },
  { code: 51, description: "rainy" },
  { code: 53, description: "rainy" },
  { code: 55, description: "rainy" },
  { code: 56, description: "rainy" },
  { code: 61, description: "rainy" },
  { code: 63, description: "rainy" },
  { code: 65, description: "rainy" },
  { code: 66, description: "rainy" },
  { code: 67, description: "rainy" },
  { code: 71, description: "snow" },
  { code: 73, description: "snow" },
  { code: 75, description: "snow" },
  { code: 80, description: "rainy" },
  { code: 81, description: "rainy" },
  { code: 82, description: "rainy" },
  { code: 85, description: "snow" },
  { code: 86, description: "snow" },
  { code: 95, description: "thunderstorm" },
  { code: 96, description: "thunderstorm" },
  { code: 99, description: "thunderstorm" },
] as const;
