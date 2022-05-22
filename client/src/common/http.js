import axios from "axios";

console.log(process.env.REACT_APP_BASE_URL);

// 设置axios基础路径
const http = axios.create({
  baseURL: "http://localhost:3001/api/v1",
});

/**
 * 请求拦截器
 */
http.interceptors.request.use(
  (config) => {
    config.headers = {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    };

    return config;
  },
  (error) => {
    return error;
  }
);

/**
 * 响应拦截器
 */
http.interceptors.response.use((res) => {
  return res.data.data;
});

export default http;
