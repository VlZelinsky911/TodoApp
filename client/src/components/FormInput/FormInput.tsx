import type { InputHTMLAttributes } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import "./FormInput.css";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}

export const FormInput = ({
  label,
  error,
  registration,
  type = "text",
  ...props
}: FormInputProps) => {
  return (
    <div className="form-input">
      <label className="form-input__label" htmlFor={registration.name}>
        {label}
      </label>
      <input
        id={registration.name}
        type={type}
        className={`form-input__field ${error ? "form-input__field--error" : ""}`}
        {...registration}
        {...props}
      />
      {error && <span className="form-input__error">{error.message}</span>}
    </div>
  );
};
