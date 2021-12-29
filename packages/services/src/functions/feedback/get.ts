import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { client } from "../../helpers/dynamoClient";
import { responseNotOk, responseOk } from "../../helpers/responses";

export const get = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const {userId, id} = event.pathParameters as ({userId: string, id: string});

    const params = {
      TableName: process.env.TABLE_NAME||"",
      Key: {
        "userId": {"S": userId},
        "type": {"S": `capture|${id}`}
      },
    };

    const feedback = await client.getItem(params).promise();

    if (!feedback.Item) {
      return responseNotOk({message: "Could not get feedback"});
    }

    const feedbackResponse = {
      type: feedback.Item.type.S,
      feedbackType: feedback.Item.feedbackType.S,
      feedbackTitle: feedback.Item.feedbackTitle.S,
      feedbackUrl: feedback.Item.feedbackUrl.S,
    }
  
    return responseOk(feedbackResponse);
  } catch (error: any) {
    return responseNotOk({message: "Error getting feedback"});
  }
};
