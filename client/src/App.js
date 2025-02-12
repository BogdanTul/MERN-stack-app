import React from 'react';
import {
  BrowserRouter,
  Route,
  Navigate,
  Routes
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';

const App = () => {
  return (
    <BrowserRouter>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" exact element={<Users />} />
          <Route path="/places/new" exact element={<NewPlace />} />
          <Route path="/:userId/places" exact element={<UserPlaces />} />
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
