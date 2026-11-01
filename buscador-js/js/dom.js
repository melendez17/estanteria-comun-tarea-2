// El contenido externo siempre se asigna a textContent, nunca se interpreta como HTML.
export function elemento(etiqueta, clases = '', texto = '') {
  const nodo = document.createElement(etiqueta);
  nodo.className = clases;
  nodo.textContent = texto;
  return nodo;
}

export function aviso(contenedor, texto, tipo = 'info') {
  contenedor.className = `alert alert-${tipo}`;
  contenedor.textContent = texto;
}

export function boton(texto, accion, id, clases = 'btn btn-sm btn-outline-primary') {
  const nodo = elemento('button', clases, texto);
  nodo.type = 'button';
  nodo.dataset.accion = accion;
  nodo.dataset.id = id;
  return nodo;
}
