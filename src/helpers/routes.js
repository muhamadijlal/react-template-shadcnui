export const normalizePath = (path = "") => {
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
};

export const isPathActive = (targetPath, currentPath, options = {}) => {
  const { exact = false } = options;

  const normalizedTarget = normalizePath(targetPath).replace(/\/$/, "");
  const normalizedCurrent = normalizePath(currentPath).replace(/\/$/, "");

  if (exact) {
    return normalizedCurrent === normalizedTarget;
  }

  return (
    normalizedCurrent === normalizedTarget ||
    normalizedCurrent.startsWith(`${normalizedTarget}/`)
  );
};

export const joinPath = (parentPath = "", childPath = "") => {
  if (!childPath) return normalizePath(parentPath);
  if (childPath.startsWith("/")) return childPath;

  const parent = normalizePath(parentPath).replace(/\/$/, "");
  const child = childPath.replace(/^\//, "");
  return `${parent}/${child}`;
};
