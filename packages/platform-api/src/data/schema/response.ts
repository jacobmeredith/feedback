export const ResponseSchema = {
  pk:           { type: String, value: 'SURVEY:${surveyId}' },
  sk:           { type: String, value: 'RESPONSE:${responseId}' },
  type:         { type: String, value: 'RESPONSE' },
  surveyId:     { type: String, uuid: 'uuid' },
  responseId:   { type: String, uuid: 'uuid' },
  responseData: { 
    type: Object, 
    schema: {
      value:    { type: String },
      text:     { type: String }
    }
  }
}
