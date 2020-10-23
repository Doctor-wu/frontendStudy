import React, { useState, useEffect } from "react";

const Hook = () => {
  const [count, setCount] = useState(0);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    console.log("count effect", count);
  }, [count]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <strong>Hook</strong>
      <br />
      <em>counter: {count}</em>&nbsp;&nbsp;
      <button onClick={() => setCount(count + 1)}>ADD</button>&nbsp;&nbsp;
      <button onClick={() => setCount(count - 1)}>MINUS</button>
      <br />
      <em>time: {date.toLocaleTimeString()}</em>
    </div>
  );
};

Hook.propTypes = {};

export default Hook;
