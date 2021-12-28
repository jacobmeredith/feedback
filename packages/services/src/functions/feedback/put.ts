import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { client } from "../../helpers/dynamoClient";
import { responseNotOk, responseOk } from "../../helpers/responses";
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
          S: `capture|${uuidv4()}`
        },
        feedbackType: {
          S: body?.feedbackType
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
      feedbackUrl: body.feedbackUrl
    });
  } catch (error: any) {
    console.log(error);
    return responseNotOk({message: "Error getting items"});
  }
};