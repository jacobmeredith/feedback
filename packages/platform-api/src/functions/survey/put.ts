import { responseNotOk, responseOk } from '@feedback/common';

import { APIGatewayProxyEvent } from 'aws-lambda';
import { SurveyType } from './../../data/schema';
import client from './../../data/client';

const handler = async ({ body = null, pathParameters }: APIGatewayProxyEvent) => {
  try {
    if (!body) {
      return responseNotOk({ body: {}, message: "No body was provided" });
    }

    const { websiteId, surveyId } = pathParameters as { websiteId: string, surveyId: string };
    const bodyParsed = JSON.parse(body);

    const Survey = client.getModel<SurveyType>("Survey");
    const survey = await Survey.update({ 
      pk: `WEBSITE#${websiteId}`,
      sk: `SURVEY#${surveyId}`,
      type: 'WEBSITE',
      websiteId: websiteId,
      surveyId: surveyId,
      surveyType: bodyParsed.surveyType,
      name: bodyParsed.name,
      url: bodyParsed.url
    });
  
    return responseOk(survey);
  } catch (error: any) {
    return responseNotOk({ body: {}, message: error.message });
  }
};

export {handler};
