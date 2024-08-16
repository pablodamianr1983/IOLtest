import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Para enlaces de navegación
import axios from 'axios';
import './InstrumentosPage.css';

const InstrumentosPage = ({ pais, token }) => {
  const [instrumentos, setInstrumentos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.get(`/iol/api/v2/${pais}/Titulos/Cotizacion/Instrumentos`, {
        headers: {
          'Authorization': `Bearer ${token}`  // Incluye el token en el encabezado
        }
      })
      .then(response => {
        setInstrumentos(response.data);
        setError('');
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        if (!error.response) {
          setError('No se pudo conectar al servidor. Verifique su conexión a Internet o si el servidor está accesible.');
        } else if (error.response.status === 401) {
          setError('No está autorizado. Por favor, inicie sesión nuevamente.');
        } else if (error.response.status === 404) {
          setError('No se encontraron instrumentos para el país especificado.');
        } else {
          setError('Error al cargar los instrumentos. Por favor, intente nuevamente.');
        }
        console.error('Detalles del error:', error);
      });
    }
  }, [pais, token]);

  return (
    <div className="instrumentos-container">
      <h1>Cotización de Instrumentos para {pais}</h1>
      {loading ? (
        <p>Cargando datos...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul className="instrumentos-list">
          {instrumentos.map((instrumento, index) => (
            <li key={index}>
              <p><strong>Instrumento:</strong> {instrumento.instrumento}</p>
              <p><strong>País:</strong> {instrumento.pais}</p>
              <Link to={`/instrumento/${instrumento.instrumento}`}>Ver Detalles</Link> {/* Enlace a los detalles del instrumento */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InstrumentosPage;
