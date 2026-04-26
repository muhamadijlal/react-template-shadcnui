import { AppSidebar } from "@src/components/app-sidebar";
import Navbar from "@src/components/navbar";
import { SidebarProvider } from "@src/components/ui/sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full space-y-5 overflow-y-auto py-4 pr-4 pl-2">
        <Navbar />

        <Outlet />
      </main>
    </SidebarProvider>
  );
}

export default MainLayout;
