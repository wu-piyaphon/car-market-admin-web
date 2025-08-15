import { useEffect } from "react";
import { Outlet } from "react-router";
import { useAuthContext } from "~/features/auth/context/auth-context";
import { useRouter } from "~/hooks/use-router";
import { paths } from "~/lib/paths";

export default function AuthLayout() {
  const router = useRouter();
  const { authenticated } = useAuthContext();

  // ----------------------------------------------------------------------

  useEffect(() => {
    if (authenticated) {
      router.replace(paths.cars.list.owner);
    }
  }, [authenticated, router]);

  // ----------------------------------------------------------------------

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  );
}
