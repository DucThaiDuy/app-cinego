// adminUserService.ts
import { service } from "./httpClient";
import type { PaginationRequest } from "../types/request/base/PaginationRequest";
import type {
  PaginatedResponse,
  ApiResponse,
} from "../types/response/ApiResponse";
import type { User } from "../types/model/User.model";
import { API } from "../../../env/api";
import { Genre } from "../types/model/genre.model";

export const adminGenreService = {
  addGenre: async (data: {
    name: string;
    slug: string;
    description: string;
  }): Promise<Genre> => {
    const response = await service<ApiResponse<Genre>>({
      url: API.ADMIN.GENRES,
      method: "POST",
      data,
    });

    return response.data;
  },

  // ================= FETCH USERS =================
  fetchUsers: async (
    pagination: PaginationRequest,
  ): Promise<PaginatedResponse<Genre>> => {
    const pageIndex = Math.max((pagination.page ?? 1) - 1, 0);

    const params = new URLSearchParams({
      page: String(pageIndex),
      size: String(pagination.limit ?? 10),
    });

    const response = await service<ApiResponse<PaginatedResponse<Genre>>>({
      // url: `/admin/users?${params.toString()}`,
      url: API.ADMIN.GENRES + `?${params.toString()}`,
      method: "GET",
    });

    console.log("API Response Data:", response.data);
    return response.data; // <-- đã trả về items + pagination
  },

  // ================= TOGGLE STATUS =================
  toggleStatus: async (id: number): Promise<void> => {
    await service<void>({
      url: `${API.ADMIN.GENRES}/${id}/toggle-status`,
      method: "PATCH",
    });
  },

  // ================= DELETE USER =================
  deleteUser: async (id: number): Promise<void> => {
    await service<void>({
      url: `${API.ADMIN.GENRES}/${id}`,
      method: "DELETE",
    });
  },
};
