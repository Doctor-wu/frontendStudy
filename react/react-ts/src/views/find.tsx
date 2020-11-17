import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IState } from "../store/index";
import { IFIndAction } from "../store/reducers/findReducers";
import { getBannerAction } from "../store/actions/find";
import { Carousel, WingBlank } from "antd-mobile";

export interface IFindProps {
  bannerList: [];
  dispatch: Dispatch<IFIndAction>;
}
class Find extends Component<IFindProps> {
  state = {
    data: ["1", "2", "3"],
    imgHeight: 176,
  };
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: [
          "AiyWuByWklrrUDlFignR",
          "TekJlZRVCjLFexlOCuWn",
          "IJOtIlfsYdTyaDTRVrLI",
        ],
      });
    }, 100);
    this.props.dispatch(getBannerAction());
  }
  render() {
    return (
      <WingBlank>
        <Carousel
          autoplay={true}
          infinite
          beforeChange={(from, to) =>
            console.log(`slide from ${from} to ${to}`)
          }
          afterChange={(index) => console.log("slide to", index)}
        >
          {this.state.data.map((val) => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{
                display: "inline-block",
                width: "100%",
                height: this.state.imgHeight,
              }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                alt=""
                style={{ width: "100%", verticalAlign: "top" }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event("resize"));
                  this.setState({ imgHeight: "auto" });
                }}
              />
            </a>
          ))}
        </Carousel>
      </WingBlank>
    );
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
