import client, { WebsiteType } from './../../data/client';
import { responseNotOk, responseOk } from '@feedback/common';

import { APIGatewayProxyEvent } from 'aws-lambda';
import { v4 as uuid4 } from 'uuid';

const handler = async ({ body = null, pathParameters }: APIGatewayProxyEvent) => {
  try {
    if (!body) {
      return responseNotOk({ body: {}, message: "No body was provided" });
    }
    const { userId } = pathParameters as { userId: string };
    const bodyParsed = JSON.parse(body);

    const id = uuid4();
  
    const Website = client.getModel<WebsiteType>("Website");
    const website = await Website.create({
      pk: `USER#${userId}`,
      sk: `WEBSITE#${id}`,
      type: "WEBSITE",
      userId: userId,
      websiteId: id,
      name: bodyParsed.name,
      url: bodyParsed.url
    });

    return responseOk(website);
  } catch (error: any) {
    return responseNotOk({ body: {}, message: error.message });
  }
};

export {handler};
