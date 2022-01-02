import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { httpClient } from "../../helpers/httpClient";
import { responseOk, responseNotOk } from "@feedback/common";

export const list = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const {userId} = event.pathParameters as ({userId: string});
    // figure out way to get all capture and response for a user in one query
    
    const res = await httpClient.get(`/feedback/${userId}`);
  
    return responseOk(res.data);
  } catch (error: any) {
    console.log(error);
    return responseNotOk({message: "Error getting items"});
  }
};
