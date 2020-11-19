import {
  $get,
  //   $post,
} from "./http";

export const getBanner = (data: any) => {
  return $get("/banner", data);
};

export const getCode = (phone: string) => {
  return $get(`/captcha/sent`, { phone });
};

export const getRegist = (data: any) => {
  return $get(`/register/cellphone`, data);
};
