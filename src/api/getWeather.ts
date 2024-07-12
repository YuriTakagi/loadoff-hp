export async function getWeather() {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=35.64329924&longitude=139.60971687&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset&current_weather=true&timezone=Asia/Tokyo",
    );
    const data: WeatherInfo = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data", error);
  }
}
