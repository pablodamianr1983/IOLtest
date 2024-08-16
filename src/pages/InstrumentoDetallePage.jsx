import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './InstrumentoDetallePage.css';

const InstrumentoDetallePage = ({ token }) => {
  const { instrumento } = useParams();
  const [titulos, setTitulos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.get(`/iol/api/v2/Cotizaciones/${instrumento}/argentina/Todos`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setTitulos(response.data.titulos || []); // Asegura que titulos sea un array
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
          setError('No se encontraron detalles para el instrumento especificado.');
        } else if (error.response.status === 500) {
          setError('Ocurrió un error en el servidor. Por favor, intente nuevamente más tarde.');
        } else {
          setError('Error al cargar los detalles del instrumento. Por favor, intente nuevamente.');
        }
        console.error('Detalles del error:', error);
      });
    }
  }, [instrumento, token]);

  return (
    <div className="instrumento-detalle-container">
      <h1>Detalles del Instrumento: {instrumento}</h1>
      {loading ? (
        <p>Cargando detalles...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div>
          {titulos.length > 0 ? (
            titulos.map((titulo, index) => (
              <div key={index} className="detalle-card">
                <h2>{titulo.descripcion} ({titulo.simbolo})</h2>
                <p><strong>Último Precio:</strong> {titulo.ultimoPrecio}</p>
                <p><strong>Variación Porcentual:</strong> {titulo.variacionPorcentual}%</p>
                <p><strong>Apertura:</strong> {titulo.apertura}</p>
                <p><strong>Máximo:</strong> {titulo.maximo}</p>
                <p><strong>Mínimo:</strong> {titulo.minimo}</p>
                <p><strong>Último Cierre:</strong> {titulo.ultimoCierre}</p>
                <p><strong>Volumen:</strong> {titulo.volumen}</p>
                <p><strong>Cantidad de Operaciones:</strong> {titulo.cantidadOperaciones}</p>
                <p><strong>Fecha:</strong> {new Date(titulo.fecha).toLocaleString()}</p>
                <p><strong>Mercado:</strong> {titulo.mercado}</p>
                <p><strong>Moneda:</strong> {titulo.moneda}</p>
                <p><strong>Plazo:</strong> {titulo.plazo}</p>
                <p><strong>Lámina Mínima:</strong> {titulo.laminaMinima}</p>
                <p><strong>Lote:</strong> {titulo.lote}</p>
                {titulo.tipoOpcion && <p><strong>Tipo de Opción:</strong> {titulo.tipoOpcion}</p>}
                {titulo.precioEjercicio && <p><strong>Precio de Ejercicio:</strong> {titulo.precioEjercicio}</p>}
                {titulo.fechaVencimiento && <p><strong>Fecha de Vencimiento:</strong> {titulo.fechaVencimiento}</p>}
                <div className="puntas">
                  <p><strong>Precio de Compra:</strong> {titulo.puntas?.precioCompra ?? 'N/A'} ({titulo.puntas?.cantidadCompra ?? 'N/A'})</p>
                  <p><strong>Precio de Venta:</strong> {titulo.puntas?.precioVenta ?? 'N/A'} ({titulo.puntas?.cantidadVenta ?? 'N/A'})</p>
                </div>
              </div>
            ))
          ) : (
            <p>No se encontraron títulos para este instrumento.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InstrumentoDetallePage;
