import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { httpClient } from "../../helpers/httpClient";
import { responseOk, responseNotOk } from "@feedback/common";

export const del = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const {userId = "", id = ""} = event.pathParameters as ({userId: string, id: string});

    await httpClient.delete(`/feedback/${userId}/${id}`);
  
    return responseOk();
  } catch (error: any) {
    console.log(error);
    return responseNotOk({message: "Error getting items"});
  }
};