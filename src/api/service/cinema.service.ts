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
import { ShowTimeRequest } from "../types/request/ShowTimeRequest";
import { ShowTimeResponse } from "../types/response/ShowTimeResponse";
import { CinemaRequest } from "../types/request/cinemaRequest";
import { Cinema } from "../../components/model/Cinema";

export const adminCinemaService = {
  // ================ ADD ACTOR =================
  add: async (data: CinemaRequest): Promise<Cinema> => {
    const response = await service<ApiResponse<Cinema>>({
      url: API.ADMIN.CINEMAS,
      method: "POST",
      data,
    });

    return response.data;
  },

  // ================= FETCH USERS =================
  fetch: async (
    pagination: PaginationRequest,
  ): Promise<PaginatedResponse<Cinema>> => {
    const pageIndex = Math.max((pagination.page ?? 1) - 1, 0);

    const params = new URLSearchParams({
      page: String(pageIndex),
      size: String(pagination.limit ?? 10),
    });

    const response = await service<ApiResponse<PaginatedResponse<Cinema>>>({
      url: API.ADMIN.CINEMAS + `?${params.toString()}`,
      method: "GET",
    });

    return response.data;
  },

  // ================= TOGGLE STATUS =================
  toggleStatus: async (id: number): Promise<void> => {
    await service<void>({
      url: `${API.ADMIN.CINEMAS}/${id}/toggle-status`,
      method: "PATCH",
    });
  },

  // ================= DELETE USER =================
  delete: async (id: number): Promise<void> => {
    await service<void>({
      url: `${API.ADMIN.CINEMAS}/${id}`,
      method: "DELETE",
    });
  },
};
