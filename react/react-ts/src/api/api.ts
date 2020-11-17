import {
  $get,
  //  $post
} from "./http";

export const getBanner = (data: any) => {
  return $get("/banner", data);
};
