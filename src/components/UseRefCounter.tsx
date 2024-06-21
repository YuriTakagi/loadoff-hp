import { useRef } from "react";

const UseRefCounter = () => {
  let ref = useRef(0);
  function handleClick() {
    ref.current = ref.current + 1;
    console.log(ref.current);
  }
  return (
    <button type="button" onClick={handleClick}>
      Click!
    </button>
  );
};

export default UseRefCounter;
