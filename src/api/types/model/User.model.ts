export type User = {
  id?: number;
  code?: string;
  email?: string;
  phone?: string;
  fullName?: string;
  date_of_birth?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  avatarUrl?: string;
  membershipTier?: "SILVER" | "GOLD" | "PLATINUM" | "DIAMOND";
  totalPoints?: number;
  isActive?: boolean;
  createdAt?: string;
};
