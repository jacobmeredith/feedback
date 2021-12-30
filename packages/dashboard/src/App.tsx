import * as React from 'react';

import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import { Sidebar } from './components/Sidebar';

import { Feedback } from './pages/Feedback';

function App() {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} />
      <div className={`bg-gray-100 h-screen p-6 overflow-auto ease-in-out duration-300 transition-all ${collapsed ? 'w-full' : 'w-5/6'}`}>
        <Router>
          <Routes>
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
