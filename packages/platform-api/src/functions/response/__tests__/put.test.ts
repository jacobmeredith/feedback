import { APIGatewayProxyEvent } from 'aws-lambda';
import client from '../../../data/client';
import { handler } from './../put';

jest.mock('dynamodb-onetable');
jest.mock('../../../data/client');

describe("put.ts", () => {
  it("should return OK if a response is updated", async () => {
    const expectedResponse = {
      "surveyId": "surveyId",
      "responseId": "responseId",
      "responseData": {
        "value": "red",
      }
    };

    (client as any).getModel.mockImplementation(() => ({
      update: () => expectedResponse
    }));

    const event: APIGatewayProxyEvent = {
      pathParameters: {
        surveyId: "surveyId",
        responseId: "responseId",
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
        responseId: "responseId",
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
        surveyId: "surveyId",
        responseId: "responseId",
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