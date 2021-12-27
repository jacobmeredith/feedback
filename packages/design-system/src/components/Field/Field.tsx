import * as React from 'react';

interface IFieldProps {
  label?: string;
  children: React.ReactNode;
}

function Field({label, children}: IFieldProps) {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-2">{label}</label>}
      {children}
    </div>
  )
}

export {Field};
