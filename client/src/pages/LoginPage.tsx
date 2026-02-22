import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { loginSchema, type LoginSchema } from "../schemas";
import { FormInput, Button, FormError } from "../components";
import { AxiosError } from "axios";
import "./AuthPages.css";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    setApiError(null);
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        const responseData = error.response?.data;
        if (responseData?.errors && Array.isArray(responseData.errors)) {
          const errorMessages = responseData.errors
            .map((e: { message: string }) => e.message)
            .join(". ");
          setApiError(errorMessages);
        } else {
          setApiError(responseData?.message || "Login failed");
        }
      } else {
        setApiError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Sign In</h1>
        <p className="auth-subtitle">
          Welcome back! Please enter your details.
        </p>

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
            placeholder="Enter your password"
            registration={register("password")}
            error={errors.password}
          />

          <Button type="submit" isLoading={isSubmitting} fullWidth>
            Sign In
          </Button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};
