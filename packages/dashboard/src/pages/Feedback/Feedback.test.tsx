import { render, screen } from '@testing-library/react';
import { Feedback } from './Feedback';

describe("<Feedback />", () => {
  it ("should render feedback", () => {
    render(<Feedback />);
    expect(screen.getByText("Feedback")).toBeInTheDocument();
  });
});
