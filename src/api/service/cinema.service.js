// adminUserService.ts
import { service } from "./httpClient";
import { API } from "../../../env/api";
export const adminCinemaService = {
    // ================ ADD ACTOR =================
    add: async (data) => {
        const response = await service({
            url: API.ADMIN.CINEMAS,
            method: "POST",
            data,
        });
        return response.data;
    },
    // ================= FETCH USERS =================
    fetch: async (pagination) => {
        const pageIndex = Math.max((pagination.page ?? 1) - 1, 0);
        const params = new URLSearchParams({
            page: String(pageIndex),
            size: String(pagination.limit ?? 10),
        });
        const response = await service({
            url: API.ADMIN.CINEMAS + `?${params.toString()}`,
            method: "GET",
        });
        return response.data;
    },
    // ================= TOGGLE STATUS =================
    toggleStatus: async (id) => {
        await service({
            url: `${API.ADMIN.CINEMAS}/${id}/toggle-status`,
            method: "PATCH",
        });
    },
    // ================= DELETE USER =================
    delete: async (id) => {
        await service({
            url: `${API.ADMIN.CINEMAS}/${id}`,
            method: "DELETE",
        });
    },
};
