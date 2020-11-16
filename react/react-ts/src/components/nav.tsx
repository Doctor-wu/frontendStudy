import React from "react";
import { NavLink } from "react-router-dom";
import "../style/nav.scss";


const Nav = () => {
  return (
    <div className="top_Nav_box">
      <div className="iconfont icon-menu"></div>
      <div className="nav_box">
        <NavLink to="/user">我的</NavLink>
        <NavLink to="/find">发现</NavLink>
        <NavLink to="/cloud">云村</NavLink>
        <NavLink to="/video">视频</NavLink>
      </div>
      <NavLink className="iconfont" to="/search">
        <div className="iconfont icon-search"></div>
      </NavLink>
    </div>
  );
};

export default Nav;
