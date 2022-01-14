import * as React from 'react';

import { Button, Field, TextInput } from '@feedback/design-system';

import { ISurvey } from '@feedback/common';
import { updateSurvey } from '../../data/survey';
import {useForm} from 'react-hook-form';

interface IFeedbackPutFormProps {
  survey: ISurvey;
  onClose?: () => void;
}

function SurveyUpdateForm({ survey, onClose = () => {} }: IFeedbackPutFormProps) {
  const {handleSubmit, register, getValues} = useForm();

  const handlePutFormSubmit = async () => {
    const { name, url } = getValues();

    await updateSurvey('1234-1234-1234-1234', {...survey, name, url })
      .then(() => {
        onClose();
      });
  }

  return (
    <form onSubmit={handleSubmit(handlePutFormSubmit)}>
      <h2 className='text-lg'>Update feedback survey</h2>
      <div className="mt-4">
        <Field label="Title">
          <TextInput type="text" placeholder="e.g. Home page feedback" value={survey.name} register={register('name', { required: true })} />
        </Field>
      </div>
      <div className="mt-3">
        <Field label="Page url">
          <TextInput type="url" placeholder="e.g. https://www.example.com/new-page" value={survey.url} register={register('url', { required: true })} />
        </Field>
      </div>
      <div className="mt-3">
        <Button variant="primary">Update survey</Button>
      </div>
    </form>
  )
}

export {SurveyUpdateForm};
