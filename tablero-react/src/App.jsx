import { useState } from 'react';
import { ESTADOS, miembros, librosIniciales } from './data/libros.js';
import Panel from './components/Panel.jsx';
import Filtros from './components/Filtros.jsx';
import Resumen from './components/Resumen.jsx';
import ListaLibros from './components/ListaLibros.jsx';
import FormularioLibro from './components/FormularioLibro.jsx';

export default function App() {
  const [libros, setLibros] = useState(librosIniciales);
  const [filtros, setFiltros] = useState({ estado: '', miembroId: '' });
  const [aviso, setAviso] = useState('');

  // Se calculan en cada render; no son otro estado que pueda desincronizarse.
  const filtrados = libros.filter(libro => (!filtros.estado || libro.estado === filtros.estado) && (!filtros.miembroId || libro.miembroId === filtros.miembroId));
  const resumen = Object.fromEntries(ESTADOS.map(estado => [estado, filtrados.filter(libro => libro.estado === estado).length]));

  function cambiarEstado(id) {
    setLibros(actuales => actuales.map(libro => libro.id === id ? { ...libro, estado: ESTADOS[(ESTADOS.indexOf(libro.estado) + 1) % ESTADOS.length] } : libro));
    setAviso('Estado actualizado. La lista y el resumen reflejan los filtros actuales.');
  }
  function quitarLibro(id) {
    setLibros(actuales => actuales.filter(libro => libro.id !== id));
    setAviso('Libro quitado del tablero.');
  }
  function agregarLibro(datos) {
    const nuevo = { ...datos, id: crypto.randomUUID() };
    setLibros(actuales => [...actuales, nuevo]);
    setAviso('Se agregó una nueva lectura al club.');
  }

  return <>
    <a className="visually-hidden-focusable" href="#principal">Saltar al contenido</a>
    <nav className="navbar bg-white" aria-label="Navegación principal"><div className="container gap-2"><a className="navbar-brand" href="#">Estantería Común</a><a className="nav-link" href="#agregar">Agregar lectura</a></div></nav>
    <main id="principal" className="container pb-5">
      <header className="intro"><h1>Las historias que compartimos.</h1><p className="lead mt-3">Organiza las lecturas del club, encuentra lo que está leyendo cada miembro y elige qué sigue.</p><p className="small text-secondary">Datos de demostración. Los cambios duran hasta recargar la página.</p></header>
      <Panel titulo="Lecturas del club" id="club">
        <Filtros filtros={filtros} miembros={miembros} onCambiar={setFiltros} />
        <Resumen resumen={resumen} total={libros.length} visibles={filtrados.length} />
        <p className="small" role="status" aria-live="polite">{aviso}</p>
        <ListaLibros libros={filtrados} miembros={miembros} onCambiarEstado={cambiarEstado} onQuitar={quitarLibro} />
      </Panel>
      <Panel titulo="Agrega la próxima lectura" id="agregar"><FormularioLibro miembros={miembros} onAgregar={agregarLibro} /></Panel>
    </main>
    <footer className="pie"><div className="container">Estantería Común · Un club, muchas historias.</div></footer>
  </>;
}
