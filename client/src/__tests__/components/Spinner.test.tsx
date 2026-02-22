import { render } from "@testing-library/react";
import { Spinner } from "../../components/Spinner/Spinner";

describe("Spinner", () => {
  it("renders with default medium size", () => {
    render(<Spinner />);
    const spinner = document.querySelector(".spinner");
    expect(spinner).toHaveClass("spinner-md");
  });

  it("renders with small size", () => {
    render(<Spinner size="sm" />);
    const spinner = document.querySelector(".spinner");
    expect(spinner).toHaveClass("spinner-sm");
  });

  it("renders with large size", () => {
    render(<Spinner size="lg" />);
    const spinner = document.querySelector(".spinner");
    expect(spinner).toHaveClass("spinner-lg");
  });

  it("renders without fullscreen class by default", () => {
    render(<Spinner />);
    const container = document.querySelector(".spinner-container");
    expect(container).not.toHaveClass("spinner-container--fullscreen");
  });

  it("renders with fullscreen class when fullscreen is true", () => {
    render(<Spinner fullscreen />);
    const container = document.querySelector(".spinner-container");
    expect(container).toHaveClass("spinner-container--fullscreen");
  });
});
