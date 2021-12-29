import { render, screen } from "@testing-library/react";
import { FeedbackDeleteForm } from "./FeedbackDeleteForm";

describe("<FeedbackDeleteForm />", () => {
  it("should render", () => {
    render(<FeedbackDeleteForm feedbackTitle="Title" feedbackId="1" />);
    expect(screen.getByText("Permanently delete")).toBeInTheDocument();
  });
});
