import { useEffect } from "react";
import { Outlet } from "react-router";
import { useAuthContext } from "~/features/auth/hooks/auth-context";
import { useRouter } from "~/hooks/use-router";
import Container from "../ui/container";
import { LoadingLayout } from "../ui/loading";
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
    return (
      <LoadingLayout
        variant="dots"
        size="xl"
        text="Authenticating..."
        fullScreen
      />
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex w-full flex-col">
        <AppTopbar />
        <Container>
          <Outlet />
        </Container>
      </main>
    </SidebarProvider>
  );
}
