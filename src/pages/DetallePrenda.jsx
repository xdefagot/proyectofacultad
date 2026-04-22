import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/styles.css/Detalle.css";

const DetallePrenda = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prenda, setPrenda] = useState(null);
  const [cargando, setCargando] = useState(true);

  const API_URL = `https://localhost:7014/api/Prendas/${id} `;

  useEffect(() => {
    const obtenerPrenda = async () => {
      try {
        console.log("Solicitando URL:", API_URL);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("No se pudo obtener la prenda");
        const data = await res.json();
        setPrenda(data);
      } catch (error) {
        console.error(error);
        alert("Error al cargar la prenda");
      } finally {
        setCargando(false);
      }
    };

    obtenerPrenda();
  }, [id]);

  if (cargando) return <p className="container mt-4">Cargando...</p>;
  if (!prenda) return <p className="container mt-4">Prenda no encontrada.</p>;

  return (
    <section className="container mt-4">
    <h1 className="titulo-detalle">♥️ Detalle de la Prenda #{prenda.id_prenda}</h1>

    <div className="card card-detalle">
      <div className="card-body">
        <ul className="list-group mb-3">
          <li className="list-group-item"><strong>Nombre:</strong> {prenda.nombre}</li>
          <li className="list-group-item"><strong>Descripción:</strong> {prenda.descripcion_Base}</li>
          <li className="list-group-item"><strong>ID Categoría:</strong> {prenda.id_categoria}</li>
          <li className="list-group-item"><strong>ID Marca:</strong> {prenda.id_marca}</li>
          <li className="list-group-item"><strong>Precio:</strong> ${parseFloat(prenda.precio_Base).toFixed(2)}</li>
          <li className="list-group-item"><strong>Fecha:</strong> {new Date(prenda.fecha_Creacion).toLocaleString()}</li>
        </ul>
        <button className="btn-volver btn btn-outline-secondary" onClick={() => navigate("/prendas")}>
          Volver al listado
        </button>
      </div>
    </div>
  </section>

  );
};

export default DetallePrenda;
