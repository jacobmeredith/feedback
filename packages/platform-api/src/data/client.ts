import Dynamo from 'dynamodb-onetable/Dynamo';
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import Schema from './schema';
import {Table} from 'dynamodb-onetable';

const client = new Dynamo({
  client: new DynamoDBClient({ 
    region: process.env.TABLE_REGION,
    endpoint: process.env.TABLE_ENDPOINT 
  })
});

const table = new Table({
  client: client,
  name: process.env.TABLE_NAME,
  schema: Schema,
});

export default table;
