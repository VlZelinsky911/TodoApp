import { api } from "./axios";
import { tokenStore } from "../store/tokenStore";
import type { User, AuthResponse, ApiResponse } from "../types/auth";

export const authApi = {
  async register(email: string, password: string): Promise<User> {
    const res = await api.post<ApiResponse<AuthResponse>>(
      "/api/auth/register",
      {
        email,
        password,
      },
    );

    const { accessToken, user } = res.data.data!;

    tokenStore.setToken(accessToken);

    return user;
  },

  async login(email: string, password: string): Promise<User> {
    const res = await api.post<ApiResponse<AuthResponse>>("/api/auth/login", {
      email,
      password,
    });

    const { accessToken, user } = res.data.data!;

    tokenStore.setToken(accessToken);

    return user;
  },

  async logout(): Promise<void> {
    await api.post("/api/auth/logout");

    tokenStore.clearToken();
  },

  async logoutAll(): Promise<void> {
    await api.post("/api/auth/logout-all");

    tokenStore.clearToken();
  },

  async getMe(): Promise<User> {
    const res = await api.get<ApiResponse<{ user: User }>>("/api/auth/me");

    return res.data.data!.user;
  },
};
