import { Dispatch, SetStateAction } from "react";
import { LoginForm, SignupForm } from "./authForm";
import { User } from "./user";

export type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  signup: (form: SignupForm) => Promise<void> | void;
  login: (form: LoginForm) => Promise<void> | void;
  logout: () => Promise<void> | void;
  refreshCurrentUser: () => Promise<User | null>; 
  loading: boolean;
};
