import { agregarLectura, cambiarEstado, quitarLectura, obtenerLecturas } from './estado.js';
import { elemento, boton, aviso } from './dom.js';

const cuerpo = document.getElementById('lista-lecturas');
const notificacion = document.getElementById('lista-aviso');
const filas = new Map();

function sincronizarVacio() {
  const vacia = obtenerLecturas().length === 0;
  document.getElementById('lista-vacia').hidden = !vacia;
  document.getElementById('tabla-contenedor').hidden = vacia;
}
function pintarEstado(nodo, estado) {
  nodo.textContent = estado;
  nodo.className = `estado ${estado === 'Leyendo' ? 'estado-leyendo' : estado === 'Leído' ? 'estado-leido' : ''}`;
}
export function agregarALista(libro) {
  const lectura = agregarLectura(libro);
  if (!lectura) { aviso(notificacion, 'Ese libro ya está en tu lista.', 'warning'); return; }
  const fila = elemento('tr', 'lectura entrando');
  const nombre = elemento('td');
  nombre.append(elemento('strong', 'd-block', libro.titulo), elemento('small', '', libro.autores.join(', ')));
  const celdaEstado = elemento('td');
  const etiqueta = elemento('span');
  pintarEstado(etiqueta, lectura.estado);
  celdaEstado.append(etiqueta);
  const acciones = elemento('td');
  const grupo = elemento('div', 'd-flex flex-wrap gap-2');
  grupo.append(boton('Cambiar estado', 'estado', libro.id), boton('Quitar', 'quitar', libro.id, 'btn btn-sm btn-outline-danger'));
  acciones.append(grupo);
  fila.append(nombre, celdaEstado, acciones);
  filas.set(libro.id, { fila, etiqueta });
  cuerpo.append(fila);
  sincronizarVacio();
  aviso(notificacion, `Se agregó «${libro.titulo}» a tus lecturas.`, 'success');
  fila.addEventListener('animationend', () => fila.classList.remove('entrando'), { once: true });
}

// Una única escucha atiende todos los botones, incluidos los agregados después.
cuerpo.addEventListener('click', evento => {
  const control = evento.target.closest('button[data-accion]');
  if (!control || !cuerpo.contains(control)) return;
  evento.stopPropagation();
  const { id, accion } = control.dataset;
  const registro = filas.get(id);
  if (!registro || registro.fila.classList.contains('saliendo')) return;
  if (accion === 'estado') {
    const libro = cambiarEstado(id);
    pintarEstado(registro.etiqueta, libro.estado);
    // Reiniciar la clase permite repetir la animación si se pulsa rápidamente.
    registro.fila.classList.remove('cambiando');
    void registro.fila.offsetWidth;
    registro.fila.classList.add('cambiando');
    aviso(notificacion, `«${libro.titulo}» está ${libro.estado.toLowerCase()}.`, 'success');
  }
  if (accion === 'quitar') {
    registro.fila.querySelectorAll('button').forEach(control => { control.disabled = true; });
    registro.fila.classList.add('saliendo');
    // Solo opacity finaliza esta eliminación; no se elimina antes de la transición.
    registro.fila.addEventListener('transitionend', eventoFin => {
      if (eventoFin.target !== registro.fila || eventoFin.propertyName !== 'opacity') return;
      quitarLectura(id);
      registro.fila.remove();
      filas.delete(id);
      sincronizarVacio();
      aviso(notificacion, 'Se quitó el libro de tus lecturas.', 'info');
    });
  }
});
