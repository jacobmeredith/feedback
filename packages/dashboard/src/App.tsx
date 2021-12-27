import * as React from 'react';

import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';

import { Feedback } from './pages/Feedback';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
