export const ESTADOS = ['Pendiente', 'Leyendo', 'Leído'];
let lecturas = [];

export function obtenerLecturas() { return lecturas.map(libro => ({ ...libro })); }
export function agregarLectura(libro) {
  if (lecturas.some(actual => actual.id === libro.id)) return null;
  const lectura = { ...libro, estado: ESTADOS[0] };
  lecturas = [...lecturas, lectura];
  return lectura;
}
export function cambiarEstado(id) {
  const actual = lecturas.find(libro => libro.id === id);
  if (!actual) return null;
  const actualizado = { ...actual, estado: ESTADOS[(ESTADOS.indexOf(actual.estado) + 1) % ESTADOS.length] };
  lecturas = lecturas.map(libro => libro.id === id ? actualizado : libro);
  return actualizado;
}
export function quitarLectura(id) { lecturas = lecturas.filter(libro => libro.id !== id); }
