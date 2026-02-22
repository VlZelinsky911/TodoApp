import { loginSchema, registerSchema } from "../../schemas/auth.schemas";

describe("loginSchema", () => {
  it("validates correct login data", () => {
    const validData = {
      email: "test@example.com",
      password: "password123",
    };
    const result = loginSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const invalidData = {
      email: "invalid-email",
      password: "password123",
    };
    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("email");
    }
  });

  it("rejects empty email", () => {
    const invalidData = {
      email: "",
      password: "password123",
    };
    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("rejects password shorter than 6 characters", () => {
    const invalidData = {
      email: "test@example.com",
      password: "12345",
    };
    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("password");
    }
  });

  it("rejects missing password", () => {
    const invalidData = {
      email: "test@example.com",
    };
    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe("registerSchema", () => {
  it("validates correct registration data", () => {
    const validData = {
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
    };
    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const invalidData = {
      email: "invalid",
      password: "password123",
      confirmPassword: "password123",
    };
    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("rejects password shorter than 6 characters", () => {
    const invalidData = {
      email: "test@example.com",
      password: "12345",
      confirmPassword: "12345",
    };
    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("rejects mismatched passwords", () => {
    const invalidData = {
      email: "test@example.com",
      password: "password123",
      confirmPassword: "different123",
    };
    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("confirmPassword");
      expect(result.error.issues[0].message).toBe("Passwords do not match.");
    }
  });

  it("rejects missing confirmPassword", () => {
    const invalidData = {
      email: "test@example.com",
      password: "password123",
    };
    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
