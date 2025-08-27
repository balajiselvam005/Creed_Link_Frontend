import { AuthContextType } from "@/types/authContextType";
import { createContext } from "react";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  loading: true,
});
