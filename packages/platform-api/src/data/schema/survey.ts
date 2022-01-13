export const SurveySchema = {
  pk:         { type: String, value: 'WEBSITE:${websiteId}' },
  sk:         { type: String, value: 'SURVEY:${surveyId}' },
  type:       { type: String, value: 'SURVEY' },
  websiteId:  { type: String, uuid: 'uuid' },
  surveyId:   { type: String, uuid: 'uuid' },
  surveyType: { type: String },
  name:       { type: String },
  url:        { type: String },
}
