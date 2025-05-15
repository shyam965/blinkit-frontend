// import axios from "axios"
// import { baseUrl } from "../endpoint/BaseUrl"

// const Axios =axios.create({
//     baseURL:baseUrl,
//     withCredentials:true

// })
// export default Axios

import axios, { Axios } from "axios";
import { baseUrl } from "../endpoint/BaseUrl";

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const get = (url, params) => instance.get(url, params);
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);
export const deleteuser = (url) => instance.delete(url);

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);


