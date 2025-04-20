import axios from "axios";

const api = axios.create({
  headers: {
    Accept: "application/json, text/plain",
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: 'Basic ' + btoa("marina:Wtqd 7KQE tEdv jQj7 mMjb MmvT")
  },
  baseURL: "https://westbalkanguide.com/wp-json/wp/v2",// window.env.REACT_APP_BASE_URL_API,
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});

export default api;
