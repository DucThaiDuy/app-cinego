import { service } from "./httpClient";
import type { PaginationRequest } from "../types/request/base/PaginationRequest";
import type {
  PaginatedResponse,
  ApiResponse,
} from "../types/response/ApiResponse";
import { API } from "../../../env/api";
import { HallResponse } from "../types/response/HallResponse";

export const adminHallService = {
  // ================= FETCH HALLS (PAGINATION + FILTER) =================
  fetchHalls: async (
    pagination: PaginationRequest,
    filters?: { cinemaId?: number; name?: string }
  ): Promise<PaginatedResponse<HallResponse>> => {
    const pageIndex = Math.max((pagination.page ?? 1) - 1, 0);

    const params = new URLSearchParams({
      page: String(pageIndex),
      size: String(pagination.limit ?? 10),
    });

    if (filters?.cinemaId) params.append("cinemaId", String(filters.cinemaId));
    if (filters?.name) params.append("name", filters.name);

    const response = await service<ApiResponse<PaginatedResponse<HallResponse>>>({
      url: API.ADMIN.HALLS + `?${params.toString()}`,
      method: "GET",
    });

    return response.data;
  },

  // ================= GET BY ID =================
  getById: async (id: number): Promise<HallResponse> => {
    const response = await service<ApiResponse<HallResponse>>({
      url: `${API.ADMIN.HALLS}/${id}`,
      method: "GET",
    });
    return response.data;
  },

  // ================= CREATE WITH FILE =================
  createWithFile: async (formData: FormData): Promise<HallResponse> => {
    const response = await service<ApiResponse<HallResponse>>({
      url: `${API.ADMIN.HALLS}/create-with-file`,
      method: "POST",
      data: formData,
    });
    return response.data;
  },

  // ================= UPDATE WITH FILE =================
  updateWithFile: async (id: number, formData: FormData): Promise<HallResponse> => {
    const response = await service<ApiResponse<HallResponse>>({
      url: `${API.ADMIN.HALLS}/${id}/with-file`,
      method: "PUT",
      data: formData,
    });
    return response.data;
  },

  // ================= DELETE =================
  deleteHall: async (id: number): Promise<void> => {
    await service<void>({
      url: `${API.ADMIN.HALLS}/${id}`,
      method: "DELETE",
    });
  },
};
