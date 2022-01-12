import { APIGatewayProxyEvent } from 'aws-lambda';
import client from '../../../data/client';
import { handler } from './../list';

jest.mock('dynamodb-onetable');
jest.mock('../../../data/client');

describe("list.ts", () => {
  it("should return OK if a list of responses are found", async () => {
    const expectedResponse = [
      {
        "surveyId": "surveyId",
        "responseId": "responseId",
        "responseData": {
          "value": "red"
        }
      },
      {
        "surveyId": "surveyId",
        "responseId": "responseId",
        "responseData": {
          "value": "red"
        }
      }
    ];

    (client as any).getModel.mockImplementation(() => ({
      find: () => expectedResponse
    }));

    const event: APIGatewayProxyEvent = {
      pathParameters: {
        surveyId: "surveyId"
      }
    } as any;

    const res = await handler(event);

    expect(res).toEqual({
      statusCode: 200,
      body: JSON.stringify(expectedResponse)
    });
  });

  it("should return an internal server error if no responses are found", async () => {
    (client as any).getModel.mockImplementation(() => ({
      find: () => []
    }));

    const event: APIGatewayProxyEvent = {
      pathParameters: {
        surveyId: "surveyId"
      }
    } as any;

    const res = await handler(event);

    expect(res).toEqual({
      statusCode: 500,
      body: JSON.stringify({ message: "No responses found" }),
    });
  });

  it("should return an internal server error if an error is thrown", async () => {
    (client as any).getModel.mockImplementation(() => ({
      find: () => {
        throw new Error("Something went wrong")
      }
    }));

    const event: APIGatewayProxyEvent = {
      pathParameters: {
        surveyId: "surveyId"
      }
    } as any;

    const res = await handler(event);

    expect(res).toEqual({
      statusCode: 500,
      body: JSON.stringify({ message: "Something went wrong" }),
    });
  });
});