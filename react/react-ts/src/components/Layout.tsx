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
import Nav from "./nav";
import Search from "../views/search";

class Layout extends Component {
  render() {
    return (
      <>
        <HashRouter>
          <Nav></Nav>
          <div className="route_wrap">
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
              <Route path="/search" component={Search}></Route>
              <Route path="*" render={() => <h1>404 Not Found</h1>}></Route>
            </Switch>
          </div>
        </HashRouter>
      </>
    );
  }
}

export default Layout;
