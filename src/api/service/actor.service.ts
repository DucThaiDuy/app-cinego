// adminUserService.ts
import { service } from "./httpClient";
import type { PaginationRequest } from "../types/request/base/PaginationRequest";
import type {
  PaginatedResponse,
  ApiResponse,
} from "../types/response/ApiResponse";
import { API } from "../../../env/api";
import { ActorRequest } from "../types/request/ActorRequest";
import { Actor } from "../types/model/actor.model";

export const adminActorService = {
  // ================ ADD ACTOR =================
  addGenre: async (data: ActorRequest): Promise<Actor> => {
    const response = await service<ApiResponse<Actor>>({
      url: API.ADMIN.ACTOR,
      method: "POST",
      data,
    });

    return response.data;
  },

  // ================= FETCH USERS =================
  fetchUsers: async (
    pagination: PaginationRequest,
  ): Promise<PaginatedResponse<Actor>> => {
    const pageIndex = Math.max((pagination.page ?? 1) - 1, 0);

    const params = new URLSearchParams({
      page: String(pageIndex),
      size: String(pagination.limit ?? 10),
    });

    const response = await service<ApiResponse<PaginatedResponse<Actor>>>({
      url: API.ADMIN.ACTOR + `?${params.toString()}`,
      method: "GET",
    });

    return response.data;
  },

  // ================= TOGGLE STATUS =================
  toggleStatus: async (id: number): Promise<void> => {
    await service<void>({
      url: `${API.ADMIN.ACTOR}/${id}/toggle-status`,
      method: "PATCH",
    });
  },

  // ================= DELETE USER =================
  deleteUser: async (id: number): Promise<void> => {
    await service<void>({
      url: `${API.ADMIN.ACTOR}/${id}`,
      method: "DELETE",
    });
  },
};
