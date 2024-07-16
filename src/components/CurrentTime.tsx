import useCurrentTime from "@hooks/useCurrentTime";
import styles from "@components/CurrentTime.module.css";

const CurrentTime = () => {
  const now = useCurrentTime();
  const timeInJapan = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }),
  );

  const formattedTime = timeInJapan.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  function addOrdinalSuffix(date: Date) {
    const day = date.getDate();
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  }

  const dayWithSuffix = addOrdinalSuffix(timeInJapan);
  const formattedFullDate = `${timeInJapan.toLocaleDateString("en-US", { weekday: "long" })}, ${timeInJapan.toLocaleDateString("en-US", { month: "long" })} ${dayWithSuffix}`;

  return (
    <div className={styles.clock}>
      <div className={styles.currentTime}>{formattedTime}</div>
      <div className={styles.date}>
        <span className={styles.today}>Today</span>
        {formattedFullDate}
      </div>
    </div>
  );
};

export default CurrentTime;
