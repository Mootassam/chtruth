import axios from "axios";
import authToken from "src/modules/auth/authToken";

const authAxios = axios.create({
  // VPS
  //  link
   baseURL: "http://159.198.77.158:8084/api",
  
  // Local link
  //  baseURL: "http://159.198.77.158:8084/api",

});

authAxios.interceptors.request.use(async function (options) {
  const token = authToken.get();
  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  return options;
});

export default authAxios;
