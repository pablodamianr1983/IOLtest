import React, { useState, useEffect } from 'react'; // Importa useState y useEffect
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación
import axios from 'axios'; // Importa axios para las solicitudes HTTP
import './ProfilePage.css'; // Importa los estilos específicos

const ProfilePage = ({ token }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
        if (!error.response) {
          setError('No se pudo conectar al servidor. Verifique su conexión a Internet o si el servidor está accesible.');
        } else if (error.response.status === 401) {
          setError('El token es inválido o ha expirado. Por favor, inicie sesión nuevamente.');
        } else if (error.response.status === 403) {
          setError('No tiene permiso para acceder a este recurso.');
        } else if (error.response.status === 404) {
          setError('No se encontró el recurso solicitado en el servidor.');
        } else {
          setError('Error al cargar los datos del perfil. Por favor, intente nuevamente.');
        }
        console.error('Detalles del error:', error);
      });
    }
  }, [token]);

  const handleNavigate = () => {
    navigate('/instrumentos/argentina'); // Cambia 'argentina' por el país que desees
  };

  return (
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

            {/* Botón para acceder a la página de instrumentos */}
            <button onClick={handleNavigate} className="instrumentos-button">
              Ver Instrumentos Financieros
            </button>
          </div>
        ) : (
          !error && <p>Cargando perfil...</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
