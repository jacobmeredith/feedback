import * as React from 'react';

import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import { Sidebar } from './components/Sidebar';

import { Feedback } from './pages/Feedback';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-gray-100 w-5/6 h-screen p-6">
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
