import { useEffect, useRef } from "react";

const SunshineGraph = ({ weatherInfo }: { weatherInfo: WeatherInfo }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const now = new Date();
  const sunriseDate = new Date(weatherInfo.daily.sunrise[0]);
  const sunsetDate = new Date(weatherInfo.daily.sunset[0]);
  const solarNoon = new Date(
    (sunriseDate.getTime() + sunsetDate.getTime()) / 2,
  );
  const segments = calculateSegmentTimes(sunriseDate, solarNoon, sunsetDate);
  const currentSegment = getCurrentSegment(now, segments);

  function formatTime(timeString: string): string {
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
  }

  function calculateSegmentTimes(
    sunriseDate: Date,
    solarNoon: Date,
    sunsetDate: Date,
  ) {
    const segments: { [key: number]: Date } = {};

    // 0:00~日の出まで
    const startOfDay = new Date(sunriseDate);
    startOfDay.setHours(0, 0, 0, 0);
    const timeUntilSunrise = sunriseDate.getTime() - startOfDay.getTime();
    const segmentDuration1 = timeUntilSunrise / 5;
    for (let i = 1; i <= 5; i++) {
      segments[i] = new Date(startOfDay.getTime() + segmentDuration1 * i);
    }

    // 日の出から南中まで
    const timeUntilNoon = solarNoon.getTime() - sunriseDate.getTime();
    const segmentDuration2 = timeUntilNoon / 7;
    for (let i = 6; i <= 12; i++) {
      segments[i] = new Date(
        sunriseDate.getTime() + segmentDuration2 * (i - 5),
      );
    }

    // 南中から日の入りまで
    const timeUntilSunset = sunsetDate.getTime() - solarNoon.getTime();
    const segmentDuration3 = timeUntilSunset / 7;
    for (let i = 13; i <= 19; i++) {
      segments[i] = new Date(solarNoon.getTime() + segmentDuration3 * (i - 12));
    }

    // 日の入りから真夜中まで
    const endOfDay = new Date(sunsetDate);
    endOfDay.setHours(23, 59, 59, 999);
    const timeUntilEndOfDay = endOfDay.getTime() - sunsetDate.getTime();
    const segmentDuration4 = timeUntilEndOfDay / 4;
    for (let i = 20; i <= 23; i++) {
      segments[i] = new Date(
        sunsetDate.getTime() + segmentDuration4 * (i - 19),
      );
    }

    return segments;
  }

  function getCurrentSegment(now: Date, segments: { [key: number]: Date }) {
    for (let key = 23; key >= 1; key--) {
      if (now >= segments[key]) {
        return key;
      }
    }
    return 1;
  }

  useEffect(() => {
    if (svgRef.current) {
      const svg = svgRef.current;
      const path = svg.querySelector("#sunshine-path") as SVGPathElement;

      if (path) {
        const length = path.getTotalLength();
        const position = path.getPointAtLength((length / 24) * currentSegment);
        const icon = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "use",
        );
        icon.setAttributeNS(null, "href", "#vector-icon");
        icon.setAttributeNS(null, "x", (position.x - 13).toString());
        icon.setAttributeNS(null, "y", (position.y + 26).toString());
        icon.setAttributeNS(null, "width", "26");
        icon.setAttributeNS(null, "height", "26");

        svg.appendChild(icon);
      }
    }
  }, [currentSegment]);

  return (
    <svg
      id="sunshine-graph"
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      // viewBox="0 0 364.49 124.87"
      viewBox="0 0 364.49 164.87"
    >
      <title id="sunshineGraphTitle">Sunshine Graph</title>
      <defs>
        <clipPath id="clippath">
          <rect
            width="364.49"
            height="124.87"
            style={{ fill: "none", strokeWidth: "0px" }}
          />
        </clipPath>
        <radialGradient
          id="paint0_radial_201_54"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(182.25 56.3189) rotate(180) scale(134.01 159.472)"
        >
          <stop offset="0.28" stopColor="white" />
          <stop offset="0.31" stopColor="white" />
          <stop offset="0.44" stopColor="white" />
          <stop offset="0.76" stopColor="#666666" />
          <stop offset="0.9" stopColor="#666666" />
        </radialGradient>
        <symbol id="vector-icon">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", left: 0, top: 0 }}
          >
            <title id="vectorIconTitle">Vector Icon</title>
            <g id="Vector" opacity="0.9" filter="url(#filter0_d_1_77)">
              <path
                d="M13.3126 19.5058C17.1197 19.5058 20.2059 16.4195 20.2059 12.6124C20.2059 8.80532 17.1197 5.71906 13.3126 5.71906C9.50546 5.71906 6.41919 8.80532 6.41919 12.6124C6.41919 16.4195 9.50546 19.5058 13.3126 19.5058Z"
                stroke="var(--weather-graph-color)"
                strokeWidth="2"
                strokeMiterlimit="10"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_1_77"
                x="0.85499"
                y="0.154855"
                width="24.9151"
                height="24.9151"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="2.2821" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.329412 0 0 0 0 0.329412 0 0 0 0 0.329412 0 0 0 0.7 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_1_77"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_1_77"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </symbol>
      </defs>
      <g style={{ clipPath: "url(#clippath)", transform: "translateY(39px)" }}>
        <path
          id="sunshine-path"
          d="M1 110.81C15.45 111.3 20.72 111.05 30.42 108.78C38.37 106.93 46 103.13 56.02 94.98C72.66 81.44 76.44 71.72 92.87 52.42C100.5 43.45 112.06 29.86 127.39 18.61C138.34 10.58 155.93 1 182.24 1C208.56 1 226.15 10.58 237.1 18.61C252.42 29.85 263.99 43.44 271.62 52.42C288.05 71.73 291.83 81.45 308.47 94.98C318.49 103.13 326.12 106.93 334.07 108.78C343.78 111.04 348.64 111.3 363.49 110.81"
          style={{
            fill: "none",
            stroke: "url(#paint0_radial_201_54)",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2px",
          }}
        />
        <path
          d="M1,69.01h362.49"
          style={{
            fill: "none",
            isolation: "isolate",
            opacity: ".9",
            stroke: "var(--weather-graph-color)",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }}
        />
        <g style={{ opacity: ".9" }}>
          <path
            d="M31.91,37.53v2.74M31.91,16.83v2.74M27.42,36.33l-1.37,2.37M27.42,20.77l-1.37-2.37M21.76,34.41l2.37-1.37M24.13,24.06l-2.37-1.37M22.93,28.55h-2.74"
            style={{
              fill: "none",
              stroke: "var(--weather-graph-color)",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }}
          />
          <path
            d="M31.91,22.4c-3.4,0-6.15,2.76-6.15,6.15s2.76,6.15,6.15,6.15"
            style={{
              fill: "none",
              stroke: "var(--weather-graph-color)",
              strokeMiterlimit: 10,
            }}
          />
          <path
            d="M38.39,22.63v13.46"
            style={{
              fill: "none",
              stroke: "var(--weather-graph-color)",
              strokeLinecap: "round",
              strokeMiterlimit: 10,
            }}
          />
          <path
            d="M35.02,24.82l3.01-3.01.41-.41c.2.2.41.41.41.41l3,3.01"
            style={{
              fill: "none",
              stroke: "var(--weather-graph-color)",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }}
          />
        </g>
        <text fontSize="12" x="45" y="33" fill="var(--weather-graph-color)">
          {weatherInfo ? formatTime(weatherInfo.daily.sunrise[0]) : ""}
        </text>
        <g style={{ opacity: ".9" }}>
          <path
            d="M286.51,37.38v2.74M286.51,16.68v2.74M282.02,36.17l-1.37,2.37M282.02,20.62l-1.37-2.37M276.36,34.25l2.37-1.37M278.73,23.91l-2.37-1.37M277.53,28.4h-2.74"
            style={{
              fill: "none",
              stroke: "var(--weather-graph-color)",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }}
          />
          <path
            d="M286.51,22.24c-3.4,0-6.15,2.76-6.15,6.15s2.76,6.15,6.15,6.15"
            style={{
              fill: "none",
              stroke: "var(--weather-graph-color)",
              strokeMiterlimit: 10,
            }}
          />
          <path
            d="M293.07,34.7v-13.46"
            style={{
              fill: "none",
              stroke: "var(--weather-graph-color)",
              strokeLinecap: "round",
              strokeMiterlimit: 10,
            }}
          />
          <path
            d="M296.44,32.51l-3.01,3.01-.41.41c-.2-.2-.41-.41-.41-.41l-3.01-3"
            style={{
              fill: "none",
              stroke: "var(--weather-graph-color)",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }}
          />
        </g>
        <text fontSize="12" x="300" y="33" fill="var(--weather-graph-color)">
          {weatherInfo ? formatTime(weatherInfo.daily.sunset[0]) : ""}
        </text>
      </g>
    </svg>
  );
};

export default SunshineGraph;
