import { render, screen } from "@testing-library/react"

import { Field } from "./Field";

describe('<Field />', () => {
  it('should render correctly', () => {
    render(<Field label="Test label">Content</Field>);
    expect(screen.getByText('Test label')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
