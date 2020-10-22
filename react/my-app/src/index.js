import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import styles from "./index.module.css";

// import App from "./App";
import * as serviceWorker from "./serviceWorker";

const myName = "Doctorwu";
const profile = {
  languages: ["javascript", "typescript"],
  age: 20,
  sex: "male",
};

const formatter = function (profile) {
  return (
    <div>
      <strong>languages</strong>
      <ul>
        {profile.languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <strong>Sex</strong>
      <ul>
        <li>{profile.sex}</li>
      </ul>
    </div>
  );
};

const childJsx = <div>I am child JSX, {myName}</div>;

const jsx = (
  //   <React.StrictMode>
  //     <App />
  //   </React.StrictMode>
  <div>
    <h2 className={styles.name}>My name is {myName}</h2>
    {formatter(profile)}
    <h3>
      {myName}是{profile.sex === "male" ? "男" : "女"}的
    </h3>
    <hr />
    {childJsx}
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
