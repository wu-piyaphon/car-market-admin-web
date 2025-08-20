import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { tokenManager } from "~/lib/api/token-manager";
import { AUTH_API } from "../api/auth.api";
import type { AuthContextValue, AuthUser } from "../types/auth.types";
import { useGetMeMutation } from "../api/auth.mutations";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { mutateAsync: getMe } = useGetMeMutation();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { access_token, refresh_token } = await AUTH_API.login({
        email,
        password,
      });
      tokenManager.setTokens(access_token, refresh_token);
      initialize();
    } catch (err) {
      setUser(null);
      throw new Error(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    tokenManager.clearTokens();
    setUser(null);
  };

  const initialize = async () => {
    setLoading(true);
    try {
      const accessToken = tokenManager.getAccessToken();
      if (accessToken) {
        const user = await getMe();
        setUser(user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------------------------

  useEffect(() => {
    initialize();
  }, []);

  // ----------------------------------------------------------------------

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        authenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
