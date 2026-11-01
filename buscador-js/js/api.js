const BUSQUEDA = 'https://openlibrary.org/search.json';
const PROPUESTAS = 'https://jsonplaceholder.typicode.com/posts';

export async function buscarLibros(texto, signal) {
  const parametros = new URLSearchParams({ q: texto, limit: '12' });
  const respuesta = await fetch(`${BUSQUEDA}?${parametros}`, { signal });
  if (!respuesta.ok) throw new Error(`El catálogo respondió con el código ${respuesta.status}.`);
  const datos = await respuesta.json();
  if (!Array.isArray(datos.docs)) throw new Error('El catálogo devolvió una respuesta inesperada.');
  return datos.docs.filter(libro => typeof libro.key === 'string').map(libro => ({
    id: libro.key,
    titulo: libro.title || 'Sin título',
    autores: Array.isArray(libro.author_name) ? libro.author_name : ['Autor desconocido'],
    anio: libro.first_publish_year ?? 'Sin fecha',
    portada: libro.cover_i ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg` : '/sin-portada.svg',
    ediciones: libro.edition_count ?? 0,
  }));
}

export async function enviarPropuesta(propuesta) {
  const respuesta = await fetch(PROPUESTAS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(propuesta),
    signal: AbortSignal.timeout(20000),
  });
  if (!respuesta.ok) throw new Error(`No se pudo enviar la propuesta (${respuesta.status}).`);
  return respuesta.json();
}
