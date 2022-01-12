import { responseNotOk, responseOk } from '@feedback/common';

import { APIGatewayProxyEvent } from 'aws-lambda';
import { ResponseType } from './../../data/schema';
import client from './../../data/client';
import { v4 as uuid4 } from 'uuid';

const handler = async ({ body = null, pathParameters }: APIGatewayProxyEvent) => {
  try {
    if (!body) {
      return responseNotOk({ body: {}, message: "No body was provided" });
    }
    const { surveyId } = pathParameters as { surveyId: string };
    const bodyParsed = JSON.parse(body);

    const id = uuid4();
  
    const Response = client.getModel<ResponseType>("Website");
    const response = await Response.create({
      pk: `SURVEY#${surveyId}`,
      sk: `RESPONSE#${id}`,
      type: "RESPONSE",
      surveyId: surveyId,
      responseId: id,
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
