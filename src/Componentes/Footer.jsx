import React, { useState, useEffect } from 'react';

const Footer = () => {
  // Estados para manejar la información del sistema
  const [backendStatus, setBackendStatus] = useState({
    version: 'Desconocida',
    database: { connected: false },
    loading: true
  });
  const [frontendVersion] = useState('2.1.0'); // Versión fija del frontend

  // Función para obtener el estado del backend
  const obtenerStatusBackend = async () => {
    try {
      const response = await fetch('https://localhost:7014/api/status');
      
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    setBackendStatus({
      ...data,
      loading: false
    });
  } catch (error) {
    console.error('Error al conectar con el backend:', error);
    setBackendStatus({
      version: 'Error',
      database: { connected: false, error: 'Sin conexión' },
      loading: false
    });
  }
};

  // Ejecutamos la función cuando el componente se monta
  useEffect(() => {
    obtenerStatusBackend();
    // Actualizamos el estado cada 30 segundos
    const interval = setInterval(obtenerStatusBackend, 30000);
    return () => clearInterval(interval); // Limpiamos el interval al desmontar
  }, []);

  // Función para obtener el color del indicador de base de datos
  const getDbIndicatorColor = () => {
    if (backendStatus.loading) return 'warning'; // Amarillo mientras carga
    return backendStatus.database.connected ? 'success' : 'danger'; // Verde o rojo
  };

  // Función para obtener el texto del estado de la base de datos
  const getDbStatusText = () => {
    if (backendStatus.loading) return 'Verificando...';
    return backendStatus.database.connected ? 'Conectada' : 'Desconectada';
  };

  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Información de versiones */}
          <div className="col-md-6">
            <small>
              <strong>Versiones:</strong><br />
              Frontend: v{frontendVersion} | 
              Backend: v{backendStatus.version}
            </small>
          </div>
          
          {/* Estado de la base de datos */}
          <div className="col-md-6 text-md-end">
            <div className="d-flex align-items-center justify-content-md-end">
              <small className="me-2">Base de datos:</small>
              {/* Indicador visual con círculo de color */}
              <span 
                className={`badge bg-${getDbIndicatorColor()} d-flex align-items-center`}
                style={{ fontSize: '0.75rem' }}
              >
                <span 
                  className="rounded-circle me-1" 
                  style={{ 
                    width: '8px', 
                    height: '8px', 
                    backgroundColor: 'white',
                    display: 'inline-block'
                  }}
                ></span>
                {getDbStatusText()}
              </span>
            </div>
          </div>
        </div>
        
        {/* Información adicional en línea separada */}
        <div className="row mt-2">
          <div className="col-12 text-center">
            <small className="text-muted">
              CRUD Productos - Desarrollado con React & Node.js
              {backendStatus.timestamp && (
                <span className="ms-2">
                  | Última actualización: {new Date(backendStatus.timestamp).toLocaleTimeString()}
                </span>
              )}
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;