import React from 'react';
import { NavLink, Link } from 'react-router';
export default function Navbar() {
  return <header><Link className="marca" to="/">▦ StockLab</Link><nav aria-label="Navegación principal"><NavLink to="/" end>Inicio</NavLink><NavLink to="/inventario">Inventario</NavLink><NavLink to="/nuevo">Nuevo producto</NavLink><NavLink to="/acerca">Acerca</NavLink></nav></header>;
}
