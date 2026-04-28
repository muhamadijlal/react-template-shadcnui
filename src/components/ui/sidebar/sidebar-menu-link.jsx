import { Link } from "react-router-dom";
import { cn } from "@src/lib/utils";
import { sidebarMenuLinkVariants } from "./sidebar.variants";

export function SidebarMenuLink({
  to,
  isActive = false,
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}) {
  return (
    <Link
      to={to}
      className={cn(sidebarMenuLinkVariants({ variant, size }), className)}
      data-active={isActive ? "true" : "false"}
      {...props}
    >
      {children}
    </Link>
  );
}
