import { APIGatewayProxyEvent } from 'aws-lambda';
import client from '../../../data/client';
import { handler } from './../post';
import { v4 as uuid4 } from 'uuid';

jest.mock('dynamodb-onetable');
jest.mock('../../../data/client');
jest.mock('uuid');

describe("post.ts", () => {
  it("should return OK if a survey is created", async () => {
    const expectedResponse = {
      "websiteId": "websiteId",
      "surveyId": "surveyId",
      "surveyType": "traffic",
      "name": "My Website",
      "url": "https://www.mywebsite.com/test"
    };

    (uuid4 as any).mockResolvedValue(() => "surveyId");

    (client as any).getModel.mockImplementation(() => ({
      create: () => expectedResponse
    }));

    const event: APIGatewayProxyEvent = {
      pathParameters: {
        websiteId: "websiteId",
      },
      body: JSON.stringify({
        surveyType: "traffic",
        name: "My Website",
        url: "https://www.mywebsite.com/test"
      })
    } as any;

    const res = await handler(event);

    expect(res).toEqual({
      statusCode: 200,
      body: JSON.stringify(expectedResponse)
    });
  });

  it("should return an internal server error if no survey body is provided", async () => {
    const event: APIGatewayProxyEvent = {
      pathParameters: {
        websiteId: "websiteId",
      }
    } as any;

    const res = await handler(event);

    expect(res).toEqual({
      statusCode: 500,
      body:  JSON.stringify({ message: "No body was provided" }),
    });
  });

  it("should return an internal server error if an error is thrown", async () => {
    (uuid4 as any).mockResolvedValue(() => "surveyId");

    (client as any).getModel.mockImplementation(() => ({
      create: () => {
        throw new Error("Something went wrong")
      }
    }));

    const event: APIGatewayProxyEvent = {
      pathParameters: {
        websiteId: "websiteId",
      },
      body: JSON.stringify({
        name: "My Website",
        url: "https://www.mywebsite.com/test"
      })
    } as any;

    const res = await handler(event);

    expect(res).toEqual({
      statusCode: 500,
      body: JSON.stringify({ message: "Something went wrong" }),
    });
  });
});