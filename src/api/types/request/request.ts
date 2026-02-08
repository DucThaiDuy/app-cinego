export type FetchUsersRequest = {
  page: number;
  limit: number;

  keyword?: string;
  tier?: "SILVER" | "GOLD" | "PLATINUM" | "DIAMOND";
  status?: boolean; // true = active, false = inactive
};

export type ToggleStatusRequest = { id: number };
export type DeleteUserRequest = { id: number };
