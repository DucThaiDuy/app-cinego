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

export const adminShowTimeService = {
  // ================ ADD ACTOR =================
  add: async (data: ShowTimeRequest): Promise<ShowTimeResponse> => {
    const response = await service<ApiResponse<ShowTimeResponse>>({
      url: API.ADMIN.SHOWTIMES,
      method: "POST",
      data,
    });

    return response.data;
  },

  // ================= FETCH USERS =================
  fetchUsers: async (
    pagination: PaginationRequest,
  ): Promise<PaginatedResponse<ShowTimeResponse>> => {
    const pageIndex = Math.max((pagination.page ?? 1) - 1, 0);

    const params = new URLSearchParams({
      page: String(pageIndex),
      size: String(pagination.limit ?? 10),
    });

    const response = await service<
      ApiResponse<PaginatedResponse<ShowTimeResponse>>
    >({
      url: API.ADMIN.SHOWTIMES + `?${params.toString()}`,
      method: "GET",
    });

    return response.data;
  },

  // ================= GET BY MOVIE ID =================
  getByMovieId: async (
    movieId: number,
    pagination?: PaginationRequest,
  ): Promise<PaginatedResponse<ShowTimeResponse>> => {
    const pageIndex = Math.max((pagination?.page ?? 1) - 1, 0);
    const pageSize = pagination?.limit ?? 100;

    const params = new URLSearchParams({
      page: String(pageIndex),
      size: String(pageSize),
    });

    const response = await service<
      ApiResponse<PaginatedResponse<ShowTimeResponse>>
    >({
      url: `${API.ADMIN.SHOWTIMES}/movie/${movieId}?${params.toString()}`,
      method: "GET",
    });

    return response.data;
  },

  // ================= TOGGLE STATUS =================
  toggleStatus: async (id: number): Promise<void> => {
    await service<void>({
      url: `${API.ADMIN.SHOWTIMES}/${id}/toggle-status`,
      method: "PATCH",
    });
  },

  deleteUser: async (id: number): Promise<void> => {
    await service<void>({
      url: `${API.ADMIN.SHOWTIMES}/${id}`,
      method: "DELETE",
    });
  },
};

export const publicShowTimeService = {
  // ================= GET BY MOVIE ID =================
  getByMovieId: async (
    movieId: number,
    pagination?: PaginationRequest,
  ): Promise<PaginatedResponse<ShowTimeResponse>> => {
    const pageIndex = Math.max((pagination?.page ?? 1) - 1, 0);
    const pageSize = pagination?.limit ?? 100;

    const params = new URLSearchParams({
      page: String(pageIndex),
      size: String(pageSize),
    });

    const response = await service<
      ApiResponse<PaginatedResponse<ShowTimeResponse>>
    >({
      url: `${API.PUBLIC.SHOWTIMES}/movie/${movieId}?${params.toString()}`,
      method: "GET",
    });

    return response.data;
  },
};

