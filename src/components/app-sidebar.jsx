"use client";

import SidebarLogo from "@assets/jasamarga-logo.png";
import UsersIcon from "@assets/users.png";

import { NavMain } from "@src/components/nav-main";
import { NavUser } from "@src/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@src/components/ui/sidebar";
import routes from "@routes";

export function AppSidebar({ ...props }) {
  const router = routes.routes;
  console.log("AppSidebar routes:", router); // Debugging log
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader className="border-border mx-6 mt-10 border-b-2 pb-5">
        <img
          src={SidebarLogo}
          alt="Sidebar Logo"
          className="h-auto w-full scale-95"
        />
      </SidebarHeader>
      <SidebarContent>{/* <NavMain routes={routes} /> */}</SidebarContent>
      <SidebarFooter>
        <NavUser
          className="mx-3 mb-3"
          Icon={UsersIcon}
          username="JMTO DEV"
          role="Admin"
        />
      </SidebarFooter>
    </Sidebar>
  );
}
