export const hasRole = (user, allowedRoles = []) => {
  if (!user || !user.roles) return false;

  return user.roles.some((role) => allowedRoles.includes(role));
};

export function canAccess(route) {
  const allowedRoles = route.allowedRoles || ["*"];
  return allowedRoles.includes("*") || hasRole(user, allowedRoles);
}
