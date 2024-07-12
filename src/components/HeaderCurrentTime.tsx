import styles from "@components/HeaderCurrentTime.module.css"
import useCurrentTime from "@hooks/useCurrentTime";

function formatTime(date: Date) {
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = String(hours % 12 || 12).padStart(2, "0");
  return `${formattedHours}:${minutes}:${seconds} ${ampm}`;
}

const HeaderCurrentTime = () => {
  const now = useCurrentTime();
  const formattedTime = formatTime(now);

  return (
    <div>
      <p>Soshigaya-okura, Tokyo, JPN</p>
      <p>{formattedTime}</p>
    </div>
  );
};

export default HeaderCurrentTime;