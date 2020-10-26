import React, { useState, useCallback, PureComponent } from "react";

const UseCallback = () => {
  const [price, setPrice] = useState(0);

  const addPrice = useCallback(() => {
    let sum = 0;
    for (let i = 0; i <= price; i++) {
      sum += i;
    }
    return sum;
  }, [price]);

  const [value, setValue] = useState("");

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

class Child extends PureComponent {
  render() {
    console.log("child render");
    const { addPrice } = this.props;
    return (
      <div>
        <strong>Child</strong>
        <button onClick={() => console.log(addPrice())}>add</button>
      </div>
    );
  }
}

export default UseCallback;
