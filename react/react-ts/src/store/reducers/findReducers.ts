import { actionTypes } from "./types";

export interface IFindState {
  bannerList: [];
  playList: [];
}

export interface IFIndAction {
  type: Symbol;
  [prop: string]: any;
}

let initState: IFindState = {
  bannerList: [],
  playList: [],
};

export default function findReducer(
  state: IFindState = initState,
  action: IFIndAction
): IFindState {
  switch (action.type) {
    case actionTypes.SETPLAYLIST:
      return state;

    case actionTypes.SETBANNERLIST:
      return state;

    default:
      return { ...state };
  }
}
