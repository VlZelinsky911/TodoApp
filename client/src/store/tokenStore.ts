let accessToken: string | null = null;

export const tokenStore = {
  getToken: (): string | null => accessToken,
  setToken: (token: string | null): void => {
    accessToken = token;
  },
  clearToken: (): void => {
    accessToken = null;
  },
};
