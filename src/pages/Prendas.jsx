import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../assets/styles.css/Prendas.css";



const Prendas = () => {
  // Estados para manejar los datos
  const [prendas, setPrendas] = useState([]); // Lista de productos
  const [prenda, setPrenda] = useState({  id_prenda: 0, nombre: '',  descripcion_Base: '',
  id_categoria: '',
  id_marca: '',
  precio_Base: '',
  fecha_Creacion: new Date().toISOString() }); // Producto actual
  const [editando, setEditando] = useState(false); // Si estamos editando
  const [idEditando, setIdEditando] = useState(null); // ID del producto que editamos
  const [cargando, setCargando] = useState(false); // Estado de carga
  const navigate = useNavigate();

  // URL base de nuestra API
  const API_URL = 'https://localhost:7014/api/Prendas';

  // useEffect se ejecuta cuando el componente se monta
  useEffect(() => {
    cargarPrendas();
  }, []);

  // Función para obtener todos los productos del servidor
  const cargarPrendas = async () => {
    setCargando(true);
    try {
      const response = await fetch(API_URL); // Petición GET
      const data = await response.json();
       console.log("📦 Datos recibidos desde la API:", data);

      setPrendas(data); // Guardamos los productos en el estado
    } catch (error) {
      console.error('Error al cargar productos:', error);
      alert('Error al cargar productos');
    }
    setCargando(false);
  };

  // Función para manejar cambios en los inputs del formulario
  const manejarCambio = (e) => {
    setPrenda({
      ...prenda, // Mantenemos los datos existentes
      [e.target.name]: e.target.value // Actualizamos solo el campo que cambió
    });
  };

  // Función para enviar el formulario (crear o actualizar)
  const manejarEnvio = async (e) => {
    e.preventDefault(); // Evitamos que la página se recargue
    
    // Validamos que los campos no estén vacíos
    if (!prenda.nombre || !prenda.precio_Base) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
        let response;

      if (editando) {
      response = await fetch(`${API_URL}/${idEditando}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prenda)
      });
    } else {
      response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prenda)
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error en la respuesta del servidor:', errorText);
      alert('Error al guardar la prenda');
      return;
    }

    alert(editando ? 'Producto actualizado' : 'Producto creado');

    // Limpiamos el formulario y recargamos la lista
    
    limpiarFormulario();
    cargarPrendas();
  } catch (error) {
    console.error('Error al guardar producto:', error);
    alert('Error al guardar producto');
  }
}; 
      
      
     
    

  // Función para preparar la edición de un producto
  const editarPrenda = (prend) => {
    setPrenda({ id_prenda: prend.id_prenda, nombre: prend.nombre, descripcion_Base: prend.descripcion_Base,
  id_categoria: prend.id_categoria,
  id_marca: prend.id_marca,
  precio_Base: prend.precio_Base,
  fecha_Creacion: prend.fecha_Creacion });
    setEditando(true);
    setIdEditando(prend.id_prenda);
  };

  // Función para eliminar un producto
  const eliminarPrenda = async (id) => {
    // Confirmamos antes de eliminar
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await fetch(`${API_URL}/${id}`, {
          method: 'DELETE'
        });
        alert('Producto eliminado exitosamente');
        cargarPrendas(); // Recargamos la lista
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert('Error al eliminar producto');
      }
    }
  };

  // Función para limpiar el formulario
  const limpiarFormulario = () => {
    setPrenda({  id_prenda: 0,
    nombre: '',
    descripcion_Base: '',
    id_categoria: '',
    id_marca: '',
    precio_Base: '',
    fecha_Creacion: new Date().toISOString() });
    setEditando(false);
    setIdEditando(null);
  };

  return (
    <section className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h1 className="display-6 mb-4">♥️ Gestión de Productos</h1>
          
          
          <div className="card card-form mb-4">
            <div className="card-body">
             <h5 className="card-title">
                {editando ? 'Editar Prenda' : 'NUEVA PRENDA'}
              </h5> 
              <p></p>
              
              <form onSubmit={manejarEnvio}>
                <div className="row">
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      name="nombre"
                      placeholder="Nombre del producto"
                      value={prenda.nombre}
                      onChange={manejarCambio}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                  <input
                      type="text"
                      className="form-control"
                       name="descripcion_Base"
                      placeholder="Descripción"
                      value={prenda.descripcion_Base}
                     onChange={manejarCambio}
                     required
                              />
                    </div>

                    <div className="col-md-4">
                  <input
                  type="number"
                   className="form-control"
                     name="id_categoria"
                     placeholder="ID Categoría"
                     value={prenda.id_categoria}
                     onChange={manejarCambio}
                     required
                     />
                    </div>

                    <div className="col-md-4">
                     <input
                      type="number"
                       className="form-control"
                       name="id_marca"
                        placeholder="ID Marca"
                         value={prenda.id_marca}
                       onChange={manejarCambio}
                      required
                       />
                     </div>


                  
                  <div className="col-md-4">
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      name="precio_Base"
                      placeholder="Precio"
                      value={prenda.precio_Base}
                      onChange={manejarCambio}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <button type="submit" className="btn btn-primary me-2">
                      {editando ? 'Actualizar' : 'Crear'}
                    </button>
                    {editando && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={limpiarFormulario}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>

          
          <div className="card">
            <div className="card-body">
              <h5 className="card-titulo card-title">Lista de Productos</h5>
              {cargando ? (
                <p>Cargando productos...</p>
              ) : prendas.length === 0 ? (
                <p>No hay productos registrados</p>
              ) : (
                <div className="table-responsive">
                  <table className="table ">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>ID Categoria</th>
                        <th>ID Marca</th>
                        <th>Precio</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prendas.map((prend) => (
                        <tr key={prend.id_prenda}>
                          <td>{prend.id_prenda}</td>
                          <td>{prend.nombre}</td>
                           <td>{prend.descripcion_Base}</td>
                              <td>{prend.id_categoria}</td>
                              <td>{prend.id_marca}</td>
                          <td>${parseFloat(prend.precio_Base).toFixed(2)}</td>
                          <td>{prend.fecha_Creacion}</td>
                          <td>
                            <button
                              className="btn-editar btn btn-sm btn-outline-secondary me-2"

                              onClick={() => editarPrenda(prend)}
                            >
                              Editar
                            </button>

                            <button
                              className="btn-eliminar btn btn-sm btn-outline-secondary me-2"
                              onClick={() => eliminarPrenda(prend.id_prenda)}
                            >
                              Eliminar
                            </button>
                          <p></p>
                            <button
                              className="btn-detalle btn btn-sm btn-outline-secondary me-2"
                         onClick={() => navigate(`/prendas/${prend.id_prenda}`)}
                              >
                              Ver Detalle
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Prendas;