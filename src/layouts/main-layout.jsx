import Navbar from "@components/navbar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@components/app-sidebar";
import { SidebarLayout, SidebarProvider } from "@components/ui/sidebar";
import { TooltipProvider } from "@components/ui/tooltip";
import { Toaster } from "sonner";

function MainLayout() {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <SidebarLayout>
          <AppSidebar />

          <main className="h-full w-full space-y-5 overflow-y-auto py-4 pr-4 pl-2">
            <Navbar />

            <Outlet />
          </main>
          <Toaster />
        </SidebarLayout>
      </TooltipProvider>
    </SidebarProvider>
  );
}

export default MainLayout;
