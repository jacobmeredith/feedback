import { responseNotOk, responseOk } from '@feedback/common';

import { APIGatewayProxyEvent } from 'aws-lambda';
import { SurveyType } from './../../data/schema';
import client from './../../data/client';

const handler = async ({ pathParameters }: APIGatewayProxyEvent) => {
  try {
    const { websiteId, surveyId } = pathParameters as { websiteId: string, surveyId: string };

    const Survey = client.getModel<SurveyType>("Survey");
    const survey = await Survey.get({ pk: `WEBSITE#${websiteId}`, sk: `SURVEY#${surveyId}` });
  
    if (survey) {
      return responseOk(survey);
    }

    return responseNotOk({ body: {}, message: "Survey not found" });
  } catch (error: any) {
    return responseNotOk({ body: {}, message: error.message });
  }
};

export {handler};