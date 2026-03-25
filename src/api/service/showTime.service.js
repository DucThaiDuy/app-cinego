// adminUserService.ts
import { service } from "./httpClient";
import { API } from "../../../env/api";
export const adminShowTimeService = {
    // ================ ADD ACTOR =================
    add: async (data) => {
        const response = await service({
            url: API.ADMIN.SHOWTIMES,
            method: "POST",
            data,
        });
        return response.data;
    },
    // ================= FETCH USERS =================
    fetchUsers: async (pagination) => {
        const pageIndex = Math.max((pagination.page ?? 1) - 1, 0);
        const params = new URLSearchParams({
            page: String(pageIndex),
            size: String(pagination.limit ?? 10),
        });
        const response = await service({
            url: API.ADMIN.SHOWTIMES + `?${params.toString()}`,
            method: "GET",
        });
        return response.data;
    },
    // ================= TOGGLE STATUS =================
    toggleStatus: async (id) => {
        await service({
            url: `${API.ADMIN.SHOWTIMES}/${id}/toggle-status`,
            method: "PATCH",
        });
    },
    // ================= DELETE USER =================
    deleteUser: async (id) => {
        await service({
            url: `${API.ADMIN.SHOWTIMES}/${id}`,
            method: "DELETE",
        });
    },
};
