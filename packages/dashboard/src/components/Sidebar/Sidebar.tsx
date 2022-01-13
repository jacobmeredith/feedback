import * as React from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

import { Link } from 'react-router-dom';

interface ISidebarProps {
  collapsed: boolean;
  onCollapse: () => void;
}

function Sidebar({collapsed, onCollapse}: ISidebarProps) {
  const style = {
    sm: `sm:h-16 sm:w-full flex-row`,
    md: `md:h-screen md:flex-col ${collapsed ? 'md:w-20 items-center' : 'md:w-72'}`
  }

  return (
    <aside className={`flex px-4 py-4 bg-purple-700 ease-in-out duration-300 transition-all ${style.sm} ${style.md}`}>
      <Link className="flex" to="/">
        <h2 className={`text-white text-3xl font-semibold mr-6 md:mr-0 ${collapsed ? 'flex flex-col' : ''}`}>F<span className={`opacity-0 absolute ${collapsed ? 'md:opacity-0 md:absolute' : 'md:opacity-100 md:relative'}`}>eedback</span></h2>
      </Link>
      <div className="flex flex-row md:flex-col md:mt-8">
        <Link className="text-white text-lg mr-3 md:mr-0 md:mb-4 flex items-center" to="/surveys">
          Surveys
        </Link>
        <Link className="text-white text-lg mr-3 md:mr-0 md:mb-4 flex items-center" to="/account">
          Account
        </Link>
      </div>
      <div className="hidden md:flex mt-auto justify-center items-center">
        <button className="text-white p-1 bg-white/25 rounded-md" onClick={onCollapse}>{collapsed ? <ChevronRightIcon className="w-8 h-8" /> : <ChevronLeftIcon className="w-8 h-8" />}</button>
      </div>
    </aside>
  )
}

export {Sidebar};
