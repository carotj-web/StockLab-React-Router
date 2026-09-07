import React from 'react';
import { useNavigate } from 'react-router';
import FormularioProducto from '../components/FormularioProducto';
export default function NuevoProducto({ agregar }) {
  const navigate = useNavigate();
  function guardar(datos) { if (!agregar(datos)) return false; navigate('/inventario'); return true; }
  return <><div className="titulo"><p className="eyebrow">CRECER EL CATÁLOGO</p><h1>Nuevo producto</h1><p className="muted">Completa los datos para agregar un producto al inventario.</p></div><FormularioProducto onGuardar={guardar} onCancelar={() => navigate('/inventario')} /></>;
}
