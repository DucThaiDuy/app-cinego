import { service } from "./httpClient";
export const authService = {
    async login(email, password) {
        const data = await service({
            method: "POST",
            url: "/admin/auth/login",
            data: { email, password },
        });
        // ✅ LƯU AUTH TẠI SERVICE
        this.saveAuth(data);
        return data;
    },
    saveAuth(data) {
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("admin_info", JSON.stringify({
            email: data.email,
            role: data.role,
        }));
    },
    logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("admin_info");
    },
    getRole() {
        const info = JSON.parse(localStorage.getItem("admin_info") || "{}");
        return info.role || null;
    },
    isAuthenticated() {
        return !!localStorage.getItem("access_token");
    },
};
