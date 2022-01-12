import { responseNotOk, responseOk } from '@feedback/common';

import { APIGatewayProxyEvent } from 'aws-lambda';
import { WebsiteType } from './../../data/schema';
import client from './../../data/client';

const handler = async ({ pathParameters }: APIGatewayProxyEvent) => {
  try {
    const { userId } = pathParameters as { userId: string };

    const Website = client.getModel<WebsiteType>("Website");
    const websites = await Website.find({ pk: `USER#${userId}`, sk: { begins_with: 'WEBSITE#' } });
  
    if (websites.length > 0) {
      return responseOk(websites);
    }

    return responseNotOk({ body: {}, message: "No websites found" });
  } catch (error: any) {
    return responseNotOk({ body: {}, message: error.message });
  }
};

export {handler};
