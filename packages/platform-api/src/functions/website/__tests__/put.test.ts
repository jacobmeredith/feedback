import { APIGatewayProxyEvent } from 'aws-lambda';
import client from '../../../data/client';
import { handler } from './../put';

jest.mock('dynamodb-onetable');
jest.mock('../../../data/client');

describe("put.ts", () => {
  it("should return OK if a website is updated", async () => {
    const expectedResponse = {
      "userId": "userId",
      "websiteId": "websiteId",
      "name": "My Website 1",
      "url": "https://www.mywebsite.com 1"
    };

    (client as any).getModel.mockImplementation(() => ({
      update: () => expectedResponse
    }));

    const event: APIGatewayProxyEvent = {
      pathParameters: {
        userId: "userId",
        websiteId: "websiteId",
      },
      body: JSON.stringify({
        name: "My Website 1",
        url: "https://www.mywebsite.com 1"
      })
    } as any;

    const res = await handler(event);

    expect(res).toEqual({
      statusCode: 200,
      body: JSON.stringify(expectedResponse)
    });
  });

  it("should return an internal server error if no body is provided", async () => {
    const event: APIGatewayProxyEvent = {
      pathParameters: {
        userId: "userId",
        websiteId: "websiteId",
      }
    } as any;

    const res = await handler(event);

    expect(res).toEqual({
      statusCode: 500,
      body: JSON.stringify({ message: "No body was provided" }),
    });
  });

  it("should return an internal server error if an error is thrown", async () => {
    (client as any).getModel.mockImplementation(() => ({
      update: () => {
        throw new Error("Something went wrong")
      }
    }));

    const event: APIGatewayProxyEvent = {
      pathParameters: {
        userId: "userId",
        websiteId: "websiteId",
      },
      body: JSON.stringify({
        name: "My Website 1",
        url: "https://www.mywebsite.com 1"
      })
    } as any;

    const res = await handler(event);

    expect(res).toEqual({
      statusCode: 500,
      body: JSON.stringify({ message: "Something went wrong" }),
    });
  });
});