import { cn } from "@lib/utils";
import { sidebarLayoutVariants } from "./sidebar.variants";
import { SidebarBackdrop } from "./sidebar-backdrop";
import { SidebarToggle } from "./sidebar-toggle";
import { useSidebar } from "@hooks/use-sidebar";
import { DialogProvider } from "@components/ui/dialog/dialog-provider";

export function SidebarLayout({ children }) {
  const { open } = useSidebar();

  return (
    <div
      data-slot="sidebar-layout"
      data-open={open}
      className={cn(sidebarLayoutVariants())}
    >
      <SidebarBackdrop />
      <SidebarToggle />
      <DialogProvider>{children}</DialogProvider>
    </div>
  );
}
