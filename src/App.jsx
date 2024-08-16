import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import ProfilePage from './pages/ProfilePage';
import InstrumentosPage from './pages/InstrumentosPage';
import InstrumentoDetallePage from './pages/InstrumentoDetallePage'; // Importa la nueva página de detalles

const App = () => {
  const [token, setToken] = useState('');

  const handleLoginSuccess = (token) => {
    setToken(token);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!token ? <LoginForm onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/profile" />}
        />
        <Route
          path="/profile"
          element={token ? <ProfilePage token={token} /> : <Navigate to="/login" />}
        />
        <Route
          path="/instrumentos/:pais"
          element={token ? <InstrumentosPage pais="argentina" token={token} /> : <Navigate to="/login" />}
        />
        <Route
          path="/instrumento/:instrumento"
          element={token ? <InstrumentoDetallePage token={token} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
