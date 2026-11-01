import Libro from './Libro.jsx';

export default function ListaLibros({ libros, miembros, onCambiarEstado, onQuitar }) {
  if (libros.length === 0) return <p className="panel" role="status">No hay libros que coincidan con los filtros. Cambia la selección o agrega una lectura.</p>;
  return <div className="catalogo">{libros.map(libro => <Libro key={libro.id} libro={libro} miembro={miembros.find(miembro => miembro.id === libro.miembroId)} onCambiarEstado={onCambiarEstado} onQuitar={onQuitar} />)}</div>;
}
