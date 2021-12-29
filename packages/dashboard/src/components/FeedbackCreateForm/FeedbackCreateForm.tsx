import { Button, Field, TextInput } from '@feedback/design-system';
import * as React from 'react';
import {useForm} from 'react-hook-form';
import { httpClient } from '../../helpers/httpClient';

interface IFeedbackCreateFormProps {
  onClose?: () => void;
}

function FeedbackCreateForm({ onClose = () => {} }: IFeedbackCreateFormProps) {
  const {handleSubmit, register, getValues} = useForm();

  const handleCreateFormSubmit = async () => {
    const { title, url } = getValues();

    await httpClient.put('/feedback', {
      userId: '1',
      feedbackType: 'traffic',
      feedbackTitle: title,
      feedbackUrl: url,
    }).then(() => {
      onClose();
    });
  }

  return (
    <form onSubmit={handleSubmit(handleCreateFormSubmit)}>
      <h2 className='text-lg'>Create feedback survey</h2>
      <div className="mt-4">
        <Field label="Title">
          <TextInput type="text" placeholder="e.g. Home page feedback" register={register('title', { required: true })} />
        </Field>
      </div>
      <div className="mt-3">
        <Field label="Page url">
          <TextInput type="url" placeholder="e.g. https://www.example.com/new-page" register={register('url', { required: true })} />
        </Field>
      </div>
      <div className="mt-3">
        <Button type="primary">Create</Button>
      </div>
    </form>
  )
}

export {FeedbackCreateForm};
