import React, { Component } from "react";
import { IProps } from "../index.d";
import { Button } from "antd-mobile";

class Login extends Component<IProps> {
  render() {
    return (
      <div>
        <Button
          type="primary"
          onClick={() => this.props.history.push("/regist")}
        >
          注册
        </Button>
      </div>
    );
  }
}

export default Login;
