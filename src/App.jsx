import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginForm from './components/LoginForm';

const App = () => {
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  const handleLoginSuccess = (token) => {
    setToken(token);
  };

  useEffect(() => {
    if (token) {
      axios.get('/iol/api/v2/datos-perfil', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(response => {
        setProfile(response.data);
        setError(''); // Limpiar errores anteriores si la solicitud es exitosa
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
        setError('Error fetching profile data. Please try again later.');

        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
        }

        // Agregar para verificar la URL final
        console.log('Final URL:', error.config.url);
      });
    }
  }, [token]);

  return (
    <div>
      {!token ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          <h1>Perfil del Usuario</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {profile ? (
            <div>
              <p>Nombre: {profile.nombre}</p>
              <p>Apellido: {profile.apellido}</p>
              <p>Email: {profile.email}</p>
              {/* Aquí puedes agregar más campos del perfil */}
            </div>
          ) : (
            !error && <p>Cargando perfil...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
