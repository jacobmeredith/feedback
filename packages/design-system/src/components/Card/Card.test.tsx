import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("<Card />", () => {
  it("should render", () => {
    render(<Card>Child content</Card>);
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});
