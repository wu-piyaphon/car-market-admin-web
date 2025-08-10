import { useAuthContext } from "~/features/auth/context/auth-context";
import { Button } from "../ui/button";
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
import Divider from "../ui/divider";

// ----------------------------------------------------------------------

const MENU = [
  {
    title: "รายการรถ",
    url: "#",
    children: [
      {
        title: "รถแชมป์",
        url: "#",
      },
      {
        title: "รถฝากขาย",
        url: "#",
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
                {group.children.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
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
