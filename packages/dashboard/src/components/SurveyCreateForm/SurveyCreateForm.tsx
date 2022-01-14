import * as React from 'react';

import { Button, Field, TextInput } from '@feedback/design-system';

import { createSurvey } from '../../data/survey';
import {useForm} from 'react-hook-form';

interface ISurveyCreateFormProps {
  onClose?: () => void;
}

function SurveyCreateForm({ onClose = () => {} }: ISurveyCreateFormProps) {
  const {handleSubmit, register, getValues} = useForm();

  const handlePutFormSubmit = async () => {
    const { name, url, type } = getValues();

    await createSurvey('1234-1234-1234-1234', name, url, type)
      .then(() => {
        onClose();
      });
  }

  return (
    <form onSubmit={handleSubmit(handlePutFormSubmit)}>
      <h2 className='text-lg'>Create feedback survey</h2>
      <div className="mt-4">
        <Field label="Title">
          <TextInput type="text" placeholder="e.g. Home page feedback" register={register('name', { required: true })} />
        </Field>
      </div>
      <div className="mt-3">
        <Field label="Page url">
          <TextInput type="url" placeholder="e.g. https://www.example.com/new-page" register={register('url', { required: true })} />
        </Field>
      </div>
      <div className="mt-3">
        <Field label="Type">
          <select {...register('type', { required: true })}>
            <option selected disabled value="">Select type</option>
            <option value="traffic">Traffic light</option>
          </select>
        </Field>
      </div>
      <div className="mt-3">
        <Button variant="primary">Create survey</Button>
      </div>
    </form>
  )
}

export {SurveyCreateForm};
