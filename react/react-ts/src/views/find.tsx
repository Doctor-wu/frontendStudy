import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IState } from "../store/index";
import { IFIndAction } from "../store/reducers/findReducers";

export interface IFindProps {
  bannerList: [];
  dispatch: Dispatch<IFIndAction>;
}
class Find extends Component<IFindProps> {
  render() {
    console.log(this.props.bannerList);

    return <div>Find Index</div>;
  }
}

export default connect(
  (state: IState) => {
    return {
      bannerList: state.find.bannerList,
    };
  },
  (dispatch: Dispatch<IFIndAction>) => {
    return { dispatch };
  }
)(Find);
