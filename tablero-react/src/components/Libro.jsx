import { ESTADOS } from '../data/libros.js';

export default function Libro({ libro, miembro, onCambiarEstado, onQuitar }) {
  const siguiente = ESTADOS[(ESTADOS.indexOf(libro.estado) + 1) % ESTADOS.length];
  const clase = libro.estado === 'Leyendo' ? 'estado-leyendo' : libro.estado === 'Leído' ? 'estado-leido' : '';
  return <article className="card libro"><div className="card-body">
    <div><span className={`estado ${clase}`}>{libro.estado}</span></div>
    <h3 className="card-title mt-2 mb-0">{libro.titulo}</h3><p className="mb-0">{libro.autor}</p><p className="small text-secondary">Propuesto por {miembro.nombre}</p>
    <div className="acciones"><button className="btn btn-sm btn-outline-primary" type="button" onClick={() => onCambiarEstado(libro.id)}>Pasar a {siguiente.toLowerCase()}</button><button className="btn btn-sm btn-outline-danger" type="button" onClick={() => onQuitar(libro.id)} aria-label={`Quitar ${libro.titulo}`}>Quitar</button></div>
  </div></article>;
}
