import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginForm from './components/LoginForm';
import './components/LoginForm.css';  // Asegúrate de que la ruta al CSS sea correcta

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

        console.log('Final URL:', error.config.url);
      });
    }
  }, [token]);

  return (
    <div>
      {!token ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div className="profile-container">
          <div className="profile-card">
            <h1>Perfil del Usuario</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {profile ? (
              <div>
                <p><strong>Nombre:</strong> {profile.nombre}</p>
                <p><strong>Apellido:</strong> {profile.apellido}</p>
                <p><strong>Número de Cuenta:</strong> {profile.numeroCuenta}</p>
                <p><strong>DNI:</strong> {profile.dni}</p>
                <p><strong>CUIT/CUIL:</strong> {profile.cuitCuil}</p>
                <p><strong>Sexo:</strong> {profile.sexo}</p>
                <p><strong>Perfil Inversor:</strong> {profile.perfilInversor}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Cuenta Abierta:</strong> {profile.cuentaAbierta ? 'Sí' : 'No'}</p>
                <p><strong>Actualizar DDJJ:</strong> {profile.actualizarDDJJ ? 'Sí' : 'No'}</p>
                <p><strong>Actualizar Test Inversor:</strong> {profile.actualizarTestInversor ? 'Sí' : 'No'}</p>
                <p><strong>Es Baja por Arrepentimiento:</strong> {profile.esBajaArrepentimiento ? 'Sí' : 'No'}</p>
                <p><strong>Actualizar Términos y Condiciones:</strong> {profile.actualizarTyC ? 'Sí' : 'No'}</p>
                <p><strong>Actualizar Términos y Condiciones en la App:</strong> {profile.actualizarTyCApp ? 'Sí' : 'No'}</p>
              </div>
            ) : (
              !error && <p>Cargando perfil...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
