import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export const hello = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello world',
      input: event,
    })
  };
};
