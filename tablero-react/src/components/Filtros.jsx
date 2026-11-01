import { ESTADOS } from '../data/libros.js';

export default function Filtros({ filtros, miembros, onCambiar }) {
  return <div className="row g-3 my-2">
    <div className="col-sm-5"><label htmlFor="filtro-estado" className="form-label">Filtrar por estado</label><select id="filtro-estado" className="form-select" value={filtros.estado} onChange={evento => onCambiar({ ...filtros, estado: evento.target.value })}><option value="">Todos los estados</option>{ESTADOS.map(estado => <option key={estado}>{estado}</option>)}</select></div>
    <div className="col-sm-5"><label htmlFor="filtro-miembro" className="form-label">Filtrar por miembro</label><select id="filtro-miembro" className="form-select" value={filtros.miembroId} onChange={evento => onCambiar({ ...filtros, miembroId: evento.target.value })}><option value="">Todos los miembros</option>{miembros.map(miembro => <option key={miembro.id} value={miembro.id}>{miembro.nombre}</option>)}</select></div>
    <div className="col-sm-2 d-flex align-items-end"><button type="button" className="btn btn-outline-primary w-100" onClick={() => onCambiar({ estado: '', miembroId: '' })}>Limpiar</button></div>
  </div>;
}
