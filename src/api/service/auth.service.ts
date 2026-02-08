import { service } from "./httpClient";
import { LoginResponse } from "../types/response/LoginResponse";

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const data = await service<LoginResponse>({
      method: "POST",
      url: "/admin/auth/login",
      data: { email, password },
    });

    // ✅ LƯU AUTH TẠI SERVICE
    this.saveAuth(data);

    return data;
  },

  saveAuth(data: LoginResponse) {
    localStorage.setItem("access_token", data.token);
    localStorage.setItem(
      "admin_info",
      JSON.stringify({
        email: data.email,
        role: data.role,
      }),
    );
  },

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("admin_info");
  },

  getRole(): string | null {
    const info = JSON.parse(localStorage.getItem("admin_info") || "{}");
    return info.role || null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("access_token");
  },
};
