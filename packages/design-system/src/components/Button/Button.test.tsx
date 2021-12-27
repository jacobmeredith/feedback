import { render, screen } from "@testing-library/react"
import { Button } from "./Button";

describe('<Button />', () => {
  it('should render children correctly', () => {
    render(<Button type="primary">Hello</Button>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should call the onClick prop when button is clicked', () => {
    const mockOnClick = jest.fn();

    render(<Button type="primary" onClick={mockOnClick}>Hello</Button>);

    screen.getByText('Hello').click();
    
    expect(mockOnClick).toHaveBeenCalled();
  });
})