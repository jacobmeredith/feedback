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

export const responseOk = (body = {}) => {
  return {
    statusCode: 200,
    body: JSON.stringify(body)
  }
};

export const responseNotOk = ({body = {}, message = ''}: {body?: any, message?: string}) => {
  const res = {...body, message};

  return {
    statusCode: 500,
    body: JSON.stringify(res)
  }
};
