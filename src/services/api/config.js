import axios from "axios";
import { ENV } from '@Constants';
import { HandleAPIErrorPayload } from "./handler";

const API = axios.create({
    baseURL: ENV.baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use(
    (config) => {
        ////ebugger
        return config;
    },
    function (err) {
        // handle error
        return Promise.reject(err);
    }
);

API.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        HandleAPIErrorPayload(error);
        return Promise.reject(error);
    }
);

export { API };
