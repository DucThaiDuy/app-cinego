// adminUserService.ts
import { service } from "./httpClient";
import type { PaginationRequest } from "../types/request/base/PaginationRequest";
import type {
  PaginatedResponse,
  ApiResponse,
} from "../types/response/ApiResponse";
import type { User } from "../types/model/User.model";
import { API } from "../../../env/api";

export const adminUserService = {
  // ================= FETCH USERS =================
  fetchUsers: async (
    pagination: PaginationRequest,
    filters?: { code?: string; phone?: string; fullName?: string; email?: string }
  ): Promise<PaginatedResponse<User>> => {
    const pageIndex = Math.max((pagination.page ?? 1) - 1, 0);

    const params = new URLSearchParams({
      page: String(pageIndex),
      size: String(pagination.limit ?? 10),
    });

    if (filters?.code) params.append("code", filters.code);
    if (filters?.phone) params.append("phone", filters.phone);
    if (filters?.fullName) params.append("fullName", filters.fullName);
    if (filters?.email) params.append("email", filters.email);

    const response = await service<ApiResponse<PaginatedResponse<User>>>({
      url: API.ADMIN.USERS + `?${params.toString()}`,
      method: "GET",
    });

    console.log("API Response Data:", response.data);
    return response.data; // <-- đã trả về items + pagination
  },

  // ================= TOGGLE STATUS =================
  toggleStatus: async (id: number): Promise<void> => {
    await service<void>({
      url: `${API.ADMIN.USERS}/${id}/toggle-status`,
      method: "PATCH",
    });
  },

  // ================= DELETE USER =================
  deleteUser: async (id: number): Promise<void> => {
    await service<void>({
      url: `${API.ADMIN.USERS}/${id}`,
      method: "DELETE",
    });
  },


};
