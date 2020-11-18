import React from "react";
import { Button } from "antd-mobile";
import { IProps } from "../index.d";

function User(props: IProps) {
  console.log(props);

  const goLogin = () => {
    props.history.push({
      pathname: "/login",
    });
  };
  return (
    <>
      My Info
      <Button onClick={goLogin} type="primary">
        登录
      </Button>
    </>
  );
}

export default User;
