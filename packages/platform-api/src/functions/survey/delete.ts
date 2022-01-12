import { responseNotOk, responseOk } from '@feedback/common';

import { APIGatewayProxyEvent } from 'aws-lambda';
import { SurveyType } from './../../data/schema';
import client from './../../data/client';

const handler = async ({ pathParameters }: APIGatewayProxyEvent) => {
  try {
    const { websiteId, surveyId } = pathParameters as { websiteId: string, surveyId: string };

    const Survey = client.getModel<SurveyType>("Survey");
    await Survey.remove({ pk: `WEBSITE#${websiteId}`, sk: `SURVEY#${surveyId}` });
    return responseOk();
  } catch (error: any) {
    return responseNotOk({ body: {}, message: error.message });
  }
};

export {handler};
