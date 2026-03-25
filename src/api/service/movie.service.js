import { service } from "./httpClient";
import { API } from "../../../env/api";
export const adminmovieService = {
    // ================= FETCH MOVIES =================
    fetchMovies: async (pagination) => {
        const pageIndex = Math.max((pagination.page ?? 1) - 1, 0);
        const params = new URLSearchParams({
            page: String(pageIndex),
            size: String(pagination.limit ?? 10),
        });
        const response = await service({
            url: `${API.ADMIN.MOVIES}?${params.toString()}`,
            method: "GET",
        });
        console.log("API Response Data:", response.data);
        return response.data;
    },
};
