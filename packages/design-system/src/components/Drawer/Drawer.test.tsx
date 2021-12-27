import { render, screen } from "@testing-library/react"
import { Drawer } from "./Drawer";

describe('<Drawer />', () => {
  it('should render children correctly', () => {
    render(<Drawer open={false}>Hello</Drawer>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should call the onClose prop when close button is clicked', () => {
    const mockOnClose = jest.fn();
    
    render(<Drawer open={true} onClose={mockOnClose}>Hello</Drawer>);

    screen.getByTestId('drawer-close').click();
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should call the onClose prop when close overlay is clicked', () => {
    const mockOnClose = jest.fn();
    
    render(<Drawer open={true} onClose={mockOnClose}>Hello</Drawer>);

    screen.getByTestId('drawer-overlay').click();
    
    expect(mockOnClose).toHaveBeenCalled();
  });
})