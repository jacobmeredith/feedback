import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { client } from "../../helpers/dynamoClient";
import { responseOk, responseNotOk } from "@feedback/common";
import { v4 as uuidv4 } from 'uuid';

export const put = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body||"");

    const params = {
      Item: {
        userId: {
          S: body?.userId
        },
        type: {
          S: `capture|${body?.feedbackId||uuidv4()}`
        },
        feedbackType: {
          S: body?.feedbackType
        },
        feedbackTitle: {
          S: body?.feedbackTitle
        },
        feedbackUrl: {
          S: body?.feedbackUrl
        }
      },
      TableName: process.env.TABLE_NAME||"",
    };
    
    await client.putItem(params).promise();
  
    return responseOk({
      type: body.type,
      feedbackType: body.feedbackType,
      feedbackTitle: body.feedbackTitle,
      feedbackUrl: body.feedbackUrl
    });
  } catch (error: any) {
    console.log(error);
    return responseNotOk({message: "Error getting items"});
  }
};