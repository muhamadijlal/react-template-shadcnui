import Navbar from "@components/navbar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@components/app-sidebar";
import { SidebarLayout, SidebarProvider } from "@components/ui/sidebar";

function MainLayout() {
  return (
    <SidebarProvider>
      <SidebarLayout>
        <AppSidebar />

        <main className="h-full w-full space-y-5 overflow-y-auto py-4 pr-4 pl-2">
          <Navbar />

          <Outlet />
        </main>
      </SidebarLayout>
    </SidebarProvider>
  );
}

export default MainLayout;
