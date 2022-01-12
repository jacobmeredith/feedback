import { APIGatewayProxyEvent } from 'aws-lambda';
import get from './../get';

describe("get.ts", () => {
  it("should return a default response", async () => {
    const event: APIGatewayProxyEvent = {
    } as any;

    const res = await get(event);

    expect(res).toEqual({
      statusCode: 200,
      body: "OK"
    });
  });
});