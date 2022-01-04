import * as React from 'react';

import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';

import { Feedback } from './pages/Feedback';
import { Sidebar } from './components/Sidebar';

function App() {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Router>
      <div className="flex md:flex-row flex-col">
        <Sidebar collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} />
        <div className={`bg-gray-100 h-screen p-6 overflow-auto ease-in-out duration-300 transition-all w-full`}>
          <Routes>
            <Route path="/surveys" element={<Feedback />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
