# StockLab — Taller React Router

Inventario de una tienda de tecnología, construido con React, Vite y React Router. Incluye seis páginas, CRUD de productos, controles de stock, búsqueda, filtros, ordenamiento y persistencia local.

## Ejecutar

Instala Node.js 22.12 o posterior. Abre una terminal dentro de esta carpeta:

```bash
npm install
npm run dev
```

Abre la dirección que indique Vite (normalmente http://localhost:5173). No abras index.html con doble clic.

```bash
npm run build
npm run preview
```

El primer comando compila para producción; el segundo permite revisar esa compilación.

## Rutas

| URL | Página |
| --- | --- |
| / | Inicio y resumen |
| /inventario | Tarjetas, búsqueda, filtros, ordenamiento y stock |
| /nuevo | Registro de productos |
| /productos/:id | Detalle y edición |
| /acerca | Descripción del proyecto |
| Cualquier otra | Página 404 |

## Organización y props

- main.jsx envuelve App con BrowserRouter.
- App.jsx configura Routes y Route, mantiene Navbar visible y obtiene un único estado del hook useProductos.
- hooks/useProductos.js centraliza la carga, las modificaciones y localStorage. La clave es stocklab-productos-v1. Un inventario vacío se conserva vacío después de recargar.
- Inventario recibe productos, cambiarStock y eliminar; mantiene únicamente estados de interfaz para sus filtros.
- ProductoCard recibe producto, cambiarStock y eliminar. El enlace de detalle usa el id.
- NuevoProducto recibe agregar, reutiliza FormularioProducto y usa useNavigate para ir al inventario únicamente si el guardado funciona.
- DetalleProducto recibe productos y editar. useParams obtiene el id como texto; find localiza el producto comparando String(item.id) con id.
- FormularioProducto mantiene un borrador local: no duplica la fuente de verdad del inventario. Valida campos y llama a onGuardar.

Los precios están expresados en pesos colombianos. Stock bajo significa cinco unidades o menos. No existe backend ni autenticación; los datos pertenecen al navegador y origen utilizados. Cambiar de puerto u ordenador no transfiere el inventario.

## Pruebas manuales del taller

1. Abre Inicio y navega por todos los enlaces. Confirma que cambia la URL y permanece la barra de navegación.
2. Con los datos iniciales visita /productos/1, /productos/2 y /productos/3.
3. Visita /ruta-inexistente: debe mostrar 404. Visita /productos/desconocido: debe mostrar Producto no encontrado.
4. Agrega un producto. Debe volver automáticamente a Inventario. Recarga con F5 y comprueba los datos.
5. Entra al detalle, pulsa Editar producto, cambia nombre/precio/stock y guarda. Recarga y comprueba los cambios.
6. Cancela una edición y verifica que no cambió el producto.
7. Suma y resta stock. En cero el botón de restar debe quedar deshabilitado. Recarga.
8. Busca por nombre, selecciona categoría, activa stock bajo y prueba los tres ordenamientos.
9. Cancela y luego confirma la eliminación de un producto. Recarga y verifica que no reaparece.
10. Elimina todos los productos y recarga: el inventario debe seguir vacío.
11. Intenta guardar sin nombre, con precio negativo y stock decimal: el formulario debe impedirlo.
12. Abre las herramientas de desarrollo y comprueba que no aparezcan errores de la aplicación.

## Integrar con el MISMO repositorio del taller

Este paquete es un proyecto completo de referencia. No incluye el repositorio anterior ni demuestra los dos commits requeridos. Para cumplir esa parte, adapta los cambios dentro del repositorio que ya utilizas, conserva su carpeta .git y sus datos existentes; no crees otro repositorio.

Antes de modificar tu proyecto, revisa git status y respalda cambios pendientes. Compara src y package.json con tu implementación anterior. Si tu aplicación usa otra clave o estructura de localStorage, adapta el hook o migra esos datos para conservarlos; este ejemplo usa su propia clave.

Realiza cambios reales por etapas y revisa cada diff. Ejemplos de dos commits significativos:

1. Integra BrowserRouter, Navbar y páginas; verifica navegación y crea el commit: feat: agregar navegacion con React Router.
2. Integra el inventario, formulario, detalle dinámico y persistencia; actualiza README y crea el commit: feat: organizar inventario por paginas y conservar datos.

Usa git add con los archivos correspondientes y git commit -m con cada mensaje. Después de probar, usa git push al remoto existente y entrega su enlace. No se ha publicado ni modificado ningún repositorio desde este paquete.

## Sustentación

**¿Qué problema resolvió React Router?** Organizó una interfaz concentrada en una sola pantalla en páginas con URL propia y navegación interna.

**¿Ruta fija frente a /productos/:id?** Una ruta fija corresponde a una dirección concreta; la dinámica usa un segmento variable para consultar diferentes productos con el mismo componente.

**¿Qué devuelve useParams()?** Un objeto con los parámetros de la ruta; id se recibe como texto.

**¿Por qué find()?** Devuelve el primer producto cuyo id coincide, o undefined si no existe. Así se puede mostrar un mensaje de producto no encontrado.

**¿Para qué sirve useNavigate()?** Para cambiar de ruta desde una función, por ejemplo después de guardar correctamente.

**¿Qué mejoró al separar App.jsx?** Las páginas se ocupan de su interfaz, el formulario se reutiliza y el hook centraliza los datos. App conecta rutas y props.

## Publicación futura

BrowserRouter requiere que el servidor redirija las rutas de la aplicación a index.html. Configura ese fallback SPA en el alojamiento para que F5 funcione también en /inventario o /productos/1. Vite lo resuelve durante el desarrollo. Publicar el código en GitHub no publica automáticamente la aplicación.

Referencia oficial: https://reactrouter.com/start/declarative/installation
