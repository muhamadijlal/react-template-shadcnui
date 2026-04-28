import { cn } from "@src/lib/utils";

export function SidebarHeader({ className, ...props }) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 pb-4", className)}
      {...props}
    />
  );
}
