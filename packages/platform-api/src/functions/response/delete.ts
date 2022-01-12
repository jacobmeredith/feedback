import { responseNotOk, responseOk } from '@feedback/common';

import { APIGatewayProxyEvent } from 'aws-lambda';
import { ResponseType } from './../../data/schema';
import client from './../../data/client';

const handler = async ({ pathParameters }: APIGatewayProxyEvent) => {
  try {
    const { surveyId, responseId } = pathParameters as { surveyId: string, responseId: string };

    const Response = client.getModel<ResponseType>("Response");
    await Response.remove({ pk: `SURVEY#${surveyId}`, sk: `RESPONSE#${responseId}` });
    return responseOk();
  } catch (error: any) {
    return responseNotOk({ body: {}, message: error.message });
  }
};

export {handler};
