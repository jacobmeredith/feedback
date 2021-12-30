import { client } from "./dynamoClient";

export const getRepsonses = async (userId: string, id: string) => {
  const captureParams = {
    KeyConditionExpression: 'userId = :userId and begins_with(#type, :type)',
    ExpressionAttributeNames: { "#type": "type" },
    ExpressionAttributeValues: {
      ':userId': {'S': userId},
      ':type': {'S': `response|${id}`}
    },
    TableName: process.env.TABLE_NAME||"",
  };

  const responses = await client.query(captureParams).promise();
  const responseArray = responses.Items ? responses.Items : [];
  return responseArray.map(response => ({
    type: response.type.S,
    feedbackValue: {
      value: response.feedbackValue.M?.value.S,
      text: response.feedbackValue.M?.text.S,
    }
  }));
}