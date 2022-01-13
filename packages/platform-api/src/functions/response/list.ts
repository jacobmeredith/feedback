import { responseNotOk, responseOk } from '@feedback/common';

import { APIGatewayProxyEvent } from 'aws-lambda';
import { ResponseType } from './../../data/schema';
import client from './../../data/client';

const handler = async ({ pathParameters }: APIGatewayProxyEvent) => {
  try {
    const { surveyId } = pathParameters as { surveyId: string };

    const Response = client.getModel<ResponseType>("Response");
    const responses = await Response.find({ pk: `SURVEY#${surveyId}`, sk: { begins_with: 'RESPONSE#' } });
  
    if (responses.length > 0) {
      return responseOk(responses);
    }

    return responseNotOk({ body: {}, message: "No responses found" });
  } catch (error: any) {
    return responseNotOk({ body: {}, message: error.message });
  }
};

export {handler};
