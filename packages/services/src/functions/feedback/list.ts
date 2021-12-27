import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { client } from "../../helpers/dynamoClient";
import { responseNotOk, responseOk } from "../../helpers/responses";

export const list = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const {userId} = event.pathParameters as ({userId: string});

    const params = {
      KeyConditionExpression: 'userId = :userId and begins_with(#type, :type)',
      ExpressionAttributeNames: { "#type": "type" },
      ExpressionAttributeValues: {
        ':userId': {'S': userId},
        ':type': {'S': 'capture'}
      },
      TableName: process.env.TABLE_NAME||"",
    };
    var result = await client.query(params).promise();

    if (result.Items?.length === 0) {
      return responseNotOk({message: "Could not get items"});
    }

    const feedbackResponse = result.Items?.map(item => ({
      type: item.type.S,
      feedbackType: item.feedbackType.S,
      feedbackUrl: item.feedbackUrl.S,
    }));
  
    return responseOk(feedbackResponse);
  } catch (error: any) {
    console.log(error);
    return responseNotOk({message: "Error getting items"});
  }
};
