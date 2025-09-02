export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin";
};

export type AuthContextValue = {
  user: AuthUser | null;
  authenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export type AuthError = {
  message: string;
  code?: string;
};

export type AuthCredentials = {
  email: string;
  password: string;
};

export type AuthLoginResponse = {
  access_token: string;
  refresh_token: string;
};

export type RefreshTokenResponse = {
  access_token: string;
  refresh_token: string;
};
