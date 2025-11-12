// auth context example
import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [credentials, setCredentials] = useState(null);

  const login = async (username, password) => {
    // optional: verify creds with a small test request
    const authHeader = "Basic " + btoa(`${username}:${password}`);
    const resp = await axios.get(
      "https://westbalkanguide.com/wp-json/jwt-auth/v1",
      {
        headers: { Authorization: authHeader },
      }
    );

    if (resp.status === 200) setCredentials({ username, password });
    else throw new Error("Invalid login");
  };

  const logout = () => setCredentials(null);

  const api = axios.create({
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=UTF-8",
      // Authorization: 'Basic ' + btoa("marina:Wtqd 7KQE tEdv jQj7 mMjb MmvT")
      //   Authorization: "Basic " + btoa("tomislav:tomislav wp 2k24!"),
      Authorization:
        "Basic " + btoa(`${credentials.username}:${credentials.password}`),
    },
    baseURL: "https://westbalkanguide.com/wp-json/wp/v2", // window.env.REACT_APP_BASE_URL_API,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });

  //   const apiLogin = axios.create({
  //     headers: {
  //       Accept: "application/json, text/plain",
  //       "Content-Type": "application/json;charset=UTF-8",
  //       // Authorization: 'Basic ' + btoa("marina:Wtqd 7KQE tEdv jQj7 mMjb MmvT")
  //       Authorization: "Basic " + btoa("tomislav:tomislav wp 2k24!"),
  //     },
  //     baseURL: "https://westbalkanguide.com/wp-json/jwt-auth/v1", // window.env.REACT_APP_BASE_URL_API,
  //     maxContentLength: Infinity,
  //     maxBodyLength: Infinity,
  //   });

  return (
    <AuthContext.Provider
      value={{ login, logout, api, loggedIn: !!credentials }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
