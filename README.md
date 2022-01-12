# Feedback monorepo

## About this project
*Name still to be decided*

*Feedback* is a SaaS that allows you to capture feedback from your users of your website/web app. There will be a dashboard where you can manage what is displayed to your users and track what responses have been collected.

## Local development requirements
- Yarn
- Java Runtime Engine (JRE) version 6.x or newer (local dynamodb instance)
- Serverless - `yarn add serverless -g`
- Local dynamo db - `cd packages/infrastructure && sls dynamodb install`

## Project setup
- First run `yarn install` in the root directory.
- If you want to run the platform API locally run `yarn start` in the `packages/platform-api` directory.
- If you want to run the dynamodb instance locally with seed data you can do this by running `yarn start` in the `packages/infrastructure` directory.
