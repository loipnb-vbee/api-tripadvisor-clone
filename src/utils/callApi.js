const axios = require("axios");
const camelCaseKeys = require("camelcase-keys");
const uuid = require("uuid");

const axiosInstance = axios.create({
  responseType: "json",
  timeout: 10 * 1000,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.id = uuid.v4();
    const originalUrl = config.baseURL
      ? `${config.baseURL}${config.url}`
      : config.url;
    console.log(
      `[${config.id}] ${config.method.toUpperCase()} - ${originalUrl}`
    );
    return config;
  },
  (error) =>
    // Do something with request error
    Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const blackList = [];
    const { config } = response;
    const originalUrl = config.baseURL
      ? `${config.baseURL}${config.url}`
      : config.url;
    const isShowData = !blackList.includes(
      `${response.config.method.toUpperCase()} - ${originalUrl}`
    );
    // Do something with response data
    return camelCaseKeys(response.data, { deep: true });
  },
  (error) => {
    // Do something with response error
    const { config, response, message, stack } = error;

    if (response) {
      const { data } = response;
      const isShowData = !(
        data &&
        typeof data === "string" &&
        data.match("<!DOCTYPE html>")
      );
    
    } else {
        console.log('error');
    }

    return Promise.reject(error);
  }
);

module.exports = axiosInstance;
