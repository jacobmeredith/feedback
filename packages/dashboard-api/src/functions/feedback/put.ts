import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { httpClient } from "../../helpers/httpClient";
import { responseOk, responseNotOk } from "@feedback/common";

export const put = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body||"");

    const res = await httpClient.put(`/feedback`, body);
  
    return responseOk(res.data);
  } catch (error: any) {
    console.log(error);
    return responseNotOk({message: "Error getting items"});
  }
};