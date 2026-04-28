import { cn } from "@src/lib/utils";
import { sidebarMenuVariants } from "./sidebar.variants";
import { FaChevronRight } from "react-icons/fa";

export function SidebarMenuCollapsible({
  className,
  Icon,
  iconSize = 20,
  active = false,
  open = false,
  children,
  ...props
}) {
  return (
    <div
      {...props}
      data-slot="sidebar-menu-collapsible"
      data-active={active}
      data-open={open}
      className={cn(
        sidebarMenuVariants({ type: "collapsible", active }),
        className,
      )}
    >
      {Icon && (
        <Icon
          size={iconSize}
          className="text-sidebar-muted-foreground group-hover/menu-collapsible:text-sidebar-accent-foreground group-data-[active=true]/menu-collapsible:text-sidebar-accent-foreground"
        />
      )}

      <div className="text-sidebar-muted-foreground group-hover/menu-collapsible:text-sidebar-accent-foreground group-data-[active=true]/menu-collapsible:text-sidebar-accent-foreground inline-flex w-full items-center justify-between text-sm font-medium capitalize">
        <span className="max-w-30 truncate">{children}</span>

        <FaChevronRight className="icon-toggle size-3 opacity-100 transition-transform duration-200 ease-in-out group-data-[active=true]/menu-collapsible:rotate-90 group-data-[open=true]/menu-collapsible:rotate-90" />
      </div>
    </div>
  );
}
