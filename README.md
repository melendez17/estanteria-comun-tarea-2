# Estantería Común

Tarea 2 de Programación Web Avanzada, Universidad CENFOTEC.

Dos aplicaciones para practicar la misma interacción: agregar libros, cambiar su estado y quitarlos. `buscador-js` usa JavaScript y DOM; `tablero-react` usa React y datos locales.

## Instalar y ejecutar

Requisito: Node.js 22 LTS (probado con 22.16.0), npm y conexión a Internet para instalar y usar las APIs de la Parte A. No se necesita clave de API.

```bash
git clone https://github.com/melendez17/estanteria-comun-tarea-2.git
cd estanteria-comun-tarea-2
```

Abre dos terminales en esta carpeta. En la primera:

```bash
cd buscador-js
npm ci
npm run sass
npm run dev
```

Buscador: http://127.0.0.1:5173

En la segunda:

```bash
cd tablero-react
npm ci
npm run dev
```

Tablero: http://127.0.0.1:5174

En Windows puedes usar `npm.cmd` si PowerShell bloquea `npm.ps1`. No abras `index.html` directamente: los módulos necesitan el servidor local.

### Trabajar con Sass y compilar

En `buscador-js`, `npm run sass` genera `public/css/main.css`. Para observar cambios, abre otra terminal y ejecuta `npm run sass:watch`. El CSS compilado se incluye para que el buscador arranque después de instalar dependencias. Recompila cuando cambies los parciales.

El tablero importa los parciales Sass de `buscador-js/scss` para compartir el diseño; conserva ambas carpetas hermanas. Vite compila Sass automáticamente en el tablero usando sus propias dependencias.

Para verificar producción, ejecuta `npm run build` dentro de **cada aplicación**. Después, `npm run preview` sirve el buscador en el puerto 4173 y el tablero en el 4174. `dist/` es generado y se excluye del repositorio.

## Qué se puede hacer

- **Buscador:** buscar por título o autor, abrir el detalle, agregar una lectura, recorrer Pendiente → Leyendo → Leído → Pendiente y quitarla. La tabla usa delegación de eventos y animaciones CSS.
- **Propuestas:** completar todos los campos, agregar hasta cinco autores y enviar al servicio de pruebas. JSONPlaceholder simula la respuesta; no registra una propuesta real.
- **Tablero:** filtrar por miembro y estado, consultar el resumen de la selección, agregar, cambiar estado y quitar libros. Los miembros y libros iniciales son datos de demostración locales.

Los cambios se conservan en memoria y se pierden al recargar. Las aplicaciones son ejercicios separados; no comparten las lecturas guardadas.

## Del DOM manual a React

En la Parte A, [lista.js](buscador-js/js/lista.js) escucha un clic en el contenedor de la tabla. `closest('button[data-accion]')` identifica el botón incluso si se pulsa un descendiente; se comprueba que pertenezca al contenedor y se detiene la propagación. Para cambiar estado, llama a `cambiarEstado(id)` en [estado.js](buscador-js/js/estado.js), que calcula el siguiente estado y devuelve el libro actualizado.

Modificar el arreglo no cambia automáticamente la pantalla: `lista.js` busca la fila en un `Map`, actualiza el texto y la clase de su etiqueta con `pintarEstado`, y reinicia la clase CSS `cambiando`. Se modifica solo esa fila. La responsabilidad de mantener sincronizados datos y DOM está en nuestro código. Para quitar, se espera `transitionend` antes de borrar el dato y retirar la fila.

En la Parte B, el botón de [Libro.jsx](tablero-react/src/components/Libro.jsx) invoca la función recibida por props. Esta llega a `cambiarEstado` en [App.jsx](tablero-react/src/App.jsx). `setLibros(actuales => actuales.map(...))` crea un arreglo nuevo y un objeto nuevo para el libro afectado. React vuelve a ejecutar el render con ese estado y actualiza el DOM necesario según el JSX y las claves estables.

Ya no necesitamos localizar una fila, asignar su texto ni mantener un mapa de nodos: la interfaz se describe como resultado del estado. La lista filtrada y el resumen se recalculan durante el renderizado. `Filtros` y `Resumen` son hermanos dentro de `Panel`; reciben datos del mismo ancestro `App`, por lo que sus cambios permanecen sincronizados sin guardar copias adicionales del resumen.

## Pruebas y evidencias

Con ambas aplicaciones ejecutándose en modo desarrollo, instala las herramientas de pruebas en la raíz:

```bash
npm ci
npm test
```

Las pruebas usan Google Chrome instalado (`channel: 'chrome'`). Si no lo tienes, instala Chrome o modifica el lanzamiento de Playwright para un navegador disponible. Cubren búsqueda, modal, datos tratados como texto, duplicados, estados, eliminación con movimiento reducido, autores, fechas, envío simulado, filtros y formulario React. Generan capturas y un registro en `docs/capturas`. Las APIs se simulan para que las pruebas sean repetibles; [servicios-reales.json](docs/capturas/servicios-reales.json) registra una comprobación separada de las APIs reales.

Consulta [depuración y rendimiento](docs/depuracion.md), [lista de requisitos](docs/requisitos.md), [explicación paso a paso](docs/guia-paso-a-paso.md) y [práctica para la defensa](docs/defensa.md).

## Entrega

El archivo [entrega.txt](entrega.txt) contiene el enlace al repositorio. La etiqueta Git `tarea-2` identifica el commit de entrega. Puedes comprobarla con `git show tarea-2` y revisar el historial con `git log --oneline --reverse`.

El historial registra el trabajo realizado el 1 de noviembre de 2026, con fechas reales. **No acredita trabajo distribuido a lo largo del periodo previo de la tarea.** La fecha de entrega que figura en la consigna es el 25 de octubre de 2026; confirma con el docente cómo presentar una entrega posterior. La publicación en GitHub no sustituye subir el archivo a Moodle.

Durante la defensa utiliza el commit etiquetado, ten ambas aplicaciones abiertas y trabaja las modificaciones en una rama aparte. Según la consigna, debes desactivar los asistentes de IA y las herramientas de generación o autocompletado, y solo puedes consultar documentación oficial.

## Documentación oficial consultada

- [Personalizar Bootstrap con Sass](https://getbootstrap.com/docs/5.3/customize/sass/)
- [Actualizaciones de arreglos en React](https://react.dev/learn/updating-arrays-in-state)
- [API de búsqueda de Open Library](https://openlibrary.org/dev/docs/api/search)
