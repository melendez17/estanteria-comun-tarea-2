# Lista de requisitos y dónde encontrarlos

Esta lista separa lo implementado de las acciones que debe realizar el estudiante. Los números corresponden a los criterios de la rúbrica del PDF.

| Criterio | Trabajo realizado | Archivos o evidencia |
| --- | --- | --- |
| 1. DOM dinámico | Resultados y filas con createElement, textContent, fragmentos y actualizaciones puntuales | `buscador-js/js/dom.js`, `renderizado.js`, `lista.js` |
| 2. Eventos | Una escucha click para la lista, closest, contains y stopPropagation | `buscador-js/js/lista.js` |
| 3. Validación | Tipos HTML5, restricciones, setCustomValidity, mensajes por campo, año y fecha | `buscador-js/index.html`, `js/formulario.js`, `js/fechas.js` |
| 4. Autores | Crear y quitar, de uno a cinco, validación compartida y envío de todos | `buscador-js/js/autores.js`, `formulario.js` |
| 5. Comunicación | GET y POST, async/await, response.ok, captura de errores y estados visibles | `buscador-js/js/api.js`, `main.js`, `formulario.js` |
| 6. Animaciones | Clases entrando, cambiando y saliendo; retiro en transitionend | `buscador-js/js/lista.js`, `scss/_componentes.scss` |
| 7. Organización y depuración | Módulos ES, error real y breakpoint, capturas, red y optimización medida | `buscador-js/js/`, `docs/depuracion.md`, `docs/capturas/` |
| 8. Bootstrap | Grilla, utilidades, navegación, tarjetas, modal, formulario, alerta y tabla | `buscador-js/index.html`, `js/renderizado.js`, `js/lista.js` |
| 9. Sass | Variables originales, parciales, mixin, función, anidamiento, CSS Grid, variables CSS, rem y media queries | `buscador-js/scss/`, script sass en `package.json` |
| 10. Componentes | Funcionales y separados, children en Panel y Campo, funciones por props | `tablero-react/src/components/` |
| 11. Estado | useState, map/filter/spread, key por id, derivados y vacío condicional | `tablero-react/src/App.jsx`, `components/ListaLibros.jsx` |
| 12. Formularios y comunicación | Campos controlados y errores por campo; filtros y resumen hermanos con estado en App | `FormularioLibro.jsx`, `Filtros.jsx`, `Resumen.jsx`, `App.jsx` |
| 13. Repositorio | README, comparación de menos de una página, más de quince commits descriptivos y tag tarea-2 | `README.md`, historial Git y etiqueta |
| 14–17. Defensa | Guía, preguntas y ejercicios preparados; la defensa debe realizarla el estudiante | `docs/guia-paso-a-paso.md`, `docs/defensa.md` |

## Comprobaciones adicionales de la consigna

- [x] Parte A sin framework; Parte B con React y Vite.
- [x] Bootstrap instalado con npm, sin CDN.
- [x] Sin sobrescrituras propias con `!important`. El CSS generado sí contiene utilidades originales de Bootstrap que lo usan internamente.
- [x] Búsqueda por título o autor solo al enviar; endpoint con `limit=12`.
- [x] Título, autores, primera publicación, portada alternativa y detalle en modal.
- [x] Lista sin duplicados y tres estados.
- [x] Propuesta con título, autores, año, páginas, género, correo, fecha y motivo.
- [x] Datos iniciales del tablero definidos localmente; no hay fetch en React.
- [x] Filtros por estado y miembro; resumen de los libros que coinciden con ambos filtros.
- [x] Sin selectores ni modificación manual del DOM en componentes React. `src/main.jsx` únicamente monta la raíz, como requiere React.
- [x] Sin node_modules ni dist versionados.
- [x] Pruebas repetibles y comprobación separada de los servicios reales.
- [x] Repositorio público y archivo de enlace preparados.
- [ ] Acreditar trabajo distribuido durante el periodo de la tarea: **no se cumple**. El historial tiene las fechas reales del 1 de noviembre de 2026; no se ha retrodatado.
- [ ] Subir `entrega.txt` a Moodle. Requiere la acción del estudiante en su curso.
- [ ] Resolver con el docente la fecha de entrega ya transcurrida.
- [ ] Estudiar, practicar y realizar la defensa individual sin asistentes.

La documentación y las pruebas no garantizan una calificación: el docente evalúa el producto y el dominio que se demuestre en la defensa.
