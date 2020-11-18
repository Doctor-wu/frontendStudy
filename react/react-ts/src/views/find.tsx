import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IState } from "../store/index";
import { IFIndAction } from "../store/reducers/findReducers";
import { getBannerAction } from "../store/actions/find";
import { Carousel, WingBlank } from "antd-mobile";
import "../style/find.scss";
export interface IFindProps {
  bannerList: [];
  dispatch: Dispatch<IFIndAction>;
}

export interface IBanner {
  url: string;
  pic: string;
  bannerId: string;
}
class Find extends Component<IFindProps> {
  state = {
    data: ["1", "2", "3"],
    imgHeight: 176,
  };
  componentDidMount() {
    // simulate img loading
    // setTimeout(() => {
    //   this.setState({
    //     data: [
    //       "AiyWuByWklrrUDlFignR",
    //       "TekJlZRVCjLFexlOCuWn",
    //       "IJOtIlfsYdTyaDTRVrLI",
    //     ],
    //   });
    // }, 100);
    this.props.bannerList.length || this.props.dispatch(getBannerAction());
  }
  render() {
    console.log(this.props);

    let { bannerList } = this.props;
    return (
      <WingBlank>
        <Carousel
          autoplay={true}
          infinite
          className="banner_box"
          beforeChange={(from, to) => {}}
          afterChange={(index) => {}}
        >
          {bannerList.map((banner: IBanner) => (
            <a
              key={banner.bannerId}
              href={banner.url}
              style={{
                display: "inline-block",
                width: "100%",
                height: this.state.imgHeight,
              }}
            >
              <img
                src={banner.pic}
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
