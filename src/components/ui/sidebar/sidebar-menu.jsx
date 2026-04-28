import { cn } from "@src/lib/utils";

export function SidebarMenu({ className, ...props }) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1 space-y-2", className)}
      {...props}
    />
  );
}
