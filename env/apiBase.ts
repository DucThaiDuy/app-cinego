import { ENV } from "./env";

export const API_BASE = {
  PUBLIC: ENV.API_URL, // /api
  ADMIN: `${ENV.API_URL}/admin`, // /api/admin
};
