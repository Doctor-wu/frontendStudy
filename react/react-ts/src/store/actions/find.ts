import {getBanner} from "../../api/api";
import {Dispatch} from "redux";
import {actionTypes} from "../reducers/types";

export const getBannerAction: () => any = () =>
    (dispatch: Dispatch) => getBanner({type: 2})
        .then((res: any) => {
          console.log(res);
          dispatch({type: actionTypes.SETBANNERLIST, list: res.banners});
        });
