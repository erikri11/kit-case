export const RoleEnum = {
  ADMIN: "ADMIN",
  USER: "USER"
} as const;

export type RoleEnum = typeof RoleEnum[keyof typeof RoleEnum];
