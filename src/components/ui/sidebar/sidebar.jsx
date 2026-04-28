import { useSidebar } from "@src/hooks/use-sidebar";
import { SIDEBAR_WIDTH_MOBILE } from "./constant";
import { cn } from "@src/lib/utils";

export function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) {
  const { isMobile, state, openMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <nav
        data-sidebar="sidebar"
        data-slot="sidebar"
        data-mobile="true"
        className={cn(
          "bg-sidebar text-sidebar-foreground fixed top-0 z-999999 h-svh transition-transform duration-200 ease-linear md:hidden",
          side === "left" ? "left-0" : "right-0",

          // default hidden
          side === "left" ? "-translate-x-full" : "translate-x-full",

          // kalau open -> muncul
          "group-data-[open=true]/sidebar:translate-x-0",

          className,
        )}
        style={{
          width: SIDEBAR_WIDTH_MOBILE,
        }}
        {...props}
      >
        <div className="flex h-full w-full flex-col">{children}</div>
      </nav>
    );
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
        )}
      />

      <div
        data-slot="sidebar-container"
        data-side={side}
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:-left-(--sidebar-width) data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:-right-(--sidebar-width) md:flex",
          variant === "floating" || variant === "inset"
            ? "py-4 pr-2 pl-4 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:ring-sidebar-border flex size-full flex-col group-data-[variant=floating]:rounded-4xl"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
