import * as React from 'react';

import { ChevronLeftIcon, ChevronRightIcon, ClipboardCheckIcon, UserIcon } from '@heroicons/react/outline';

import { Link } from 'react-router-dom';

interface ISidebarProps {
  collapsed: boolean;
  onCollapse: () => void;
}

function Sidebar({collapsed, onCollapse}: ISidebarProps) {
  return (
    <aside className={`flex flex-col h-screen px-4 py-4 bg-purple-700 ease-in-out duration-300 transition-all ${collapsed ? 'w-20 items-center' : 'w-64'}`}>
      <Link to="/">
        <h2 className="text-white text-3xl font-semibold">Feedback</h2>
      </Link>
      <div className="flex flex-col mt-8">
        <Link className="text-white text-lg mb-4 flex items-center" to="/surveys">
          <ClipboardCheckIcon className="w-6 h-6 mr-2" />
          {!collapsed && <span>Surveys</span>}
        </Link>
        <Link className="text-white text-lg mb-4 flex items-center" to="/account">
          <UserIcon className="w-6 h-6 mr-2" />
          {!collapsed && <span>Account</span>}
        </Link>
      </div>
      <div className="mt-auto flex justify-center items-center">
        <button className="text-white p-1 bg-white/25 rounded-md" onClick={onCollapse}>{collapsed ? <ChevronRightIcon className="w-8 h-8" /> : <ChevronLeftIcon className="w-8 h-8" />}</button>
      </div>
    </aside>
  )
}

export {Sidebar};
