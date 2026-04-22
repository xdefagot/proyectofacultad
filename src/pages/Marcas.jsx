import { useEffect, useState } from "react";
import "../assets/styles.css/Marcas.css";
const Marcas = () => {
  const [marcas, setMarcas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null); // Estado para manejar errores

  const API_URL = "https://localhost:7014/api/Marcas";

  useEffect(() => {
    const controller = new AbortController(); // Controlador para abortar la solicitud si el componente se desmonta
    const signal = controller.signal;

    const obtenerMarcas = async () => {
      try {
        const res = await fetch(API_URL, { signal });
        if (!res.ok) throw new Error("No se pudo obtener las marcas");
        const data = await res.json();
        setMarcas(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError("Error al cargar las marcas");
          console.error(error);
        }
      } finally {
        setCargando(false);
      }
    };

    obtenerMarcas();

    return () => {
      controller.abort(); // Aborta la solicitud si el componente se desmonta
    };
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

  if (cargando) return <p className="container mt-4">Cargando...</p>;
  if (error) return <p className="container mt-4">{error}</p>;
  if (!marcas.length) return <p className="container mt-4">Marcas no encontradas</p>;

  return (
     <section className="container mt-4">
       <h1 className="card-titulo card-title">♥️ Trabajamos con las siguientes marcas:</h1>
      <div className="card card-marcas">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-marcas">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                {marcas.map((marca) => (
                  <tr key={marca.id_marca}>
                    <td>🏷️ {marca.id_marca}</td> 

                    <td>{marca.nombre_Marca}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};



export default Marcas;