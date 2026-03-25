// adminUserService.ts
import { service } from "./httpClient";
import { API } from "../../../env/api";
export const adminActorService = {
    // ================ ADD ACTOR =================
    addGenre: async (data) => {
        const response = await service({
            url: API.ADMIN.ACTOR,
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
            url: API.ADMIN.ACTOR + `?${params.toString()}`,
            method: "GET",
        });
        return response.data;
    },
    // ================= TOGGLE STATUS =================
    toggleStatus: async (id) => {
        await service({
            url: `${API.ADMIN.ACTOR}/${id}/toggle-status`,
            method: "PATCH",
        });
    },
    // ================= DELETE USER =================
    deleteUser: async (id) => {
        await service({
            url: `${API.ADMIN.ACTOR}/${id}`,
            method: "DELETE",
        });
    },
};
