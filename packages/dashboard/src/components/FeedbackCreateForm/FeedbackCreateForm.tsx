import { Button, Field, TextInput } from '@feedback/design-system';
import * as React from 'react';
import {useForm} from 'react-hook-form';

function FeedbackCreateForm() {
  const {handleSubmit} = useForm();

  const handleCreateFormSubmit = () => {
    console.log('submit');
  }

  return (
    <form onSubmit={handleSubmit(handleCreateFormSubmit)}>
      <h2 className='mb-4 text-lg'>Create feedback survey</h2>
      <Field label="Page url">
        <TextInput type="url" placeholder="e.g. https://www.example.com/new-page" />
      </Field>
      <div className="mt-4">
        <Button type="primary">Create</Button>
      </div>
    </form>
  )
}

export {FeedbackCreateForm};
