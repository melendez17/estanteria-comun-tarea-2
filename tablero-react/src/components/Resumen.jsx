import { ESTADOS } from '../data/libros.js';

export default function Resumen({ resumen, total, visibles }) {
  return <div className="my-4" role="status" aria-live="polite"><p className="mb-2">Mostrando {visibles} de {total} libros. Resumen de la selección actual:</p><div className="resumen">{ESTADOS.map(estado => <span key={estado}>{estado}: <strong>{resumen[estado]}</strong></span>)}</div></div>;
}
