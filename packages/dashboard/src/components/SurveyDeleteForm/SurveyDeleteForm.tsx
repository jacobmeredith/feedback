import * as React from 'react';

import { Button, Field, TextInput } from '@feedback/design-system';

import { ISurvey } from '@feedback/common';
import { httpClient } from '../../data/httpClient';
import {useForm} from 'react-hook-form';

interface ISurveyDeleteFormProps {
  survey: ISurvey;
  onClose?: () => void;
}

function SurveyDeleteForm({ survey, onClose = () => {} }: ISurveyDeleteFormProps) {
  const {handleSubmit, register} = useForm();

  const handleCreateFormSubmit = async () => {
    await httpClient.delete(`/feedback/1/${survey.surveyId}`).then(() => {
      onClose();
    });
  }

  return (
    <form onSubmit={handleSubmit(handleCreateFormSubmit)}>
      <h2 className='text-lg'>Delete feedback survey</h2>
      <div className="mt-4">
        <Field label={`Enter the title of the survey (${survey.name})`}>
          <TextInput type="text" placeholder={survey.name} register={register('title', { validate: value => value === survey.name })} />
        </Field>
      </div>
      <div className="mt-3">
        <Button variant="danger">Permanently delete</Button>
      </div>
    </form>
  )
}

export {SurveyDeleteForm};
