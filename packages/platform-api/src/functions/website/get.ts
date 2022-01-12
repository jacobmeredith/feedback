import { responseNotOk, responseOk } from '@feedback/common';

import { APIGatewayProxyEvent } from 'aws-lambda';
import { WebsiteType } from './../../data/schema';
import client from './../../data/client';

const handler = async ({ pathParameters }: APIGatewayProxyEvent) => {
  try {
    const { userId, websiteId } = pathParameters as { userId: string, websiteId: string };

    const Website = client.getModel<WebsiteType>("Website");
    const website = await Website.get({ pk: `USER#${userId}`, sk: `WEBSITE#${websiteId}` });
  
    if (website) {
      return responseOk(website);
    }

    return responseNotOk({ body: {}, message: "Website not found" });
  } catch (error: any) {
    return responseNotOk({ body: {}, message: error.message });
  }
};

export {handler};
