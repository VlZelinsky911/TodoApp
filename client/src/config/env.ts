interface Env {
  API_URL: string;
  NODE_ENV: string;
}

export const env: Env = {
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  NODE_ENV: import.meta.env.MODE || "development",
};
