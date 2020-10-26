import React, { useState, useCallback, Component } from "react";

const UseCallback = () => {
  const [price, setPrice] = useState(0);
  const [value, setValue] = useState("");

  const addPrice = () => {
    console.log("addPrice");
    let sum = 0;
    for (let i = 0; i <= price; i++) {
      sum += i;
    }
    return sum;
  };

  return (
    <div>
      <strong>UseCallback</strong>
      <br />
      <em>price: {price}</em>
      <br />
      <button onClick={() => setPrice(price + 1)}>add</button>
      <br />
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <br />
      <Child addPrice={addPrice}></Child>
    </div>
  );
};

class Child extends Component {
  render() {
    return (
      <div>
        <strong>Child</strong>
        <button onClick={() => console.log(this.props.addPrice())}>add</button>
      </div>
    );
  }
}

export default UseCallback;
