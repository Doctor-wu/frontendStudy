import React, { Component } from "react";
import {
  HashRouter,
  Redirect,
  Route,
  // Link,
  Switch,
  // Redirect
} from "react-router-dom";
import Find from "../views/find";
import User from "../views/user";
import Cloud from "../views/cloud";
import Video from "../views/video";
import Login from "../views/Login";
import ProtectRoute from "../components/ProtectRoute";

class Layout extends Component {
  render() {
    return (
      <>
        <HashRouter>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <Redirect to="/find"></Redirect>}
            ></Route>
            <ProtectRoute path="/user" component={User}></ProtectRoute>
            <Route path="/find" component={Find}></Route>
            <Route path="/video" component={Video}></Route>
            <Route path="/cloud" component={Cloud}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="*" render={() => <h1>404 Not Found</h1>}></Route>
          </Switch>
        </HashRouter>
      </>
    );
  }
}

export default Layout;
