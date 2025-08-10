import { Avatar, AvatarFallback } from "../ui/avatar";
import { SidebarTrigger } from "../ui/sidebar";
import { useResponsive } from "~/hooks/use-responsive";

export default function AppTopbar() {
  const { isMobile } = useResponsive();
  return (
    <div className="bg-sidebar border-sidebar-border flex w-full items-center justify-between p-2 shadow-sm md:justify-end">
      {isMobile && <SidebarTrigger />}

      <div className="flex flex-row items-center">
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div className="ml-2 flex flex-col text-sm">
          <p>Admin</p>
          <p>Admin@car.com</p>
        </div>
      </div>
    </div>
  );
}
