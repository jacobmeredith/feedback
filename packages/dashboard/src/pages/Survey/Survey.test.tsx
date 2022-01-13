import { render, screen } from '@testing-library/react';

import { Survey } from './Survey';

describe("<Feedback />", () => {
  it ("should render survey", () => {
    render(<Survey />);
    expect(screen.getByText("Survey")).toBeInTheDocument();
  });
});
