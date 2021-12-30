export type ItemTypes = 'response'|'capture';

export interface IFeedbackSurvey {
  type: string;
  feedbackType: string;
  feedbackTitle: string;
  feedbackUrl: string;
  feedbackResponses: IFeedbackResponse[];
}

export interface IFeedbackResponse {
  type: string;
  feedbackValue: {
    value: string;
    text: string;
  }
}
