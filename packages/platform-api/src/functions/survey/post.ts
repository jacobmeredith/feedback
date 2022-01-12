import { responseNotOk, responseOk } from '@feedback/common';

import { APIGatewayProxyEvent } from 'aws-lambda';
import { SurveyType } from './../../data/schema';
import client from './../../data/client';
import { v4 as uuid4 } from 'uuid';

const handler = async ({ body = null, pathParameters }: APIGatewayProxyEvent) => {
  try {
    if (!body) {
      return responseNotOk({ body: {}, message: "No body was provided" });
    }
    const { websiteId } = pathParameters as { websiteId: string };
    const bodyParsed = JSON.parse(body);

    const id = uuid4();
  
    const Survey = client.getModel<SurveyType>("Survey");
    const survey = await Survey.create({
      pk: `WEBSITE#${websiteId}`,
      sk: `SURVEY#${id}`,
      type: "WEBSITE",
      websiteId: websiteId,
      surveyId: id,
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
