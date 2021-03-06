import { responseNotOk, responseOk } from '@feedback/common';

import { APIGatewayProxyEvent } from 'aws-lambda';
import { ResponseType } from './../../data/schema';
import client from './../../data/client';

const handler = async ({ pathParameters }: APIGatewayProxyEvent) => {
  try {
    const { surveyId, responseId } = pathParameters as { surveyId: string, responseId: string };

    const Response = client.getModel<ResponseType>("Response");
    const response = await Response.get({ pk: `SURVEY#${surveyId}`, sk: `RESPONSE#${responseId}` });
  
    if (response) {
      return responseOk(response);
    }

    return responseNotOk({ body: {}, message: "Response not found" });
  } catch (error: any) {
    return responseNotOk({ body: {}, message: error.message });
  }
};

export {handler};
