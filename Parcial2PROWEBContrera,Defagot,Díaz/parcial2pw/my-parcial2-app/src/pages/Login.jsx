import { useAuth } from "../Context/AuthContext";
import { useEffect, useState } from "react";

const Login = () => { 
  const { isAuthenticated, login } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) setShowModal(true);
  }, [isAuthenticated]);

  return (
    <>
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
            <h2>🔐 Acceder a la plataforma</h2>
            <button onClick={() => { 
              login();
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
            }}>

              Aceptar
            </button>
          </div>
        </div>
      )}
    </>
  );
};




export default Login;