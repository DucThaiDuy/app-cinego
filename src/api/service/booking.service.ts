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
import { BookingRequest } from "../types/request/BookingRequest";
import { BookingResponse } from "../types/response/BookingResponse";

export const adminBookingService = {
  // ================ ADD ACTOR =================
  add: async (data: BookingRequest): Promise<BookingResponse> => {
    const response = await service<ApiResponse<BookingResponse>>({
      url: API.ADMIN.BOOKINGS,
      method: "POST",
      data,
    });

    return response.data;
  },

  // ================= FETCH USERS =================
  fetchUsers: async (
    pagination: PaginationRequest,
  ): Promise<PaginatedResponse<BookingResponse>> => {
    const pageIndex = Math.max((pagination.page ?? 1) - 1, 0);

    const params = new URLSearchParams({
      page: String(pageIndex),
      size: String(pagination.limit ?? 10),
    });

    const response = await service<
      ApiResponse<PaginatedResponse<BookingResponse>>
    >({
      url: API.ADMIN.BOOKINGS + `?${params.toString()}`,
      method: "GET",
    });

    return response.data;
  },

  // ================= TOGGLE STATUS =================
  toggleStatus: async (id: number): Promise<void> => {
    await service<void>({
      url: `${API.ADMIN.BOOKINGS}/${id}/toggle-status`,
      method: "PATCH",
    });
  },

  // ================= DELETE USER =================
  deleteUser: async (id: number): Promise<void> => {
    await service<void>({
      url: `${API.ADMIN.BOOKINGS}/${id}`,
      method: "DELETE",
    });
  },
};
