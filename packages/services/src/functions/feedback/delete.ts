import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { client } from "../../helpers/dynamoClient";
import { responseOk, responseNotOk } from "@feedback/common";

export const del = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const {userId = "", id = ""} = event.pathParameters as ({userId: string, id: string});

    const params = {
      Key: {
        "userId": {"S": userId},
        "type": {"S": `capture|${id}`}
      },
      TableName: process.env.TABLE_NAME||"",
    };
    
    await client.deleteItem(params).promise();
  
    return responseOk();
  } catch (error: any) {
    console.log(error);
    return responseNotOk({message: "Error getting items"});
  }
};