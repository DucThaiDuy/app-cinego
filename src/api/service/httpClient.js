// service.ts
import axios from "axios";
import { ENV } from "../../../env/env";
const http = axios.create({
    baseURL: ENV.API_URL, // http://localhost:8080/api
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
// ✅ Gắn token
http.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));
// ❌ Không swallow lỗi
http.interceptors.response.use((response) => response, (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
});
// Wrapper
export const service = async (config) => {
    const response = await http.request(config);
    return response.data;
};
