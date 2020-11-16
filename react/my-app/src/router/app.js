import React, { Component } from "react";
import ReactDom from "react-dom";
import {
  BrowserRouter,
  HashRouter,
  Route,
  Link,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "./components/home";
import List from "./components/list";
// BrowserRouter 相当于 Vue-Router的history模式
// HashRouter相当于Vue-Router的hash模式
// Route相当于Vue-Router的router-view
// Link相当于Vue-Router的router-link

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Link to="/home">Home</Link>
            <br />
            <Link to="/list">List</Link>
          </div>
          <Switch>
              {/* 用Switch套起来后，当上面有一个Path可以匹配上的时候，下面的Route就不再查看了 */}
            <Route path="/" exact render={() => <Redirect to="/home"></Redirect>}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/list" component={List}></Route>
            <Route path="*" component={() => <h1>404 Not Found</h1>}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

ReactDom.render(<App />, document.querySelector("#root"));
