import { useState } from 'react';
const KEY = 'stocklab-productos-v1';
const iniciales = [
  { id: '1', nombre: 'Teclado mecánico', categoria: 'Periféricos', precio: 180000, stock: 12, descripcion: 'Teclado compacto con conexión USB y switches táctiles.' },
  { id: '2', nombre: 'Mouse inalámbrico', categoria: 'Periféricos', precio: 65000, stock: 4, descripcion: 'Mouse ergonómico con receptor USB.' },
  { id: '3', nombre: 'Monitor de 24 pulgadas', categoria: 'Pantallas', precio: 620000, stock: 7, descripcion: 'Pantalla Full HD para estudio y trabajo.' },
];
function valido(p) { return p && typeof p.id === 'string' && typeof p.nombre === 'string' && typeof p.categoria === 'string' && typeof p.descripcion === 'string' && Number.isFinite(p.precio) && p.precio >= 0 && Number.isSafeInteger(p.stock) && p.stock >= 0; }
function cargar() {
  try {
    const guardados = localStorage.getItem(KEY);
    if (guardados === null) return { productos: iniciales, error: '' };
    const datos = JSON.parse(guardados);
    if (!Array.isArray(datos) || !datos.every(valido) || new Set(datos.map(p => p.id)).size !== datos.length) throw new Error();
    return { productos: datos, error: '' };
  } catch { return { productos: [], error: 'No se pudieron leer los datos guardados. Revisa el almacenamiento del navegador antes de guardar cambios.' }; }
}
export default function useProductos() {
  const [estado, setEstado] = useState(cargar);
  function guardar(productos) {
    try {
      localStorage.setItem(KEY, JSON.stringify(productos));
      setEstado({ productos, error: '' });
      return true;
    } catch { setEstado(actual => ({ ...actual, error: 'No se pudo guardar. Verifica que el navegador permita almacenamiento local.' })); return false; }
  }
  return { ...estado,
    agregar: datos => guardar([...estado.productos, { ...datos, id: crypto.randomUUID() }]),
    editar: (id, datos) => guardar(estado.productos.map(p => p.id === id ? { ...datos, id } : p)),
    eliminar: id => guardar(estado.productos.filter(p => p.id !== id)),
    cambiarStock: (id, cambio) => guardar(estado.productos.map(p => p.id === id ? { ...p, stock: Math.max(0, Math.min(Number.MAX_SAFE_INTEGER, p.stock + cambio)) } : p)),
  };
}
