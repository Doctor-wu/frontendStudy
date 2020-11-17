function toQuery(obj: any) {
  let str = "?";
  for (const k of Object.keys(obj)) {
    str += `${k}=${obj[k]}&`;
  }
  
  str = str.slice(0,-1);
  return str;
}

export interface IHttpOption {
  method?: "GET" | "POST" | "get" | "post";
  data?: {};
  headers?: {};
}

export const http = (url: string, option: IHttpOption) => {
  const { method = "GET", data = {}, headers = {} } = option || {};

  let isGet = method.toUpperCase() === "GET";

  let params = {
    method,
    body: isGet ? undefined : JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (isGet) {
    url += toQuery(data);
  }

  return fetch(url, params).then((res) => res.json());
};

export const $get = function (url: string, data?: any) {
  return http(url, {
    method: "GET",
    data,
  });
};

export const $post = function (url: string, data?: any) {
  return http(url, {
    method: "POST",
    data,
  });
};
