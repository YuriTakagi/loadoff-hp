import useCurrentTime from "@hooks/useCurrentTime";

const CurrentTime = () => {
  const now = useCurrentTime();

  return <div>{now}</div>;
};

export default CurrentTime;
