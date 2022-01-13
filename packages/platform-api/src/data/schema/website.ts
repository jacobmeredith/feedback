export const WebsiteSchema = {
  pk:        { type: String, value: 'USER:${userId}' },
  sk:        { type: String, value: 'WEBSITE:${websiteId}' },
  type:      { type: String, value: 'WEBSITE' },
  userId:    { type: String, uuid: 'uuid' },
  websiteId: { type: String, uuid: 'uuid' },
  name:      { type: String },
  url:       { type: String },
};
