import { buscarLibros } from './api.js';
import { mostrarResultados, mostrarDetalle } from './renderizado.js';
import { agregarALista } from './lista.js';
import { iniciarFormulario } from './formulario.js';
import { aviso } from './dom.js';

const formulario = document.getElementById('busqueda');
const consulta = document.getElementById('consulta');
const resultados = document.getElementById('resultados');
const mensaje = document.getElementById('busqueda-aviso');
const buscar = document.getElementById('buscar');
let libros = [];
let buscando = false;

formulario.addEventListener('submit', async evento => {
  evento.preventDefault();
  if (buscando) return;
  const texto = consulta.value.trim();
  if (texto.length < 2) { aviso(mensaje, 'Escribe al menos dos caracteres.', 'warning'); consulta.focus(); return; }
  buscando = true;
  buscar.disabled = true;
  buscar.textContent = 'Buscando…';
  resultados.setAttribute('aria-busy', 'true');
  resultados.replaceChildren();
  libros = [];
  aviso(mensaje, 'Buscando libros en Open Library…', 'info');
  try {
    libros = await buscarLibros(texto, AbortSignal.timeout(20000));
    mostrarResultados(resultados, libros);
    aviso(mensaje, libros.length ? `Encontramos ${libros.length} libros. Abre un detalle o agrega una lectura.` : 'No encontramos libros. Prueba con otro título o autor.', libros.length ? 'success' : 'light');
  } catch (error) {
    aviso(mensaje, `No pudimos consultar el catálogo. Revisa tu conexión y vuelve a buscar. ${error.message}`, 'danger');
  } finally {
    buscando = false;
    buscar.disabled = false;
    buscar.textContent = 'Buscar libros';
    resultados.setAttribute('aria-busy', 'false');
  }
});

resultados.addEventListener('click', evento => {
  const control = evento.target.closest('button[data-accion]');
  if (!control || !resultados.contains(control)) return;
  evento.stopPropagation();
  const libro = libros.find(libro => libro.id === control.dataset.id);
  if (!libro) return;
  if (control.dataset.accion === 'detalle') mostrarDetalle(libro);
  if (control.dataset.accion === 'agregar') agregarALista(libro);
});

iniciarFormulario();
