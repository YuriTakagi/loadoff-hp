import useCurrentTime from "@hooks/useCurrentTime";

const FullCurrentTime = ({ className }: { className?: string }) => {
  const now = useCurrentTime();
  function formatTime(date: Date) {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = hours.toString().padStart(2, "0");

    return `${formattedHours}:${minutes}:${seconds} ${ampm}`;
  }

  return <span className={className}>{formatTime(now)}</span>;
};

export default FullCurrentTime;
