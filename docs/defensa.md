# Preparación para la defensa

La defensa es individual y representa el 50 % de la nota. La consigna exige desactivar los asistentes de IA y las herramientas de generación o autocompletado; solo permite documentación oficial. Practica sin ayuda antes de presentar.

## Antes de entrar

1. Confirma `git status` limpio y la etiqueta con `git show tarea-2 --stat`.
2. Ejecuta ambas aplicaciones siguiendo el README y déjalas abiertas.
3. Comprueba una búsqueda real y la respuesta del formulario de prueba.
4. Localiza los archivos de la tabla de requisitos.
5. Crea una rama para cambios de defensa: `git switch -c practica-defensa tarea-2`.

No muevas ni reemplaces la etiqueta de entrega para practicar.

## Explica estas dos interacciones sin leer la guía

**Parte A:** clic en Cambiar estado → burbujeo al tbody → closest y dataset → función de estado → nuevo libro → actualización precisa de etiqueta → clase de animación.

**Parte B:** clic en el botón de Libro → callback recibido por props → función de App → setLibros con map y objeto nuevo → render → lista filtrada, resumen y tarjeta actualizados.

Si no puedes explicar uno de los pasos, ejecútalo con un punto de interrupción y observa sus valores.

## Preguntas frecuentes para practicar

| Pregunta | Idea que debes justificar en tu código |
| --- | --- |
| ¿Por qué una escucha en el tbody? | El burbujeo cubre botones existentes y nuevos; no se duplica una escucha por fila. |
| ¿Qué diferencia hay entre target y currentTarget? | target es el origen; currentTarget es el contenedor cuya escucha se ejecuta. |
| ¿Por qué closest y contains? | Identificar un botón desde un descendiente y verificar que pertenezca al área gestionada. |
| ¿Por qué response.ok? | fetch puede resolver una respuesta HTTP de error; no todo fallo es rechazo de red. |
| ¿Por qué await aparece dos veces? | Se espera la respuesta de red y luego la lectura/conversión del cuerpo JSON. |
| ¿Por qué limpiar setCustomValidity? | Un mensaje no vacío conserva la invalidez incluso después de corregir el contenido. |
| ¿Novalidate elimina la validación? | Desactiva la interacción automática al enviar; se siguen usando restricciones y checkValidity desde JavaScript. |
| ¿Cómo entran los autores nuevos en la validación? | El contenedor delega input y la validación al enviar consulta todos los campos actuales. |
| ¿Por qué no usar innerHTML? | Los datos externos deben ser texto; no deben convertirse en HTML ejecutable. |
| ¿Por qué esperar transitionend? | Retirar el nodo antes impediría ver la salida y podría descoordinar datos y vista. |
| ¿Qué diferencia hay entre Sass y CSS variables? | Sass resuelve al compilar; las variables CSS siguen disponibles en el navegador. |
| ¿Por qué no push en React? | Mutaría el arreglo actual; usamos un arreglo nuevo para expresar la actualización. |
| ¿Por qué una key con id? | La identidad sobrevive a filtros, altas y eliminaciones. |
| ¿Por qué el resumen no tiene useState? | Se puede calcular desde libros y filtros; guardarlo duplicaría información. |
| ¿Por qué el estado está en App? | Es el ancestro común de los componentes que necesitan coordinarse. |
| ¿Dónde hay children y una función por props? | Panel/Campo reciben children; Libro recibe onCambiarEstado y onQuitar. |

## Ejercicios de modificación en caliente

### Agregar el estado “Pausado” en ambas partes

1. Agrégalo a `ESTADOS` en `buscador-js/js/estado.js` y `tablero-react/src/data/libros.js`.
2. El ciclo usa la longitud del arreglo, por lo que recorrerá el nuevo estado.
3. En la Parte A añade una clase y su correspondencia en `pintarEstado` si quieres un color propio. En React actualiza la selección de clase en `Libro.jsx`.
4. Los filtros, el select del formulario y el resumen React se generan desde ESTADOS: comprueba que lo incorporen.
5. Recompila Sass en A y prueba el ciclo y los filtros. Explica qué se reutilizó y qué no se automatizaba todavía.

### Añadir una regla para páginas

1. En A cambia `min` a 30 en `index.html`.
2. La validación existente lee ese mínimo y produce su mensaje.
3. Si necesitas una regla específica, añádela en `validar`, después de limpiar el mensaje anterior y antes de las condiciones generales.
4. Prueba 29, 30, vacío y un decimal.

### Mostrar otro dato de Open Library

1. Verifica el nombre del campo en la respuesta real de Network y en la documentación oficial.
2. Añádelo al mapeo de `buscarLibros`, con un valor alternativo si falta.
3. Crea su nodo con `elemento` y añádelo al detalle en `renderizado.js`.
4. No añadas otro fetch si el dato ya llegó en la búsqueda.

### Añadir un filtro de texto en React

1. Añade una propiedad `texto` al estado filtros de App.
2. Incluye el input controlado en Filtros y comunica los cambios con onCambiar.
3. Añade la condición de título normalizado a `filtrados`.
4. Actualiza el botón Limpiar para restablecer también texto.
5. El resumen se actualizará porque se calcula desde ese mismo arreglo.

### Cambiar el color principal

1. Modifica `$primary` en `buscador-js/scss/_variables.scss`.
2. Ejecuta `npm run sass` dentro de buscador-js.
3. React toma el mismo parcial y Vite recompila; comprueba ambas pantallas.
4. Verifica contraste y explica que modificaste el origen antes de Bootstrap.

## Cómo estudiar

Primero recorre la interfaz. Después explica cada evento mirando el archivo correspondiente. Luego cierra la guía e intenta reconstruir el recorrido. Finalmente resuelve un ejercicio y prueba los casos límite. Si solo memorizas nombres, una modificación pequeña expondrá los vacíos; comprender datos, eventos y renderizado permite adaptarte.
