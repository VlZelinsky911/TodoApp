import z from "zod/v3";

export const loginSchema = z.object({
	email: z.string().email("Invalid email format"),
	password: z.string().min(6, "Password must contain at least 6 characters"),
});

export const registerSchema = z.object({
	email: z.string().email("Invalid email format"),
	password: z.string().min(6, "Password must contain at least 6 characters"),
	confirmPassword: z.string().min(6, "Password must contain at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords do not match.",
	path: ["confirmPassword"],
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
