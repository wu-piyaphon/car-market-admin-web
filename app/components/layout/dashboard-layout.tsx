import { useEffect } from "react";
import { Outlet } from "react-router";
import { useAuthContext } from "~/features/auth/context/auth-context";
import { useRouter } from "~/hooks/use-router";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "./app-sidebar";
import AppTopbar from "./app-topbar";

export default function DashboardLayout() {
  const router = useRouter();
  const { authenticated, loading } = useAuthContext();

  // ----------------------------------------------------------------------

  useEffect(() => {
    if (!authenticated && !loading) {
      router.replace("/");
    }
  }, [authenticated, loading, router]);

  // ----------------------------------------------------------------------

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex w-full flex-col">
        <AppTopbar />
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
