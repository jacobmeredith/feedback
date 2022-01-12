import { responseNotOk, responseOk } from '@feedback/common';

import { APIGatewayProxyEvent } from 'aws-lambda';
import { ResponseType } from './../../data/schema';
import client from './../../data/client';

const handler = async ({ body = null, pathParameters }: APIGatewayProxyEvent) => {
  try {
    if (!body) {
      return responseNotOk({ body: {}, message: "No body was provided" });
    }

    const { surveyId, responseId } = pathParameters as { surveyId: string, responseId: string };
    const bodyParsed = JSON.parse(body);

    const Response = client.getModel<ResponseType>("Response");
    const response = await Response.update({ 
      pk: `SURVEY#${surveyId}`,
      sk: `RESPONSE#${responseId}`,
      type: 'RESPONSE',
      surveyId: surveyId,
      responseId: responseId,
      responseData: {
        value: bodyParsed.value,
      }
    });
  
    return responseOk(response);
  } catch (error: any) {
    return responseNotOk({ body: {}, message: error.message });
  }
};

export {handler};
