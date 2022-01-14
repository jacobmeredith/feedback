import { render, screen } from "@testing-library/react";

import { SurveyDeleteForm } from "./SurveyDeleteForm";

describe("<SurveyDeleteForm />", () => {
  it("should render", () => {
    render(<SurveyDeleteForm survey={{ websiteId: 'string', surveyId: 'string', surveyType: 'string', name: 'string', url: 'string' }} onClose={jest.fn} />);
    expect(screen.getByText("Permanently delete")).toBeInTheDocument();
  });
});
