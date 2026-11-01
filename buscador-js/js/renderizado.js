import { Modal } from 'bootstrap';
import { elemento, boton } from './dom.js';

function portada(libro) {
  const imagen = elemento('img', 'portada');
  imagen.src = libro.portada;
  imagen.alt = libro.portada === '/sin-portada.svg' ? `Sin portada disponible: ${libro.titulo}` : `Portada de ${libro.titulo}`;
  imagen.loading = 'lazy';
  imagen.width = 180;
  imagen.height = 240;
  imagen.addEventListener('error', () => { imagen.src = '/sin-portada.svg'; }, { once: true });
  return imagen;
}

export function mostrarResultados(contenedor, libros) {
  const fragmento = document.createDocumentFragment();
  libros.forEach(libro => {
    const tarjeta = elemento('article', 'card libro');
    const cuerpo = elemento('div', 'card-body');
    const acciones = elemento('div', 'acciones');
    acciones.append(boton('Ver detalle', 'detalle', libro.id), boton('Agregar a mis lecturas', 'agregar', libro.id, 'btn btn-sm btn-primary'));
    cuerpo.append(elemento('h3', 'card-title', libro.titulo), elemento('p', 'mb-0', libro.autores.join(', ')), elemento('p', 'small text-secondary', `Primera publicación: ${libro.anio}`), acciones);
    tarjeta.append(portada(libro), cuerpo);
    fragmento.append(tarjeta);
  });
  contenedor.replaceChildren(fragmento);
}

export function mostrarDetalle(libro) {
  document.getElementById('detalle-titulo').textContent = libro.titulo;
  document.getElementById('detalle-cuerpo').replaceChildren(portada(libro), elemento('p', 'mt-3', `Autores: ${libro.autores.join(', ')}`), elemento('p', '', `Primera publicación: ${libro.anio}`), elemento('p', '', `Ediciones registradas: ${libro.ediciones}`));
  Modal.getOrCreateInstance(document.getElementById('detalle-modal')).show();
}
