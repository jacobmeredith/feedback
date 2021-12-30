import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { client } from "../../helpers/dynamoClient";
import { getRepsonses } from "../../helpers/feedbackHelpers";
import { responseNotOk, responseOk } from "../../helpers/responses";

export const get = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const {userId, id} = event.pathParameters as ({userId: string, id: string});

    const surveyParams = {
      TableName: process.env.TABLE_NAME||"",
      Key: {
        "userId": {"S": userId},
        "type": {"S": `capture|${id}`}
      },
    };

    const feedback = await client.getItem(surveyParams).promise();

    if (!feedback.Item) {
      return responseNotOk({message: "Could not get feedback"});
    }

    const responses = await getRepsonses(userId, feedback.Item.type.S?.split('|')[1]||'');

    const feedbackResponse = {
      type: feedback.Item.type.S,
      feedbackType: feedback.Item.feedbackType.S,
      feedbackTitle: feedback.Item.feedbackTitle.S,
      feedbackUrl: feedback.Item.feedbackUrl.S,
      feedbackResponses: responses
    }
  
    return responseOk(feedbackResponse);
  } catch (error: any) {
    return responseNotOk({message: "Error getting feedback"});
  }
};
