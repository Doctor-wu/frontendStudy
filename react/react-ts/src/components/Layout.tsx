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
import "../style/layout.scss";

function FullScreenRoute(props: any) {
  return (
    <div className="full_screen_wrap">
      <Route {...props}></Route>
    </div>
  );
}

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
              <FullScreenRoute
                path="/search"
                component={Search}
              ></FullScreenRoute>
              <FullScreenRoute
                path="/login"
                component={Login}
              ></FullScreenRoute>
              <FullScreenRoute
                path="*"
                render={() => <h1>404 Not Found</h1>}
              ></FullScreenRoute>
              {/* <div className="full_screen_wrap">
                <Route path="/search" component={Search}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="*" render={() => <h1>404 Not Found</h1>}></Route>
              </div> */}
            </Switch>
          </div>
        </HashRouter>
      </>
    );
  }
}

export default Layout;
