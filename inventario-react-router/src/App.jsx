import React from 'react';
import { Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Inventario from './pages/Inventario';
import NuevoProducto from './pages/NuevoProducto';
import DetalleProducto from './pages/DetalleProducto';
import Acerca from './pages/Acerca';
import NoEncontrado from './pages/NoEncontrado';
import useProductos from './hooks/useProductos';

// Diagnóstico: una App monolítica administra datos, dibuja formularios y filtra tarjetas.
// Aquí el hook administra los datos; las páginas y componentes reparten la interfaz.
// App conserva una sola fuente de verdad y conecta las rutas mediante props.
export default function App() {
  const inventario = useProductos();
  return <><Navbar /><main id="contenido">
    {inventario.error && <p role="alert" className="alerta">{inventario.error}</p>}
    <Routes>
      <Route path="/" element={<Inicio productos={inventario.productos} />} />
      <Route path="/inventario" element={<Inventario {...inventario} />} />
      <Route path="/nuevo" element={<NuevoProducto agregar={inventario.agregar} />} />
      <Route path="/productos/:id" element={<DetalleProducto {...inventario} />} />
      <Route path="/acerca" element={<Acerca />} />
      <Route path="*" element={<NoEncontrado />} />
    </Routes>
  </main><footer>StockLab · Taller de React Router · Datos guardados en este navegador</footer></>;
}
