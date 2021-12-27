import AWS from 'aws-sdk';

AWS.config.update({region: "eu-west-1"});

const client = new AWS.DynamoDB({apiVersion: "2012-08-10", endpoint: process.env.TABLE_ENDPOINT||""});

export {client};
