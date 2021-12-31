import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { client } from "../../helpers/dynamoClient";
import { getRepsonses } from "../../helpers/feedbackHelpers";
import { responseOk, responseNotOk } from "@feedback/common";

export const list = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const {userId} = event.pathParameters as ({userId: string});
    // figure out way to get all capture and response for a user in one query
    const params = {
      KeyConditionExpression: 'userId = :userId and begins_with(#type, :type)',
      ExpressionAttributeNames: { "#type": "type" },
      ExpressionAttributeValues: {
        ':userId': {'S': userId},
        ':type': {'S': 'capture'}
      },
      TableName: process.env.TABLE_NAME||"",
    };

    const result = await client.query(params).promise();
    
    if (result.Items?.length === 0) {
      return responseNotOk({message: "Could not get items"});
    }

    const items = result.Items||[];

    const results: any[] = await Promise.all(items.map(async (item: any): Promise<any> => {
      const responses = await getRepsonses(userId, item.type.S.split('|')[1]||'');
      return {
        type: item.type.S,
        feedbackType: item.feedbackType.S,
        feedbackTitle: item.feedbackTitle.S,
        feedbackUrl: item.feedbackUrl.S,
        feedbackResponses: responses
      }
    }));
  
    return responseOk(results);
  } catch (error: any) {
    console.log(error);
    return responseNotOk({message: "Error getting items"});
  }
};
