import { enviarPropuesta } from './api.js';
import { aviso } from './dom.js';
import { iniciarAutores } from './autores.js';
import { hoyLocal } from './fechas.js';

export function iniciarFormulario() {
  const formulario = document.getElementById('propuesta');
  const anio = formulario.elements.anio;
  const fecha = formulario.elements.fecha;
  const respuesta = document.getElementById('propuesta-aviso');
  const enviar = document.getElementById('enviar-propuesta');
  const reiniciarAutores = iniciarAutores(document.getElementById('autores'), document.getElementById('agregar-autor'));
  let intentado = false;
  let enviando = false;
  function actualizarLimites() { anio.max = String(new Date().getFullYear()); fecha.min = hoyLocal(); }
  actualizarLimites();

  function validar(campo) {
    campo.setCustomValidity('');
    let mensaje = '';
    const valor = campo.value.trim();
    const validez = campo.validity;
    if (validez.badInput) mensaje = 'Escribe un número válido.';
    else if (campo.required && !valor) mensaje = 'Completa este campo.';
    else if (validez.typeMismatch) mensaje = 'Escribe un correo válido, como nombre@ejemplo.com.';
    else if (campo.id === 'anio' && Number(valor) > new Date().getFullYear()) mensaje = 'El año de publicación no puede ser futuro.';
    else if (campo.id === 'fecha' && valor < hoyLocal()) mensaje = 'La sesión debe ser hoy o en una fecha posterior.';
    else if (validez.rangeUnderflow) mensaje = `El valor mínimo es ${campo.min}.`;
    else if (validez.rangeOverflow) mensaje = `El valor máximo es ${campo.max}.`;
    else if (validez.stepMismatch) mensaje = 'Escribe un número entero.';
    else if (campo.minLength > 0 && valor.length < campo.minLength) mensaje = `Escribe al menos ${campo.minLength} caracteres.`;
    else if (campo.maxLength > 0 && valor.length > campo.maxLength) mensaje = `Usa como máximo ${campo.maxLength} caracteres.`;
    else if (validez.patternMismatch) mensaje = 'Escribe un nombre de autor válido.';
    campo.setCustomValidity(mensaje);
    document.getElementById(`error-${campo.id}`).textContent = mensaje;
    campo.classList.toggle('is-invalid', Boolean(mensaje));
    campo.setAttribute('aria-invalid', String(Boolean(mensaje)));
    return campo.checkValidity();
  }
  // La delegación también cubre los autores creados durante el uso.
  formulario.addEventListener('input', evento => {
    if (evento.target.matches('input, select, textarea') && intentado) validar(evento.target);
  });
  formulario.addEventListener('submit', async evento => {
    evento.preventDefault();
    if (enviando) return;
    actualizarLimites();
    intentado = true;
    const campos = [...formulario.querySelectorAll('input, select, textarea')];
    const resultados = campos.map(validar);
    if (resultados.includes(false)) { campos[resultados.indexOf(false)].focus(); return; }
    const datos = new FormData(formulario);
    const propuesta = {
      titulo: datos.get('titulo').trim(), autores: datos.getAll('autores').map(autor => autor.trim()),
      anio: Number(datos.get('anio')), paginas: Number(datos.get('paginas')),
      genero: datos.get('genero'), correo: datos.get('correo').trim(), fecha: datos.get('fecha'), motivo: datos.get('motivo').trim(),
    };
    enviando = true;
    enviar.disabled = true;
    enviar.textContent = 'Enviando…';
    aviso(respuesta, 'Estamos enviando tu propuesta.', 'info');
    try {
      await enviarPropuesta(propuesta);
      aviso(respuesta, 'Propuesta enviada al servicio de pruebas. El registro fue simulado.', 'success');
      formulario.reset();
      reiniciarAutores();
      intentado = false;
      campos.forEach(campo => { campo.setCustomValidity(''); campo.classList.remove('is-invalid'); campo.removeAttribute('aria-invalid'); });
      formulario.querySelectorAll('.error-campo').forEach(nodo => { nodo.textContent = ''; });
    } catch (error) {
      aviso(respuesta, `No se pudo enviar. Revisa tu conexión e inténtalo de nuevo. ${error.message}`, 'danger');
    } finally {
      enviando = false;
      enviar.disabled = false;
      enviar.textContent = 'Enviar propuesta';
    }
  });
}
