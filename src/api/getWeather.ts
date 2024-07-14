export async function getWeather() {
  try {
    // TODO: apiを叩かないように一時的に定数化、後で元に戻す
    // const response = await fetch(
    //   "https://api.open-meteo.com/v1/forecast?latitude=35.64329924&longitude=139.60971687&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset&current_weather=true&timezone=Asia/Tokyo",
    // );
    // const data: WeatherInfo = await response.json();
    const data: WeatherInfo = {
      latitude: 35.65,
      longitude: 139.625,
      generationtime_ms: 0.10800361633300781,
      utc_offset_seconds: 32400,
      timezone: "Asia/Tokyo",
      timezone_abbreviation: "JST",
      elevation: 46,
      current_weather_units: {
        time: "iso8601",
        interval: "seconds",
        temperature: "°C",
        windspeed: "km/h",
        winddirection: "°",
        is_day: "",
        weathercode: "wmo code",
      },
      current_weather: {
        time: "2024-07-14T10:30",
        interval: 900,
        temperature: 25.1,
        windspeed: 7,
        winddirection: 111,
        is_day: 1,
        weathercode: 55,
      },
      daily_units: {
        time: "iso8601",
        temperature_2m_max: "°C",
        temperature_2m_min: "°C",
        weathercode: "wmo code",
        sunrise: "iso8601",
        sunset: "iso8601",
      },
      daily: {
        time: [
          "2024-07-14",
          "2024-07-15",
          "2024-07-16",
          "2024-07-17",
          "2024-07-18",
          "2024-07-19",
          "2024-07-20",
        ],
        temperature_2m_max: [26, 27, 28.4, 30.2, 30.7, 32.5, 33.2],
        temperature_2m_min: [23, 21.8, 22.1, 24.2, 25, 25, 25.9],
        weathercode: [63, 53, 3, 3, 3, 3, 3],
        sunrise: [
          "2024-07-14T04:36",
          "2024-07-15T04:37",
          "2024-07-16T04:38",
          "2024-07-17T04:38",
          "2024-07-18T04:39",
          "2024-07-19T04:40",
          "2024-07-20T04:40",
        ],
        sunset: [
          "2024-07-14T18:58",
          "2024-07-15T18:57",
          "2024-07-16T18:57",
          "2024-07-17T18:56",
          "2024-07-18T18:56",
          "2024-07-19T18:55",
          "2024-07-20T18:54",
        ],
      },
    };
    const now = new Date();
    const sunrise = new Date(data.daily.sunrise[0]);
    const sunset = new Date(data.daily.sunset[0]);
    const theme: Theme = now >= sunrise && now < sunset ? "day" : "night";
    // const theme: Theme = now >= sunrise && now < sunset ? "night" : "day";
    console.log("weather data fetched");
    return { data, theme };
  } catch (error) {
    console.error("Error fetching weather data", error);
  }
}
