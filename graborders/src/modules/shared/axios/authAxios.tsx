import axios from "axios";
import authToken from "src/modules/auth/authToken";

const authAxios = axios.create({
  // Local link
  // baseURL: "https://nexus-exchange.com/api",

  baseURL: "http://localhost:8084/api",

});

authAxios.interceptors.request.use
  (async function (options) {
    const token = authToken.get();
    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }

    return options;
  });

export default authAxios;
