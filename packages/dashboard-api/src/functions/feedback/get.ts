import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { responseOk, responseNotOk } from "@feedback/common";
import { httpClient } from "../../helpers/httpClient";

export const get = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const {userId, id} = event.pathParameters as ({userId: string, id: string});

    const response = await httpClient.get(`/feedback/${userId}/${id}`);

    if (response.status === 200) {
      return responseOk(response.data);
    }
  
    return responseNotOk({message: "Error getting feedback"});
  } catch (error: any) {
    return responseNotOk({message: "Error getting feedback"});
  }
};
