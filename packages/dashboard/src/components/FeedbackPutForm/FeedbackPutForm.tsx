import * as React from 'react';

import { Button, Field, TextInput } from '@feedback/design-system';

import { httpClient } from '../../helpers/httpClient';
import {useForm} from 'react-hook-form';

interface IFeedbackPutFormProps {
  buttonText: string;
  feedbackTitle?: string;
  feedbackUrl?: string;
  feedbackId?: string|null;
  onClose?: () => void;
}

function FeedbackPutForm({ buttonText, feedbackTitle = '', feedbackUrl = '', feedbackId = null, onClose = () => {} }: IFeedbackPutFormProps) {
  const {handleSubmit, register, getValues} = useForm();

  const handlePutFormSubmit = async () => {
    const { title, url } = getValues();

    await httpClient.put('/feedback', {
      userId: '1',
      feedbackType: 'traffic',
      feedbackTitle: title,
      feedbackUrl: url,
      feedbackId: feedbackId
    }).then(() => {
      onClose();
    });
  }

  return (
    <form onSubmit={handleSubmit(handlePutFormSubmit)}>
      <h2 className='text-lg'>Create feedback survey</h2>
      <div className="mt-4">
        <Field label="Title">
          <TextInput type="text" placeholder="e.g. Home page feedback" value={feedbackTitle} register={register('title', { required: true })} />
        </Field>
      </div>
      <div className="mt-3">
        <Field label="Page url">
          <TextInput type="url" placeholder="e.g. https://www.example.com/new-page" value={feedbackUrl} register={register('url', { required: true })} />
        </Field>
      </div>
      <div className="mt-3">
        <Button variant="primary">{buttonText}</Button>
      </div>
    </form>
  )
}

export {FeedbackPutForm};
