import { API_BASE } from "./apiBase";

export const API = {
  PUBLIC: {
    MOVIES: `${API_BASE.PUBLIC}/movies`,
    USERS: `${API_BASE.PUBLIC}/users`,
  },
  ADMIN: {
    MOVIES: `${API_BASE.ADMIN}/movies`,
    USERS: `${API_BASE.ADMIN}/users`,
    GENRES: `${API_BASE.ADMIN}/genres`,
    ACTOR: `${API_BASE.ADMIN}/actors`,
    SHOWTIMES: `${API_BASE.ADMIN}/showtimes`,
    CINEMAS: `${API_BASE.ADMIN}/cinemas`,
    BOOKINGS: `${API_BASE.ADMIN}/bookings`,
  },
};
