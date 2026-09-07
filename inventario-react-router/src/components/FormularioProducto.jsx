import React, { useState } from 'react';
const vacio = { nombre: '', categoria: '', precio: '', stock: '', descripcion: '' };
export default function FormularioProducto({ producto = vacio, onGuardar, onCancelar }) {
  const [datos, setDatos] = useState(producto);
  const [error, setError] = useState('');
  function cambiar(e) { setDatos({ ...datos, [e.target.name]: e.target.value }); }
  function enviar(e) {
    e.preventDefault();
    const limpio = { nombre: datos.nombre.trim(), categoria: datos.categoria.trim(), descripcion: datos.descripcion.trim(), precio: Number(datos.precio), stock: Number(datos.stock) };
    if (!limpio.nombre || !limpio.categoria || !Number.isFinite(limpio.precio) || limpio.precio < 0 || !Number.isSafeInteger(limpio.stock) || limpio.stock < 0) { setError('Completa el nombre y la categoría. Precio y stock deben ser válidos y no negativos.'); return; }
    if (onGuardar(limpio) === false) setError('No se guardó el producto. Revisa el aviso de almacenamiento.');
  }
  return <form className="panel formulario" onSubmit={enviar}>
    <label>Nombre<input name="nombre" value={datos.nombre} onChange={cambiar} required maxLength={100} /></label>
    <label>Categoría<input name="categoria" value={datos.categoria} onChange={cambiar} required maxLength={60} list="categorias" /></label>
    <datalist id="categorias"><option>Periféricos</option><option>Pantallas</option><option>Accesorios</option></datalist>
    <div className="dos-columnas"><label>Precio (COP)<input name="precio" type="number" min="0" step="0.01" value={datos.precio} onChange={cambiar} required /></label><label>Stock inicial<input name="stock" type="number" min="0" max={Number.MAX_SAFE_INTEGER} step="1" value={datos.stock} onChange={cambiar} required /></label></div>
    <label>Descripción<textarea name="descripcion" value={datos.descripcion} onChange={cambiar} maxLength={600} rows={4} /></label>
    {error && <p role="alert" className="alerta">{error}</p>}
    <div className="acciones"><button type="submit">Guardar producto</button><button type="button" className="secundario" onClick={onCancelar}>Cancelar</button></div>
  </form>;
}
