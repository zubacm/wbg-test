import axios from "axios";

const username="tomislav";
const password="tomislav wp 2k24!"

const api = axios.create({
  headers: {
    Accept: "application/json, text/plain",
    "Content-Type": "application/json;charset=UTF-8",
    // Authorization: 'Basic ' + btoa("marina:Wtqd 7KQE tEdv jQj7 mMjb MmvT")
    Authorization: "Basic " + btoa("tomislav:tomislav wp 2k24!"),
  },
  baseURL: "https://westbalkanguide.com/wp-json/wp/v2", // window.env.REACT_APP_BASE_URL_API,
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});

export const api2 = axios.create({
  headers: {
    Accept: "application/json, text/plain",
    "Content-Type": "application/json;charset=UTF-8",
    // Authorization: 'Basic ' + btoa("marina:Wtqd 7KQE tEdv jQj7 mMjb MmvT")
    Authorization: "Basic " + btoa("tomislav:tomislav wp 2k24!"),
  },
  baseURL: "https://westbalkanguide.com/wp-json/jwt-auth/v1", // window.env.REACT_APP_BASE_URL_API,
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});


export const apiCustom = axios.create({
  headers: {
    Accept: "application/json, text/plain",
    "Content-Type": "application/json;charset=UTF-8",
    // Authorization: 'Basic ' + btoa("marina:Wtqd 7KQE tEdv jQj7 mMjb MmvT")
    Authorization: "Basic " + btoa("tomislav:tomislav wp 2k24!"),
  },
  baseURL: "https://westbalkanguide.com/wp-json/custom/v1", // window.env.REACT_APP_BASE_URL_API,
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});

export default api;
