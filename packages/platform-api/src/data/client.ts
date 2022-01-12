import {Entity, Table} from 'dynamodb-onetable';

import Dynamo from 'dynamodb-onetable/Dynamo';
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';

const client = new Dynamo({client: new DynamoDBClient({ region: 'eu-west-1', endpoint: process.env.TABLE_ENDPOINT })});

const Schema = {
  version: '0.0.1',
  indexes: {
    primary: { hash: 'pk', sort: 'sk' },
  },
  models: {
    Website: {
      pk:           { type: String, value: 'USER:${userId}' },
      sk:           { type: String, value: 'WEBSITE:${websiteId}' },
      type:         { type: String, value: 'WEBSITE' },
      userId:       { type: String, uuid: 'uuid' },
      websiteId:    { type: String, uuid: 'uuid' },
      name:         { type: String },
      url:          { type: String },
    },
    Survey: {
      pk:           { type: String, value: 'WEBSITE:${websiteId}' },
      sk:           { type: String, value: 'SURVEY:${surveyId}' },
      type:         { type: String, value: 'SURVEY' },
      websiteId:    { type: String, uuid: 'uuid' },
      surveyId:     { type: String, uuid: 'uuid' },
      surveyType:   { type: String },
      name:         { type: String },
      url:          { type: String },
    },
    Response: {
      pk:           { type: String, value: 'SURVEY:${surveyId}' },
      sk:           { type: String, value: 'RESPONSE:${responseId}' },
      type:         { type: String, value: 'RESPONSE' },
      surveyId:     { type: String, uuid: 'uuid' },
      responseId:   { type: String, uuid: 'uuid' },
      responseData: { 
        type: Object, schema: {
          value:    { type: String },
          text:     { type: String }
        }
      }
    }
  } as const
};

type WebsiteType = Entity<typeof Schema.models.Website>;
type SurveyType = Entity<typeof Schema.models.Survey>;
type ResponseType = Entity<typeof Schema.models.Response>;

const table = new Table({
  client: client,
  name: process.env.TABLE_NAME,
  schema: Schema,
});

export { WebsiteType, SurveyType, ResponseType };
export default table;
