// adminUserService.ts
import { service } from "./httpClient";
import { API } from "../../../env/api";
export const adminGenreService = {
    addGenre: async (data) => {
        const response = await service({
            url: API.ADMIN.GENRES,
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
            // url: `/admin/users?${params.toString()}`,
            url: API.ADMIN.GENRES + `?${params.toString()}`,
            method: "GET",
        });
        console.log("API Response Data:", response.data);
        return response.data; // <-- đã trả về items + pagination
    },
    // ================= TOGGLE STATUS =================
    toggleStatus: async (id) => {
        await service({
            url: `${API.ADMIN.GENRES}/${id}/toggle-status`,
            method: "PATCH",
        });
    },
    // ================= DELETE USER =================
    deleteUser: async (id) => {
        await service({
            url: `${API.ADMIN.GENRES}/${id}`,
            method: "DELETE",
        });
    },
};
