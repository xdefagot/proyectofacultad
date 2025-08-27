import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import { PruebaContext } from './Context/PruebaContext';
import Navbar from './Componentes/Navbar';
import Footer from './Componentes/Footer';
import Contacto from './pages/Contacto';
import Prendas from './pages/Prendas';
import DetallePrenda from './pages/DetallePrenda'; 
import './App.css';
import Marcas from './pages/Marcas';
import { AuthProvider } from "./Context/AuthContext";
import Login from "./pages/Login";
import Logout from './pages/Logout';



const Layout = () => (
  <div className="d-flex flex-column min-vh-100">
    <Navbar />
    <PruebaContext.Provider value="Value desde el provider">
      <main className="flex-grow-1">
        <Outlet />
      </main>
    </PruebaContext.Provider>
    <Footer />
  </div>
);

const App = () => (
<AuthProvider> 
  <Login /> 
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>  
        <Route index element={<Home />} />   
        
        <Route path="inicio" element={<Home />} />
        
        <Route path="contacto" element={<Contacto />} />
        <Route path="prendas" element={<Prendas/>} />
        <Route path="prendas/:id" element={<DetallePrenda />} />
        <Route path="marcas" element={<Marcas/>} />
        <Route path="login" element={<Login />}/>
        <Route path="logout" element={<Logout />}/>
      </Route>
    </Routes>
  </BrowserRouter>
  </AuthProvider>

);

export default App;
