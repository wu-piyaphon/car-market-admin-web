import { useNavigate, useNavigation, useLocation } from "react-router";

export function useRouter() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();

  const isNavigating = navigation.state === "loading";
  const isSubmitting = navigation.state === "submitting";
  const isIdle = navigation.state === "idle";

  return {
    // Navigation methods
    back: () => navigate(-1),
    forward: () => navigate(1),
    push: (path: string) => navigate(path),
    replace: (path: string) => navigate(path, { replace: true }),

    // Navigation state
    isNavigating,
    isSubmitting,
    isIdle,
    navigationState: navigation.state,

    // Location info
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,
    state: location.state,

    // Form data (if submitting)
    formData: navigation.formData,
    formAction: navigation.formAction,
    formMethod: navigation.formMethod,
  };
}
