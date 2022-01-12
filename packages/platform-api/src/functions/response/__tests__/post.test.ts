import { APIGatewayProxyEvent } from 'aws-lambda';
import client from '../../../data/client';
import { handler } from './../post';
import { v4 as uuid4 } from 'uuid';

jest.mock('dynamodb-onetable');
jest.mock('../../../data/client');
jest.mock('uuid');

describe("post.ts", () => {
  it("should return OK if a website is created", async () => {
    const expectedResponse = {
      "surveyId": "surveyId",
      "responseId": "responseId",
      "responseData": {
        "value": "red",
      }
    };

    (uuid4 as any).mockResolvedValue(() => "responseId");

    (client as any).getModel.mockImplementation(() => ({
      create: () => expectedResponse
    }));

    const event: APIGatewayProxyEvent = {
      pathParameters: {
        surveyId: "surveyId",
      },
      body: JSON.stringify({
        value: "red",
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
        surveyId: "surveyId",
      }
    } as any;

    const res = await handler(event);

    expect(res).toEqual({
      statusCode: 500,
      body:  JSON.stringify({ message: "No body was provided" }),
    });
  });

  it("should return an internal server error if an error is thrown", async () => {
    (uuid4 as any).mockResolvedValue(() => "websiteId");

    (client as any).getModel.mockImplementation(() => ({
      create: () => {
        throw new Error("Something went wrong")
      }
    }));

    const event: APIGatewayProxyEvent = {
      pathParameters: {
        surveyId: "surveyId",
      },
      body: JSON.stringify({
        value: "red",
      })
    } as any;

    const res = await handler(event);

    expect(res).toEqual({
      statusCode: 500,
      body: JSON.stringify({ message: "Something went wrong" }),
    });
  });
});