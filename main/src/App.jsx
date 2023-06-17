import React, { useContext } from 'react';
import Home from './pages/Home';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Video from './pages/Video/Video';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from './authContext/AuthContext';

function App() {
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user);
  return (
    <>
      <Routes>
        <Route
          path="/main"
          element={
            user.user ? (
              <Home />
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        />
        <Route
          path="/main/listAdded"
          element={
            user ? (
              <Home type='listAdded' />
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        />
        <Route
          path="/main/listNew"
          element={
            user ? (
              <Home type='listNew' />
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        />
        <Route
          path="/main/movie"
          element={
            user ? (
              <Home type='movie' />
            ) : (
              <Navigate to="/sign-in" replace />
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
        <Route
          path="/video/:link"
          element={
            user ? (
              <Video />
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
