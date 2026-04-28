"use client";

import SidebarLogo from "@assets/jasamarga-logo.png";
import UsersIcon from "@assets/users.png";
import "@assets/css/sidebar.css";
import { NavMain } from "@src/components/nav-main";
import { NavUser } from "@src/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@src/components/ui/sidebar";
import routes from "@routes";
import { TbLogout2 } from "react-icons/tb";

export function AppSidebar({ ...props }) {
  const router = routes.routes?.at(0)?.children?.at(0)?.children || [];

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader className="border-border mx-6 mt-10 border-b-2 pb-5">
        <img
          src={SidebarLogo}
          alt="Sidebar Logo"
          className="h-auto w-full scale-95"
        />
      </SidebarHeader>

      <SidebarContent>
        <NavMain menus={router} />
      </SidebarContent>

      <SidebarFooter className="mx-3">
        <SidebarMenuButton tooltip="Logout">
          <TbLogout2 />
          <span>Log Out</span>
        </SidebarMenuButton>
        <NavUser
          className="mb-3"
          Icon={UsersIcon}
          username="JMTO DEV"
          role="Admin"
        />
      </SidebarFooter>
    </Sidebar>
  );
}
