import { useEffect } from "react";
import { useRouter } from "~/hooks/use-router";
import { paths } from "~/lib/paths";

export default function CarIndex() {
  const router = useRouter();

  useEffect(() => {
    // Redirect /dashboard/cars to /dashboard/cars/owner by default
    router.replace(paths.cars.owner.list);
  }, [router]);

  return null;
}
