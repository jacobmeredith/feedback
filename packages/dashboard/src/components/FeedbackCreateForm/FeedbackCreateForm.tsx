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
    const { url } = getValues();

    await httpClient.put('/feedback', {
      userId: '1',
      feedbackType: 'traffic',
      feedbackUrl: url,
    }).then(() => {
      onClose();
    });
  }

  return (
    <form onSubmit={handleSubmit(handleCreateFormSubmit)}>
      <h2 className='mb-4 text-lg'>Create feedback survey</h2>
      <Field label="Page url">
        <TextInput type="url" placeholder="e.g. https://www.example.com/new-page" register={register('url', { required: true })} />
      </Field>
      <div className="mt-4">
        <Button type="primary">Create</Button>
      </div>
    </form>
  )
}

export {FeedbackCreateForm};
