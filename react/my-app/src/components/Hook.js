import React, { useState, useEffect } from "react";
import useClock from "./customHook";

const Hook = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("count effect", count);
  }, [count]);

  return (
    <div>
      <strong>Hook</strong>
      <br />
      <em>counter: {count}</em>&nbsp;&nbsp;
      <button onClick={() => setCount(count + 1)}>ADD</button>&nbsp;&nbsp;
      <button onClick={() => setCount(count - 1)}>MINUS</button>
      <br />
      <strong>customHook</strong>
      <br />
      <em>time: {useClock().toLocaleTimeString()}</em>
    </div>
  );
};

Hook.propTypes = {};

export default Hook;
