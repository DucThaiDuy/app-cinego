// service.ts
import axios, { AxiosRequestConfig } from "axios";
import { ENV } from "../../../env/env";

const http = axios.create({
  baseURL: ENV.API_URL, // http://localhost:8080/api
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Gắn token
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ❌ Xử lý lỗi chung
http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    
    // Nếu token hết hạn hoặc không hợp lệ (401/403), tự động đăng xuất
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      const isLoginPath = window.location.pathname.includes('/login');
      if (!isLoginPath) {
        console.warn("Token invalid or expired. Auto logging out...");
        localStorage.removeItem("access_token");
        localStorage.removeItem("admin_info");
        window.location.href = "/admin/login"; // Chuyển về trang đăng nhập
      }
    }
    
    return Promise.reject(error);
  },
);

// Wrapper
export const service = async <T = any>(
  config: AxiosRequestConfig,
): Promise<T> => {
  const response = await http.request<T>(config);
  return response.data;
};
