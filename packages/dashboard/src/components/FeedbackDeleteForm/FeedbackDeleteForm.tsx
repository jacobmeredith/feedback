import { Button, Field, TextInput } from '@feedback/design-system';
import * as React from 'react';
import {useForm} from 'react-hook-form';
import { httpClient } from '../../helpers/httpClient';

interface IFeedbackDeleteFormProps {
  feedbackTitle: string;
  feedbackId: string;
  onClose?: () => void;
}

function FeedbackDeleteForm({ feedbackTitle, feedbackId, onClose = () => {} }: IFeedbackDeleteFormProps) {
  const {handleSubmit, register} = useForm();

  const handleCreateFormSubmit = async () => {
    await httpClient.delete(`/feedback/1/${feedbackId}`).then(() => {
      onClose();
    });
  }

  return (
    <form onSubmit={handleSubmit(handleCreateFormSubmit)}>
      <h2 className='text-lg'>Delete feedback survey</h2>
      <div className="mt-4">
        <Field label={`Enter the title of the survey (${feedbackTitle})`}>
          <TextInput type="text" placeholder={feedbackTitle} register={register('title', { validate: value => value === feedbackTitle })} />
        </Field>
      </div>
      <div className="mt-3">
        <Button type="danger">Permanently delete</Button>
      </div>
    </form>
  )
}

export {FeedbackDeleteForm};
