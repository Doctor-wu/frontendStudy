import React from "react";
import { Button } from "antd-mobile";

export interface IUserProps {
  history: any;
  [prop: string]: any;
}

function User(props: IUserProps) {
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
