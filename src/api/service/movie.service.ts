import { MovieResponse } from "../types/model/movie.model";
import { PaginationRequest } from "../types/request/base/PaginationRequest";
import { PaginatedResponse } from "../types/response/ApiResponse";
import { service } from "./httpClient";
import { API } from "../../../env/api";
export const adminmovieService = {
  // ================= FETCH MOVIES =================
  fetchMovies: async (pagination: PaginationRequest) => {
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

  // ================= CREATE MOVIE =================
  createMovie: async (movieData: any) => {
    const response = await service({
      url: API.ADMIN.MOVIES,
      method: "POST",
      data: movieData,
    });
    return response.data;
  },

  // ================= FETCH MOVIE BY ID =================
  fetchMovieById: async (id: number) => {
    const response = await service({
      url: `${API.ADMIN.MOVIES}/${id}`,
      method: "GET",
    });
    return response.data;
  },

  // ================= UPDATE MOVIE =================
  updateMovie: async (id: number, movieData: any) => {
    const response = await service({
      url: `${API.ADMIN.MOVIES}/${id}`,
      method: "PUT",
      data: movieData,
    });
    return response.data;
  },

  // ================= DELETE MOVIE =================
  deleteMovie: async (id: number) => {
    const response = await service({
      url: `${API.ADMIN.MOVIES}/${id}`,
      method: "DELETE",
    });
    return response.data;
  },
};

export const publicMovieService = {
  // ================= FETCH PUBLIC MOVIES =================
  fetchMovies: async (pagination: PaginationRequest) => {
    const pageIndex = Math.max((pagination.page ?? 1) - 1, 0);

    const params = new URLSearchParams({
      page: String(pageIndex),
      size: String(pagination.limit ?? 10),
    });
    const response = await service({
      url: `${API.PUBLIC.MOVIES}?${params.toString()}`,
      method: "GET",
    });
    console.log("Public API Response Data:", response.data);
    return response.data;
  },
};

