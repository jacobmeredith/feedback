import { responseNotOk, responseOk } from '@feedback/common';

import { APIGatewayProxyEvent } from 'aws-lambda';
import { SurveyType } from './../../data/schema';
import client from './../../data/client';

const handler = async ({ pathParameters }: APIGatewayProxyEvent) => {
  try {
    const { websiteId } = pathParameters as { websiteId: string };

    const Survey = client.getModel<SurveyType>("Survey");
    const surveys = await Survey.find({ pk: `WEBSITE#${websiteId}`, sk: { begins_with: 'SURVEY#' } });
  
    if (surveys.length > 0) {
      return responseOk(surveys);
    }

    return responseNotOk({ body: {}, message: "No surveys found" });
  } catch (error: any) {
    return responseNotOk({ body: {}, message: error.message });
  }
};

export {handler};
