import * as React from 'react';

interface ITextInputProps {
  type?: 'text'|'password'|'url';
  placeholder?: string;
  register?: any;
}

function TextInput({ type = 'text', placeholder, register }: ITextInputProps) {
  return (
    <input className="border border-gray-500 rounded-md h-10 px-2 py-1" type={type} placeholder={placeholder} {...register} />
  )
}

export {TextInput};
