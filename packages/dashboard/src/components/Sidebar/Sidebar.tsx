import * as React from 'react';

interface ISidebarProps {
  collapsed: boolean;
  onCollapse: () => void;
}

function Sidebar({collapsed, onCollapse}: ISidebarProps) {
  return (
    <aside className={`h-screen px-6 py-4 bg-purple-700 ease-in-out duration-300 transition-all ${collapsed ? 'w-16' : 'w-1/6'}`}>
      <button onClick={onCollapse}>{collapsed ? '>' : '<'}</button>
    </aside>
  )
}

export {Sidebar};
