import { ISurvey } from '@feedback/common';
import {httpClient} from './httpClient';

export const getAllSurveys = async (userId: string): Promise<ISurvey[]> => {
  return await httpClient.get(`/${userId}/survey`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      return [];
    });
}

export const updateSurvey = async (userId: string, survey: ISurvey): Promise<ISurvey> => {
  return await httpClient
    .put(
      `/${userId}/survey/${survey.surveyId}`,
      survey
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      return null;
    });
}

export const createSurvey = async (userId: string, name: string, url: string, type: string): Promise<ISurvey> => {
  return await httpClient
    .post(
      `/${userId}/survey`,
      {
        name,
        url,
        surveyType: type
      }
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      return null;
    });
}
