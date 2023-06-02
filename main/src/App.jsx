import React from 'react';
import Home from './pages/Home';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const user = true; // Assuming user is not authenticated
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route
          path="/main"
          element={
            user ? (
              <Home />
            ) : (
              () => navigate('/sign-in', { replace: true })
            )
          }
        />
        <Route
          path="/main/movies"
          element={
            user ? (
              <Home type='movies' />
            ) : (
              () => navigate('/sign-in', { replace: true })
            )
          }
        />
        <Route
          path="/main/series"
          element={
            user ? (
              <Home type='series' />
            ) : (
              () => navigate('/sign-in', { replace: true })
            )
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
