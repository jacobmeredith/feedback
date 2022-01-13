# Feedback - User feedback SaaS

## About this project
*Name still to be decided*

*Feedback* is a SaaS that allows you to capture feedback from users of your website/web app. There are two major parts of the application/project that will be powered by the *feedback* platform api.

### Dashboard
The dashboard where you can manage what *surveys* appear on what pages and track responses from users.

### Package/Micro frontend
A package/micro frontend that will be placed on the website/webapp to render the survey to the end user.

## Local development requirements
- Yarn
- Java Runtime Engine (JRE) version 6.x or newer (local dynamodb instance)
- Serverless - `yarn add serverless -g`
- Local serverless dynamodb - `cd packages/infrastructure && sls dynamodb install`

## Project setup
- First run `yarn install` in the root directory and this will install the dependecies for each package in the project.
- If you want to run **just** the platform API locally run `yarn start` in the `packages/platform-api` directory.
- If you want to run **just** the dynamodb instance locally with seed data you can do this by running `yarn start` in the `packages/infrastructure` directory.
- If you want to run **everything** locally run `yarn start` in the root directory.
