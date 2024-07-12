const TemperatureMeter = () => {
  // TODO: SSRでweatherInfoを取得する
  const weatherInfo = {
    latitude: 35.65,
    longitude: 139.625,
    generationtime_ms: 0.12505054473876953,
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
      time: "2024-07-11T10:00",
      interval: 900,
      temperature: 26.5,
      windspeed: 6.9,
      winddirection: 223,
      is_day: 1,
      weathercode: 51,
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
        "2024-07-11",
        "2024-07-12",
        "2024-07-13",
        "2024-07-14",
        "2024-07-15",
        "2024-07-16",
        "2024-07-17",
      ],
      temperature_2m_max: [28.6, 26.1, 29.2, 28.8, 29, 25.2, 30.4],
      temperature_2m_min: [24.5, 23, 22, 23.3, 24.6, 23.3, 22.9],
      weathercode: [61, 63, 61, 61, 95, 95, 3],
      sunrise: [
        "2024-07-11T04:34",
        "2024-07-12T04:35",
        "2024-07-13T04:36",
        "2024-07-14T04:36",
        "2024-07-15T04:37",
        "2024-07-16T04:38",
        "2024-07-17T04:38",
      ],
      sunset: [
        "2024-07-11T18:59",
        "2024-07-12T18:58",
        "2024-07-13T18:58",
        "2024-07-14T18:58",
        "2024-07-15T18:57",
        "2024-07-16T18:57",
        "2024-07-17T18:56",
      ],
    },
  };

  function calculateTemperatureRatio(
    currentTemp: number,
    minTemp: number,
    maxTemp: number,
  ) {
    const ratio = (currentTemp - minTemp) / (maxTemp - minTemp);
    return ratio * 10;
  }

  function renderTemperatureMeter() {
    if (!weatherInfo) return null;
    const currentTemp = Math.round(weatherInfo.current_weather.temperature);
    const maxTemp = Math.round(weatherInfo.daily.temperature_2m_max[0]);
    const minTemp = Math.round(weatherInfo.daily.temperature_2m_min[0]);
    const tempRatio = calculateTemperatureRatio(currentTemp, minTemp, maxTemp);
    const paths = [
      { ratio: 1, color: "#B3B3B3", id: 0 },
      { ratio: 2, color: "#B3B3B3", id: 1 },
      { ratio: 3, color: "#B3B3B3", id: 2 },
      { ratio: 4, color: "#B3B3B3", id: 3 },
      { ratio: 5, color: "#B3B3B3", id: 4 },
      { ratio: 6, color: "#B3B3B3", id: 5 },
      { ratio: 7, color: "#B3B3B3", id: 6 },
      { ratio: 8, color: "#B3B3B3", id: 7 },
      { ratio: 9, color: "#B3B3B3", id: 8 },
      { ratio: 10, color: "#B3B3B3", id: 9 },
    ];

    return (
      <svg
        id="meter-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="91"
        height="71"
        viewBox="0 0 91 71"
        fill="none"
      >
        <title>Temperature meter</title>
        <g clipPath="url(#clip0_201_30)">
          {paths.map((path) => (
            <path
              key={path.id}
              d={
                [
                  "M1.63589 69.3565H18.5184",
                  "M3.02097 55.288L19.5436 58.8161",
                  "M7.28525 41.8111L22.7173 48.7139",
                  "M14.2542 29.5286L27.9085 39.4992",
                  "M23.6007 18.9662L34.8993 31.5665",
                  "M34.943 10.5843L43.3842 25.2773",
                  "M47.7575 4.75525L52.9815 20.8836",
                  "M61.5101 1.73117L63.2768 18.6046",
                  "M75.5789 1.64352L73.823 18.517",
                  "M89.3641 4.50323L84.151 20.6316",
                ][path.id]
              }
              stroke={tempRatio >= path.ratio ? "#545454" : path.color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </g>
        <defs>
          <clipPath id="clip0_201_30">
            <rect width="91" height="71" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  if (!weatherInfo) {
    return null;
  }

  return (
    <div>
      <div>
        <div>{Math.round(weatherInfo?.current_weather.temperature)}°</div>
        <div>{renderTemperatureMeter()}</div>
        <div>
          <div>{Math.round(weatherInfo?.daily.temperature_2m_max[0])}°</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="18"
            viewBox="0 0 24 18"
            fill="none"
          >
            <title>日照時間</title>
            <path
              opacity="0.9"
              d="M0.509521 16.5392L23.2913 0.587219"
              stroke="#444444"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>{Math.round(weatherInfo?.daily.temperature_2m_min[0])}°</div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureMeter;
