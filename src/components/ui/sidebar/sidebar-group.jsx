import { cn } from "@src/lib/utils";

export function SidebarGroup({ className, ...props }) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn(
        "relative my-4 flex w-full min-w-0 flex-col space-y-4",
        className,
      )}
      {...props}
    />
  );
}
