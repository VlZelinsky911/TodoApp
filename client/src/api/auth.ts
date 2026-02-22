import { api } from "./axios";
import { tokenStore } from "../store/tokenStore";
import type {
  UserDto,
  AuthResponseDto,
  MeResponseDto,
  LoginRequestDto,
  RegisterRequestDto,
} from "../dto";

export const authApi = {
  async register(credentials: RegisterRequestDto): Promise<UserDto> {
    const res = await api.post<AuthResponseDto>(
      "/api/auth/register",
      credentials,
    );

    const { accessToken, user } = res.data.data!;

    tokenStore.setToken(accessToken);

    return user;
  },

  async login(credentials: LoginRequestDto): Promise<UserDto> {
    const res = await api.post<AuthResponseDto>("/api/auth/login", credentials);

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

  async getMe(): Promise<UserDto> {
    const res = await api.get<MeResponseDto>("/api/auth/me");

    return res.data.data!.user;
  },
};
