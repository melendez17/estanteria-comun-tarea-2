import { elemento } from './dom.js';

export function iniciarAutores(contenedor, agregar) {
  let siguienteId = 0;
  function actualizarBotones() {
    const cantidad = contenedor.children.length;
    agregar.disabled = cantidad >= 5;
    contenedor.querySelectorAll('button').forEach(boton => { boton.disabled = cantidad <= 1; });
  }
  function crearAutor() {
    if (contenedor.children.length >= 5) return;
    const id = `autor-${++siguienteId}`;
    const fila = elemento('div', 'autor-fila mb-2');
    const grupo = elemento('div');
    const etiqueta = elemento('label', 'form-label', `Autor ${siguienteId}`);
    etiqueta.htmlFor = id;
    const campo = elemento('input', 'form-control');
    Object.assign(campo, { id, name: 'autores', required: true, minLength: 2, maxLength: 100, pattern: '.*\\S.*' });
    campo.setAttribute('aria-describedby', `error-${id}`);
    const error = elemento('span', 'error-campo');
    error.id = `error-${id}`;
    const quitar = elemento('button', 'btn btn-outline-danger align-self-center', 'Quitar autor');
    quitar.type = 'button';
    quitar.setAttribute('aria-label', `Quitar autor ${siguienteId}`);
    grupo.append(etiqueta, campo, error);
    fila.append(grupo, quitar);
    contenedor.append(fila);
    actualizarBotones();
    return campo;
  }
  agregar.addEventListener('click', () => crearAutor()?.focus());
  contenedor.addEventListener('click', evento => {
    const boton = evento.target.closest('button');
    if (!boton || contenedor.children.length <= 1) return;
    boton.closest('.autor-fila').remove();
    actualizarBotones();
    agregar.focus();
  });
  crearAutor();
  return () => { contenedor.replaceChildren(); siguienteId = 0; crearAutor(); };
}
