import React, { Component } from "react";
import { Button, InputItem, List } from "antd-mobile";
import { IProps } from "../index.d";
import { createForm } from "rc-form";
import { getCode, getRegist } from "../api/api";

export const useForm = (Com: any) => {
  return createForm()(Com);
};

@useForm
class Regist extends Component<IProps> {
  regist = () => {
    getRegist(
      this.props.form.getFieldsValue([
        "nickname",
        "phone",
        "captcha",
        "password",
      ])
    ).then((res) => {
      console.log(res);
    });
  };
  getCode = () => {
    getCode(this.props.form.getFieldValue("phone")).then((res) => {
      console.log(res);
    });
  };
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { getFieldProps } = this.props.form;

    return (
      <div>
        <List renderHeader={() => "注册"}>
          <InputItem
            {...getFieldProps("nickname")}
            clear
            placeholder="请输入昵称"
          >
            昵称
          </InputItem>
          <InputItem
            {...getFieldProps("password")}
            clear
            placeholder="请输入密码"
            type="password"
          >
            密码
          </InputItem>
          <InputItem
            {...getFieldProps("phone")}
            clear
            placeholder="请输入手机号码"
          >
            手机号码
          </InputItem>
          <InputItem
            {...getFieldProps("captcha")}
            clear
            placeholder="请输入验证码"
          >
            验证码
          </InputItem>
          <Button type="ghost" onClick={this.getCode}>
            获取验证码
          </Button>
          <Button
            type="primary"
            style={{
              width: "100%",
              color: "#fff",
              textAlign: "center",
              marginTop: "10px",
            }}
            onClick={this.regist}
          >
            注册
          </Button>
        </List>
      </div>
    );
  }
}

export default Regist;
