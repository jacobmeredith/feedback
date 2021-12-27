import * as React from 'react';

interface ITextInputProps {
  type?: 'text'|'password'|'url';
  placeholder?: string;
}

function TextInput({ type = 'text', placeholder }: ITextInputProps) {
  return (
    <input className="border border-gray-500 rounded-md h-10 px-2 py-1" type={type} placeholder={placeholder} />
  )
}

export {TextInput};
