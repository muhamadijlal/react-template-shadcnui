import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@src/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuCollapsible,
  SidebarMenuItem,
  SidebarMenuSublink,
} from "@src/components/ui/sidebar";
import { MdInsertChart } from "react-icons/md";
import { PiGearSixFill } from "react-icons/pi";

export function NavMain({ routes }) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuButton tooltip={"test"} render={<a href="#" />}>
          <MdInsertChart />

          <span>Dashboard</span>
        </SidebarMenuButton>

        <Collapsible open={true} render={<SidebarMenuItem />}>
          <CollapsibleTrigger>
            <SidebarMenuCollapsible Icon={PiGearSixFill} active={true}>
              manajemen
            </SidebarMenuCollapsible>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSublink to="#" active={true}>
              Akun Media
            </SidebarMenuSublink>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
