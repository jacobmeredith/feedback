import client, { WebsiteType } from './../../data/client';
import { responseNotOk, responseOk } from '@feedback/common';

import { APIGatewayProxyEvent } from 'aws-lambda';

const handler = async ({ body = null, pathParameters }: APIGatewayProxyEvent) => {
  try {
    if (!body) {
      return responseNotOk({ body: {}, message: "No body was provided" });
    }

    const { userId, websiteId } = pathParameters as { userId: string, websiteId: string };
    const bodyParsed = JSON.parse(body);

    const Website = client.getModel<WebsiteType>("Website");
    const website = await Website.update({ 
      pk: `USER#${userId}`,
      sk: `WEBSITE#${websiteId}`,
      type: 'WEBSITE',
      userId: userId,
      websiteId: websiteId,
      name: bodyParsed.name,
      url: bodyParsed.url
    });
  
    return responseOk(website);
  } catch (error: any) {
    return responseNotOk({ body: {}, message: error.message });
  }
};

export {handler};
