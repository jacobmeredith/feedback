import { APIGatewayProxyEvent } from 'aws-lambda';

const handler = async (event: APIGatewayProxyEvent) => {
  return {
    statusCode: 200,
    body: "OK"
  }
};

export default handler;
