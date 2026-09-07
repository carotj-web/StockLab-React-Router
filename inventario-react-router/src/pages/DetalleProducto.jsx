import React, { useState } from 'react';
import { Link, useParams } from 'react-router';
import FormularioProducto from '../components/FormularioProducto';
import { moneda } from '../components/ProductoCard';
export default function DetalleProducto({ productos, editar }) {
  const { id } = useParams();
  const producto = productos.find(item => String(item.id) === id);
  const [editando, setEditando] = useState(false);
  if (!producto) return <section className="panel titulo"><h1>Producto no encontrado</h1><p>El producto no existe o fue eliminado.</p><Link to="/inventario">Volver al inventario</Link></section>;
  return <><Link to="/inventario">← Volver al inventario</Link><div className="titulo"><p className="eyebrow">DETALLE DEL PRODUCTO</p><h1>{producto.nombre}</h1></div>{editando ? <FormularioProducto key={id} producto={producto} onGuardar={datos => { if (!editar(producto.id, datos)) return false; setEditando(false); return true; }} onCancelar={() => setEditando(false)} /> : <section className="panel detalle"><span className="etiqueta">{producto.categoria}</span><p className="precio">{moneda(producto.precio)}</p><p>{producto.descripcion || 'Sin descripción.'}</p><p><strong>Stock:</strong> {producto.stock} unidades</p><p className="muted">ID: {producto.id}</p><button onClick={() => setEditando(true)}>Editar producto</button></section>}</>;
}
