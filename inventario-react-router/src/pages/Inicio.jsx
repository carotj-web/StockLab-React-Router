import React from 'react';
import { Link } from 'react-router';
export default function Inicio({ productos }) {
  return <><section className="hero"><p className="eyebrow">TU ESPACIO DE TRABAJO</p><h1>Tu inventario,<br/>en orden.</h1><p>Consulta productos, actualiza existencias y encuentra cada detalle en un solo lugar.</p><div className="acciones"><Link className="boton" to="/inventario">Explorar inventario →</Link><Link className="boton secundario" to="/nuevo">+ Nuevo producto</Link></div></section><section className="metricas" aria-label="Resumen del inventario"><div className="panel"><strong>{productos.length}</strong><span>Productos registrados</span></div><div className="panel"><strong>{productos.reduce((s, p) => s + p.stock, 0)}</strong><span>Unidades disponibles</span></div><div className="panel"><strong>{productos.filter(p => p.stock <= 5).length}</strong><span>Productos con stock bajo</span></div></section></>;
}
git 