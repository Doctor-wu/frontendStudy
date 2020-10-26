import React, { useState, useMemo } from "react";

const UseMemo = () => {
  const [price, setPrice] = useState(0);
  const [value, setValue] = useState("");

  const expensive = useMemo(() => {
    // 使用useMemo并且设置price为依赖项，则仅当price发生变化时会重新执行该函数
    // 否则当下方输入框输入导致value变化时，expensive也会重新执行
    console.log("computed");
    let sum = 0;
    for (let i = 0; i < price; i++) {
      sum += i;
    }
    return sum;
  }, [price]);

  return (
    <div>
      <strong>useMemo</strong>
      <br />
      <em>price: {price}</em>
      <br />
      <em>expensive: {expensive}</em>
      <br />
      <button onClick={() => setPrice(price + 1)}>add</button>
      <br />
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
};

export default UseMemo;
