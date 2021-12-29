import * as React from 'react'

interface IButtonProps {
  children: React.ReactNode;
  type: 'primary'|'secondary'|'outline'|'warning'|'danger'|'success';
  onClick?: () => void;
}

enum EnumButtonType {
  primary = 'bg-purple-700 border-purple-700 text-white font-bold rounded',
  secondary = 'bg-gray-300 border-gray-300 text-gray-700 rounded',
  outline = 'border-gray-500 text-gray-700 rounded',
  warning = 'bg-yellow-500 border-yellow-500 text-white rounded',
  danger = 'bg-red-500 border-red-500 text-white rounded',
  success = 'bg-green-500 border-green-500 text-white rounded'
}

function Button({children, type, onClick = () => {}}: IButtonProps) {
  return (
    <button className={`border py-2 px-4 ${EnumButtonType[type]}`} onClick={onClick}>{children}</button>
  )
}

export {Button};
