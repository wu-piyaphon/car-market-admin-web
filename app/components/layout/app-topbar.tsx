import { useAuthContext } from "~/features/auth/hooks/auth-context";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { SidebarTrigger } from "../ui/sidebar";
import { useResponsive } from "~/hooks/use-responsive";

export default function AppTopbar() {
  const { user } = useAuthContext();
  const { isMobile } = useResponsive();

  if (!user) {
    return null;
  }

  return (
    <div className="bg-sidebar border-sidebar-border flex w-full items-center justify-between p-2 shadow-sm md:justify-end">
      <div className="flex flex-row items-center">
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div className="ml-2 flex flex-col text-sm">
          <p>
            {user.firstName} {user.lastName}
          </p>
          <p>{user.email}</p>
        </div>
      </div>

      {isMobile && <SidebarTrigger />}
    </div>
  );
}
