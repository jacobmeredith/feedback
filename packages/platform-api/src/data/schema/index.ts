import {Entity} from 'dynamodb-onetable';
import {ResponseSchema} from './response';
import {SurveySchema} from './survey';
import {WebsiteSchema} from './website';

const Schema = {
  version: '0.0.1',
  indexes: {
    primary: { hash: 'pk', sort: 'sk' },
  },
  models: {
    Website: WebsiteSchema,
    Survey: SurveySchema,
    Response: ResponseSchema
  } as const
};

type WebsiteType = Entity<typeof WebsiteSchema>;
type SurveyType = Entity<typeof SurveySchema>;
type ResponseType = Entity<typeof ResponseSchema>;

export { WebsiteType, SurveyType, ResponseType };
export default Schema;