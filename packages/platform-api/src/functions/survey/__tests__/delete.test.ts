import { APIGatewayProxyEvent } from 'aws-lambda';
import client from '../../../data/client';
import { handler } from './../delete';

jest.mock('dynamodb-onetable');
jest.mock('../../../data/client');

describe("delete.ts", () => {
  it("should return OK if a survey is deleted", async () => {
    (client as any).getModel.mockImplementation(() => ({
      remove: () => true
    }));

    const event: APIGatewayProxyEvent = {
      pathParameters: {
        websiteId: "websiteId",
        surveyId: "surveyId",
      }
    } as any;

    const res = await handler(event);

    expect(res).toEqual({
      statusCode: 200,
      body: "{}"
    });
  });

  it("should return an internal server error if an error is thrown", async () => {
    (client as any).getModel.mockImplementation(() => ({
      remove: () => {
        throw new Error("Something went wrong")
      }
    }));

    const event: APIGatewayProxyEvent = {
      pathParameters: {
        websiteId: "websiteId",
        surveyId: "surveyId",
      }
    } as any;

    const res = await handler(event);

    expect(res).toEqual({
      statusCode: 500,
      body: JSON.stringify({ message: "Something went wrong" }),
    });
  });
});