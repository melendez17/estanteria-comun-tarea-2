import { useState } from 'react';
import { ESTADOS } from '../data/libros.js';
import Campo from './Campo.jsx';

const VACIO = { titulo: '', autor: '', miembroId: '', estado: 'Pendiente' };

export default function FormularioLibro({ miembros, onAgregar }) {
  const [valores, setValores] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');
  function cambiar(evento) {
    const { name, value } = evento.target;
    setValores(actual => ({ ...actual, [name]: value }));
    setErrores(actual => ({ ...actual, [name]: '' }));
    setMensaje('');
  }
  function atributos(nombre) {
    return { id: `nuevo-${nombre}`, name: nombre, value: valores[nombre], onChange: cambiar,
      className: `form-control ${errores[nombre] ? 'is-invalid' : ''}`,
      'aria-describedby': `error-nuevo-${nombre}`, 'aria-invalid': Boolean(errores[nombre]), required: true };
  }
  function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = {};
    if (valores.titulo.trim().length < 2) nuevosErrores.titulo = 'Escribe un título de al menos dos caracteres.';
    else if (valores.titulo.trim().length > 160) nuevosErrores.titulo = 'Usa como máximo 160 caracteres.';
    if (valores.autor.trim().length < 2) nuevosErrores.autor = 'Escribe un autor de al menos dos caracteres.';
    else if (valores.autor.trim().length > 100) nuevosErrores.autor = 'Usa como máximo 100 caracteres.';
    if (!miembros.some(miembro => miembro.id === valores.miembroId)) nuevosErrores.miembroId = 'Selecciona quién propone el libro.';
    if (!ESTADOS.includes(valores.estado)) nuevosErrores.estado = 'Selecciona un estado válido.';
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length) return;
    onAgregar({ ...valores, titulo: valores.titulo.trim(), autor: valores.autor.trim() });
    setValores(VACIO);
    setMensaje('Libro agregado. Si no aparece, revisa los filtros actuales.');
  }
  return <form onSubmit={enviar} className="panel" noValidate><p className="small">Todos los campos son obligatorios.</p><div className="row g-3">
    <Campo id="nuevo-titulo" etiqueta="Título" error={errores.titulo}><input {...atributos('titulo')} minLength={2} maxLength={160} /></Campo>
    <Campo id="nuevo-autor" etiqueta="Autor" error={errores.autor}><input {...atributos('autor')} minLength={2} maxLength={100} /></Campo>
    <Campo id="nuevo-miembroId" etiqueta="Propuesto por" error={errores.miembroId}><select {...atributos('miembroId')} className={`form-select ${errores.miembroId ? 'is-invalid' : ''}`}><option value="">Selecciona un miembro</option>{miembros.map(miembro => <option key={miembro.id} value={miembro.id}>{miembro.nombre}</option>)}</select></Campo>
    <Campo id="nuevo-estado" etiqueta="Estado inicial" error={errores.estado}><select {...atributos('estado')} className="form-select">{ESTADOS.map(estado => <option key={estado}>{estado}</option>)}</select></Campo>
    <div className="col-12"><button className="btn btn-primary" type="submit">Agregar al tablero</button></div>
  </div><p className="mt-3 mb-0" role="status" aria-live="polite">{mensaje}</p></form>;
}
