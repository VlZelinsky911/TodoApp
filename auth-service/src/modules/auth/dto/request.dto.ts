import { z } from "zod";

export const registerDtoSchema = z.object({
  email: z.email({ error: "Invalid email format" }),
  password: z
    .string({ error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
});

export const loginDtoSchema = z.object({
  email: z.email({ error: "Invalid email format" }),
  password: z.string({ error: "Password is required" }),
});

export class RegisterDto {
  email: string;
  password: string;

  constructor(data: { email: string; password: string }) {
    this.email = data.email;
    this.password = data.password;
  }

  static validate(data: unknown): RegisterDto {
    const parsed = registerDtoSchema.parse(data);
    return new RegisterDto(parsed);
  }
}

export class LoginDto {
  email: string;
  password: string;

  constructor(data: { email: string; password: string }) {
    this.email = data.email;
    this.password = data.password;
  }

  static validate(data: unknown): LoginDto {
    const parsed = loginDtoSchema.parse(data);
    return new LoginDto(parsed);
  }
}

export type RegisterInput = z.infer<typeof registerDtoSchema>;
export type LoginInput = z.infer<typeof loginDtoSchema>;
