import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/iol/token', {
        username,
        password,
        grant_type: 'password',
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });

      if (response.data.access_token) {
        onLoginSuccess(response.data.access_token); // Pasa el token al componente App
        setMessage('Token creado exitosamente!');
      } else {
        setMessage('Error al crear el token.');
      }
    } catch (error) {
      // Verifica si es un problema de red, CORS, o HTTPS
      if (!error.response) {
        setMessage('No se pudo conectar al servidor. Verifique su conexión a Internet o si el servidor está accesible.');
      } else if (error.response.status === 401) {
        setMessage('Credenciales incorrectas. Por favor, intente nuevamente.');
      } else if (error.response.status === 403) {
        setMessage('No tiene permiso para acceder a este recurso.');
      } else if (error.response.status === 404) {
        setMessage('No se encontró el recurso solicitado en el servidor.');
      } else {
        setMessage('Error al crear el token: ' + error.message);
      }
      console.error('Detalles del error:', error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
