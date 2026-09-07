import React from 'react';
import { Link } from 'react-router';
export default function NoEncontrado() { return <section className="hero"><p className="eyebrow">ERROR 404</p><h1>Esta página no existe.</h1><p>Revisa la dirección o vuelve al inicio para continuar.</p><Link className="boton" to="/">Volver a Inicio</Link></section>; }
