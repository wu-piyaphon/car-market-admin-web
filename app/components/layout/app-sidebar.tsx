import { Link, useLocation } from "react-router";
import { useAuthContext } from "~/features/auth/hooks/auth-context";
import { Button } from "../ui/button";
import Divider from "../ui/divider";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { NAV_CONFIG } from "./nav-config";
import { Car } from "lucide-react";

// ----------------------------------------------------------------------

export default function AppSidebar() {
  const { logout } = useAuthContext();
  const location = useLocation();

  const isActiveMenuItem = (url: string) => {
    if (url === "#") return false;
    return location.pathname === url || location.pathname.startsWith(url + "/");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <h6 className="whitespace-pre-line">
          {`Good Car Market\nCMS`}{" "}
          <Car className="mb-1 ml-2 inline-block text-sky-500 dark:text-white" />
        </h6>
      </SidebarHeader>
      <SidebarContent>
        {NAV_CONFIG.map(group => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.children.map(item => {
                  const isActive = isActiveMenuItem(item.url);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link to={item.url}>{item.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <Divider />
      <SidebarFooter>
        <Button size="lg" variant="ghost" onClick={logout}>
          ออกจากระบบ
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
