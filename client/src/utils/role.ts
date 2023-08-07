// 角色
export type allowedRole = "GUEST" | "GAMER";

// 角色对象
export const role: {
  GUEST: "GUEST";
  GAMER: "GAMER";

  // 所有角色
  all: () => ["GUEST", "GAMER"];

  // 除 `roles` 以外的 所有角色
  exclude: (roles: allowedRole | allowedRole[]) => allowedRole[];
} = {
  GUEST: "GUEST",
  GAMER: "GAMER",

  // 所有角色
  all() {
    return ["GUEST", "GAMER"];
  },

  // 除 `roles` 以外的 所有角色
  exclude(roles) {
    let allRole: allowedRole[] = ["GUEST"];

    if (Array.isArray(roles)) {
      for (let role of roles) {
        allRole = allRole.filter((r) => r !== role);
      }

      return allRole;
    }

    return allRole.filter((role) => role !== roles);
  },
};
