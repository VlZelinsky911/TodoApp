import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { registerSchema, type RegisterSchema } from "../schemas";
import { FormInput, Button, FormError } from "../components";
import { AxiosError } from "axios";
import "./AuthPages.css";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    setApiError(null);
    try {
      await registerUser(data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        setApiError(error.response?.data?.message || "Registration failed");
      } else {
        setApiError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Enter your details to get started.</p>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <FormError message={apiError} />

          <FormInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            registration={register("email")}
            error={errors.email}
          />

          <FormInput
            label="Password"
            type="password"
            placeholder="Create a password"
            registration={register("password")}
            error={errors.password}
          />

          <FormInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            registration={register("confirmPassword")}
            error={errors.confirmPassword}
          />

          <Button type="submit" isLoading={isSubmitting} fullWidth>
            Sign Up
          </Button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};
