import { useNavigate } from "react-router";

export function useRouter() {
  const navigate = useNavigate();

  return {
    back: () => navigate(-1),
    forward: () => navigate(1),
    push: (path: string) => navigate(path),
    replace: (path: string) => navigate(path, { replace: true }),
  };
}
