import { useRef } from "react";
import "../assets/styles.css/Contacto.css";

const Contacto = () => {
  const inputRef = useRef(null); 
  const handleClick = () => {
// Para acceder al valor actual sin tener que pasar por event.target.value.
    if (inputRef.current) {
      alert(`Mensaje ingresado: ${inputRef.current.value}`);
    }
  };

  return (
    <section className="section-contacto container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="display-6 mb-4">♥️ Página de Contacto</h1>
          <p className="lead">
            Podés escribirnos a{" "}
            <a href="mailto:juli@ejemplo.com">
              modacircular2025@dominio.com
            </a>
          </p>

          <input
            ref={inputRef}
            type="text"
            className="form-control mb-3"
            placeholder="Escribe tu mensaje..."
          />

          <button
            className="btn btn-dark"
            onClick={handleClick}
          >
            Mostrar mensaje
          </button>
        </div>
      </div>
    </section>
  );
};

 

export default Contacto;
