import { APIGatewayProxyEvent } from 'aws-lambda';
import client from '../../../data/client';
import { handler } from './../get';

jest.mock('dynamodb-onetable');
jest.mock('../../../data/client');

describe("get.ts", () => {
  it("should return OK if a survey is found", async () => {
    const expectedResponse = {
      "websiteId": "websiteId",
      "surveyId": "surveyId",
      "surveyType": "traffic",
      "name": "My Survey",
      "url": "https://www.mywebsite.com/new-page"
    };

    (client as any).getModel.mockImplementation(() => ({
      get: () => expectedResponse
    }));

    const event: APIGatewayProxyEvent = {
      pathParameters: {
        websiteId: "userId",
        surveyId: "surveyId",
      }
    } as any;

    const res = await handler(event);

    expect(res).toEqual({
      statusCode: 200,
      body: JSON.stringify(expectedResponse)
    });
  });

  it("should return an internal server error if no survey is found", async () => {
    (client as any).getModel.mockImplementation(() => ({
      get: () => null
    }));

    const event: APIGatewayProxyEvent = {
      pathParameters: {
        websiteId: "userId",
        surveyId: "surveyId",
      }
    } as any;

    const res = await handler(event);

    expect(res).toEqual({
      statusCode: 500,
      body: JSON.stringify({ message: "Survey not found" }),
    });
  });

  it("should return an internal server error if an error is thrown", async () => {
    (client as any).getModel.mockImplementation(() => ({
      get: () => {
        throw new Error("Something went wrong")
      }
    }));

    const event: APIGatewayProxyEvent = {
      pathParameters: {
        websiteId: "userId",
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