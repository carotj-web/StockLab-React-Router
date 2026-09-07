import React from 'react';
import { Link } from 'react-router';
export const moneda = valor => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 2 }).format(valor);
export default function ProductoCard({ producto, cambiarStock, eliminar }) {
  return <article className="panel tarjeta"><div className="fila"><span className="etiqueta">{producto.categoria}</span><span className={producto.stock <= 5 ? 'bajo' : 'muted'}>{producto.stock <= 5 ? 'Stock bajo' : 'Disponible'}</span></div><h2>{producto.nombre}</h2><p className="precio">{moneda(producto.precio)}</p><p className="descripcion">{producto.descripcion || 'Sin descripción.'}</p>
    <div className="fila stock"><span>{producto.stock} unidades</span><div><button className="secundario" disabled={producto.stock === 0} aria-label={`Restar stock de ${producto.nombre}`} onClick={() => cambiarStock(producto.id, -1)}>−</button><button className="secundario" disabled={producto.stock === Number.MAX_SAFE_INTEGER} aria-label={`Sumar stock de ${producto.nombre}`} onClick={() => cambiarStock(producto.id, 1)}>+</button></div></div>
    <div className="acciones"><Link to={`/productos/${producto.id}`}>Ver detalle / editar →</Link><button className="peligro" onClick={() => { if (window.confirm(`¿Eliminar ${producto.nombre}?`)) eliminar(producto.id); }}>Eliminar</button></div>
  </article>;
}
