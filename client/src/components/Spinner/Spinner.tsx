import "./Spinner.css";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  fullscreen?: boolean;
}

export const Spinner = ({ size = "md", fullscreen = false }: SpinnerProps) => {
  return (
    <div
      className={`spinner-container ${fullscreen ? "spinner-container--fullscreen" : ""}`}
    >
      <div className={`spinner spinner-${size}`}></div>
    </div>
  );
};
