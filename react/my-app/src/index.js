import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import styles from "./index.module.css";

// import App from "./App";
import ClassComponent from "./components/classComponent";
import FunctionComponent from "./components/functionComponent";
import * as serviceWorker from "./serviceWorker";
import ReduxComponent from "./components/reduxComponent";
import { Provider } from "react-redux";
import { counterStore } from "./store/counter";
import ReactReduxComponent from "./components/reactReduxComponent";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Hook from "./components/Hook";
import UseMemo from "./components/useMemo";
import UseCallback from "./components/useCallback";

// const myName = "Doctorwu";
// const profile = {
//   languages: ["javascript", "typescript"],
//   age: 20,
//   sex: "male",
// };

// const formatter = function (profile) {
//   return (
//     <div>
//       <strong>languages</strong>
//       <ul>
//         {profile.languages.map((language) => (
//           <li key={language}>{language}</li>
//         ))}
//       </ul>
//       <strong>Sex</strong>
//       <ul>
//         <li>{profile.sex}</li>
//       </ul>
//     </div>
//   );
// };

// const childJsx = <div>I am child JSX, {myName}</div>;

const jsx = (
  <React.StrictMode>
    {/* <App /> */}
    <strong>React Router</strong>
    <br />
    <Router>
      <Link to="/ClassComponent">ClassComponent</Link>
      <br />
      <Link to="/FunctionComponent">FunctionComponent</Link>
      <br />
      <Link to="/ReduxComponent">ReduxComponent</Link>
      <br />
      <Link to="/ReactReduxComponent">ReactReduxComponent</Link>
      <br />
      <Link to="/Hook">Hook</Link>
      <br />
      <Link to="/UseMemo">useMemo</Link>
      <br />
      <Link to="/UseCallback">useCallback</Link>
      <br />
      <hr />
      <Switch>
        <Route path="/ClassComponent" component={ClassComponent} />
        <Route path="/FunctionComponent" render={() => <FunctionComponent />} />
        {/* 渲染优先级: children>component>render */}
        {/* 如果有路径重合, 则所有符合的组件都会渲染，除非设置exact或在外层嵌套Switch */}
        {/* <Route path="/ReduxComponent" children={() => <ReduxComponent/>} // children 无论如何都会渲染 */}
        <Route path="/ReduxComponent" render={() => <ReduxComponent />} />
        <Route path="/ReactReduxComponent" component={ReactReduxComponent} />
        <Route path="/Hook" component={Hook} />
        <Route path="/UseMemo" component={UseMemo} />
        <Route path="/UseCallback" component={UseCallback} />
      </Switch>
    </Router>
    {/* <ClassComponent />
    <FunctionComponent />
    <ReduxComponent />
    <ReactReduxComponent /> */}
  </React.StrictMode>
  //   <div>
  //     <h2 className={styles.name}>My name is {myName}</h2>
  //     {formatter(profile)}
  //     <h3>
  //       {myName}是{profile.sex === "male" ? "男" : "女"}的
  //     </h3>
  //     <hr />
  //     {childJsx}
  //   </div>
);

ReactDOM.render(
  <Provider store={counterStore}>{jsx}</Provider>,
  document.getElementById("root")
);

counterStore.subscribe(() => {
  ReactDOM.render(
    <Provider store={counterStore}>{jsx}</Provider>,
    document.getElementById("root")
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
