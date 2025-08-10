import { useEffect } from "react";
import { Outlet } from "react-router";
import { useAuthContext } from "~/features/auth/context/auth-context";
import { useRouter } from "~/hooks/use-router";

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
    <div>
      db layout <Outlet />
    </div>
  );
}
