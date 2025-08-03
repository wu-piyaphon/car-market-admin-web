export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
};

export type AuthContextType = {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
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
  user: AuthUser;
  token: string;
};
