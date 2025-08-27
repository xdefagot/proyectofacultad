import React from 'react';
import { NavLink } from 'react-router-dom';
import "../assets/styles.css/Navbar.css";
import { useAuth } from "../Context/AuthContext"; 
import { useState } from "react";


const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [showModal, setShowModal] = useState(false); // Estado del modal

  return (
    <>
      <nav className="div-navbar navbar navbar-expand-lg bg-white shadow-sm pastel-navbar">
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-bold pastel-brand" to="/">💮</NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><NavLink to="/inicio" className="nav-link">Inicio</NavLink></li>
              <li className="nav-item"><NavLink to="/prendas" className="nav-link">Prendas</NavLink></li>
              <li className="nav-item"><NavLink to="/marcas" className="nav-link">Marcas</NavLink></li>
              <li className="nav-item"><NavLink to="/contacto" className="nav-link">Contactanos</NavLink></li>
              
              {isAuthenticated && (
                <li className="nav-item">
                  <button className="nav-link btn" style={{ background: "none", border: "none" }}  onClick={() => setShowModal(true)}>
                    Salir
                  </button>
                </li>
                
              )}
            </ul>
          </div>
        </div>
      </nav>

     
      {showModal && (
        <div style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100vw",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <div style={{
            width: "320px",
            padding: "20px",
            borderRadius: "16px",
            backgroundColor: "#fffafc",
            boxShadow: "0 0 15px #ffd6f9",
            textAlign: "center",
            animation: "fadeIn 0.4s ease-in-out",
          }}>
            <h2>Adiós♥️</h2>
            <p>¿Seguro que quieres cerrar sesión?</p>
            <button onClick={() => {  
              logout();
              setShowModal(false);
            }} style={{
              backgroundColor: "#c5e1f8",
              fontWeight: "600",
              borderRadius: "12px",
              padding: "0.5rem 1.5rem",
              boxShadow: "0 0 8px #d0f0ff",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              marginRight: "10px",
            }}>
              Confirmar
            </button>
            <button onClick={() => setShowModal(false)} style={{
              backgroundColor: "#ffb6e0",
              fontWeight: "600",
              borderRadius: "12px",
              padding: "0.5rem 1.5rem",
              boxShadow: "0 0 8px #ffd6f9",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
