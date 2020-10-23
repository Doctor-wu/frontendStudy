import React, { useState, useEffect } from "react";

const FunctionComponent = (props) => {
  // 相当于componentDidMount, componentDidUpdate, componentWillUnmount的组合
  const [date, setDate] = useState(new Date());
  useEffect(
    () => {
      console.log("useEffect");
      const timer = setInterval(() => {
        setDate(new Date());
      }, 1000);

      return () => clearInterval(timer);
    },
    /* 依赖项 */ []
  );
  return (
    <div>
      <strong>Functional Component</strong><br/>
      {date.toLocaleTimeString()}
    </div>
  );
};

export default FunctionComponent;
