import { Link, useLocation } from "react-router";
import { useAuthContext } from "~/features/auth/context/auth-context";
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
        <h6>Good Car Market CMS</h6>
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
                        <Link to={item.url}>
                          <span>{item.title}</span>
                        </Link>
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
