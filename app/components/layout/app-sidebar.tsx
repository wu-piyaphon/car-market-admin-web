import { Link, useLocation } from "react-router";
import { useAuthContext } from "~/features/auth/context/auth-context";
import { paths } from "~/lib/paths";
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

// ----------------------------------------------------------------------

const MENU = [
  {
    title: "รายการรถ",
    url: "#",
    children: [
      {
        title: "รถแชมป์",
        url: paths.cars.owner.list,
      },
      {
        title: "รถฝากขาย",
        url: paths.cars.consignment.list,
      },
    ],
  },
  {
    title: "คำขอ",
    url: "#",
    children: [
      {
        title: "ฝากขายรถ",
        url: "#",
      },
      {
        title: "ขายรถ",
        url: "#",
      },
      {
        title: "ประเมินราคา",
        url: "#",
      },
    ],
  },
];

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
        {MENU.map(group => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.children.map(item => {
                  const isActive = isActiveMenuItem(item.url);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        {item.url === "#" ? (
                          <span>
                            <span>{item.title}</span>
                          </span>
                        ) : (
                          <Link to={item.url}>
                            <span>{item.title}</span>
                          </Link>
                        )}
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
