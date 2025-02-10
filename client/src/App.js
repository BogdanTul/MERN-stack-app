import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Users />} />
        <Route path="/places/new" exact element={<NewPlace />} />
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
