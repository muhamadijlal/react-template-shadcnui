import { useMemo, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenuLink,
  SidebarMenuCollapsible,
  SidebarMenuItem,
  SidebarMenuSublink,
} from "@components/ui/sidebar";
import { isPathActive, joinPath, normalizePath } from "@src/helpers/routes";
import { useLocation } from "react-router-dom";

function renderIcon(Icon) {
  if (!Icon) return null;
  return <Icon className="text-inherit" />;
}

export function NavMain({ menus = [] }) {
  const location = useLocation();
  const [openIndex, setOpenIndex] = useState(null);

  const routes = useMemo(() => {
    return menus.filter((menu) => menu?.handle?.visible);
  }, [menus]);

  return (
    <SidebarGroup>
      {routes.map((menu, index) => {
        const Icon = menu?.handle?.Icon;
        const SidebarName = menu?.handle?.sidebarName;

        const visibleChildren =
          menu?.children?.filter((child) => child?.handle?.visible) || [];

        const routeHasChildren = visibleChildren.length > 0;
        const routePath = normalizePath(menu.path);

        const isActive = routeHasChildren
          ? visibleChildren.some((child) =>
              isPathActive(joinPath(routePath, child.path), location.pathname),
            )
          : isPathActive(routePath, location.pathname);

        if (routeHasChildren) {
          return (
            <Collapsible
              key={menu.path}
              open={openIndex === index}
              render={<SidebarMenuItem />}
              onOpenChange={(open) => setOpenIndex(open ? index : null)}
            >
              <CollapsibleTrigger asChild>
                <SidebarMenuCollapsible
                  Icon={Icon}
                  active={isActive}
                  open={openIndex === index}
                >
                  {SidebarName}
                </SidebarMenuCollapsible>
              </CollapsibleTrigger>

              <CollapsibleContent>
                {visibleChildren.map((child) => {
                  const childPath = joinPath(routePath, child.path);
                  const isChildActive = isPathActive(
                    childPath,
                    location.pathname,
                  );

                  return (
                    <SidebarMenuSublink
                      key={child.path}
                      to={childPath}
                      active={isChildActive}
                    >
                      {child?.handle?.sidebarName}
                    </SidebarMenuSublink>
                  );
                })}
              </CollapsibleContent>
            </Collapsible>
          );
        }

        return (
          <SidebarMenuLink key={menu.path} isActive={isActive} to={routePath}>
            {renderIcon(Icon)}
            <span>{SidebarName}</span>
          </SidebarMenuLink>
        );
      })}
    </SidebarGroup>
  );
}
