import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectRoute(props: any) {
  let Com = props.component;
  return (
    <Route
      path={props.path}
      render={(params) => {
        let isLogin = true;
        return isLogin ? (
          <Com {...params} />
        ) : (
          <Redirect to="/login"></Redirect>
        );
      }}
    ></Route>
  );
}

export default ProtectRoute;
