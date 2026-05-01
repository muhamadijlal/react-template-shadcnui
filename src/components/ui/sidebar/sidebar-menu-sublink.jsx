import { cn } from "@src/lib/utils";
import { Link } from "react-router-dom";

export function SidebarMenuSublink({
  className,
  active = false,
  children,
  ...props
}) {
  return (
    <Link
      {...props}
      data-slot="sidebar-menu-sublink"
      data-active={active}
      className={cn(
        "group/menu-sublink flex cursor-pointer items-center gap-3.5",
        className,
      )}
    >
      <div className="bg-sidebar-primary ml-7 size-2 rounded-full opacity-0 transition-opacity duration-200 ease-in group-hover/menu-sublink:opacity-100 group-data-[active=true]/menu-sublink:opacity-100" />

      <p className="text-sidebar-muted-foreground group-hover/menu-sublink:text-sidebar-accent-foreground group-data-[active=true]/menu-sublink:text-sidebar-accent-foreground max-w-30 truncate text-sm font-medium capitalize">
        {children}
      </p>
    </Link>
  );
}
