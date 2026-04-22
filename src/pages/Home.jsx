import { useContext } from "react";
import { PruebaContext} from "../Context/PruebaContext";
import "../assets/styles.css/Home.css";

const Home = () => {
  
  
  return (
    <section className="section-home">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="">💮Bienvenido a MODA CIRCULAR💮.</h1>
            <a href="/prendas" className="btn btn-outline-dark mt-3">Ir a la tienda</a>
          </div>
        </div>
      </div>
     
    </section>

  );
};

export default Home;