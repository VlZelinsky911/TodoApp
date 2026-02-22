import { ReactNode } from "react";
import { User } from "../types/auth";

export interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}