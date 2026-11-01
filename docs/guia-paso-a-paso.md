# Explicación paso a paso: qué se hizo y por qué

Lee esta guía con el proyecto abierto. Ejecuta cada interacción y busca la función mencionada. El objetivo es poder predecir lo que hará el código y modificarlo sin depender de un asistente.

## 1. Entender las dos aplicaciones

La consigna pide resolver una misma interacción con dos modelos. En la Parte A, nuestros datos y los elementos de la página son cosas que sincronizamos manualmente. En la Parte B, guardamos datos en estado y React obtiene la interfaz a partir de ellos.

No se conectaron las aplicaciones entre sí porque la Parte B debe usar datos locales y no consumir una API. Tampoco se agregó una base de datos: la consigna permite datos en memoria. Al recargar, se reinicia la sesión.

## 2. Preparar las carpetas y npm

`buscador-js` y `tablero-react` tienen su propio `package.json`. Ese archivo declara las librerías y los comandos. `package-lock.json` fija versiones para repetir la instalación con `npm ci`.

`node_modules` contiene las dependencias descargadas y se excluye mediante `.gitignore`: otro equipo puede reconstruirlo con npm. `dist` contiene los archivos de producción y también se genera cuando se necesita. El `package.json` de la raíz solo sirve para las pruebas del navegador.

**Por qué:** separar las partes evita mezclar React con el ejercicio de DOM manual. Fijar versiones reduce diferencias entre tu equipo y el del docente.

## 3. Construir el HTML de la Parte A

Abre `buscador-js/index.html`. La página contiene navegación, búsqueda, resultados, tabla de lecturas, propuesta y modal. Cada sección tiene un encabezado y cada campo un label asociado por `for` e `id`.

Los avisos usan `role="status"` y `aria-live="polite"` para comunicar cambios sin mover el foco. Los errores de campos se enlazan con `aria-describedby`.

**Por qué:** HTML semántico facilita teclado, lectores de pantalla y mantenimiento. Los identificadores también permiten a los módulos localizar los puntos que deben actualizar.

## 4. Personalizar Bootstrap desde Sass

Lee, en este orden, `scss/_variables.scss`, `_mixins.scss`, `_bootstrap.scss`, `_componentes.scss` y `main.scss`.

1. `_variables.scss` cambia `$primary`, `$body-bg`, `$font-family-sans-serif`, `$border-radius` y otras variables **antes** de cargar Bootstrap.
2. Bootstrap define muchas variables con `!default`: conserva nuestros valores previos en lugar de reemplazarlos.
3. `_bootstrap.scss` carga configuración, grilla y componentes usados.
4. `_componentes.scss` añade estilos del proyecto.
5. `npm run sass` compila todo a CSS, que es lo que entiende el navegador.

La función `espacio(6)` devuelve `1.5rem`. El mixin `desde-tablet` reutiliza una media query. El anidamiento `.libro .card-body` expresa que el cuerpo pertenece a ese componente. `--espacio` es una variable CSS que el navegador conserva; `$primary` es una variable Sass resuelta al compilar. No son lo mismo.

**Por qué:** personalizar las variables originales mantiene coherencia entre botones, formularios y demás componentes. Evita pelear con estilos mediante sobrescrituras y `!important`.

## 5. Adaptar la pantalla

Bootstrap distribuye columnas mediante `row`, `col-sm-6`, `col-lg-4` y `col-lg-8`. El catálogo propio usa CSS Grid: una columna como valor inicial, dos a partir de 48rem y tres a partir de 70rem.

Ese orden es mobile-first: primero funciona en una pantalla pequeña y después gana columnas. Las unidades `rem`, los anchos fluidos y `minmax(0, 1fr)` permiten reducir columnas sin forzar el ancho de la página. La tabla tiene desplazamiento dentro de su contenedor si el contenido lo necesita.

**Por qué:** no basta con encoger letras en móvil; los grupos deben reorganizarse para que sea posible usarlos.

## 6. Recorrer una búsqueda completa

Abre `js/main.js` y `js/api.js`.

1. El usuario escribe. No se envía ninguna petición todavía.
2. El formulario emite `submit` al pulsar Buscar o Enter.
3. `preventDefault()` evita la navegación y recarga normal del formulario.
4. Se recortan espacios y se comprueba una longitud mínima.
5. El botón se desactiva y aparece el aviso de carga.
6. `buscarLibros` construye `q` y `limit=12` con `URLSearchParams`.
7. `await fetch(...)` espera la respuesta sin bloquear el resto de la página.
8. `response.ok` comprueba si el código HTTP está entre 200 y 299. Un 404 o 503 no hace que fetch rechace automáticamente: por eso se lanza un error manualmente.
9. `await response.json()` convierte el cuerpo JSON en objetos JavaScript.
10. Se verifica `docs` y se transforman los campos de Open Library a nombres usados por nuestra aplicación.
11. Se muestran tarjetas o un mensaje de búsqueda vacía.
12. Si falla la red, el tiempo de espera o el HTTP, `catch` muestra un mensaje de recuperación.
13. `finally` restaura el botón y termina el indicador de carga, tanto en éxito como en error.

**Por qué:** el usuario necesita distinguir esperar, no encontrar y fallar. El límite de 20 segundos evita una espera indefinida. Bloquear una segunda búsqueda durante la primera evita que una respuesta antigua reemplace a una nueva.

## 7. Crear resultados sin interpretar HTML ajeno

`renderizado.js` recorre el arreglo con `forEach`. La función `elemento` de `dom.js` usa `document.createElement` y asigna `textContent`. Se agrupan nodos en un `DocumentFragment` y se reemplaza el contenido de resultados al terminar.

Si un título recibido fuera `<img src=x onerror=alert(1)>`, se vería ese texto: no se crearía una imagen ejecutable. Esa situación se prueba en el recorrido automático.

Cada portada lleva texto alternativo, dimensiones y carga diferida. Si no existe portada o falla su descarga, se usa el SVG local `sin-portada.svg`. Al abrir un detalle, se llenan el título y cuerpo del modal con métodos del DOM y Bootstrap gestiona su apertura, foco y cierre.

**Por qué:** tratar los datos externos como texto evita convertirlos en código o marcado. El fragmento organiza la construcción sin insertar cada tarjeta una por una en el contenedor visible.

## 8. Guardar un libro y evitar duplicados

En `estado.js`, `lecturas` empieza como un arreglo vacío. `agregarLectura` busca el identificador de Open Library con `some`. Si ya existe, devuelve `null`; si no, crea una lectura con estado Pendiente y un arreglo nuevo.

`lista.js` interpreta ese resultado: muestra un aviso de duplicado o construye una fila. Un `Map` relaciona cada identificador con su fila y etiqueta de estado. Después se actualiza la visibilidad del mensaje vacío y la tabla.

**Por qué:** dos libros pueden tener el mismo título; el identificador es una comprobación más confiable. El mapa permite actualizar una fila sin reconstruir toda la lista.

## 9. Entender la delegación y la propagación

En lugar de registrar una escucha por botón, `lista.js` registra una sola en `tbody`. Un clic en el botón sube por sus ancestros: eso es propagación por burbujeo.

`evento.target.closest('button[data-accion]')` encuentra el control aunque el clic provenga de un elemento dentro de él. `contains` confirma que pertenece al contenedor. `dataset.accion` e `id` permiten decidir qué hacer. `stopPropagation()` impide que ese clic siga subiendo y active una acción de un contenedor exterior.

`preventDefault()` y `stopPropagation()` son distintos: el primero cancela el comportamiento predeterminado; el segundo detiene el recorrido del evento. Los botones de acción tienen `type="button"` para no enviar formularios accidentalmente.

**Por qué:** la escucha del contenedor también funciona con filas creadas después. Reduce registros y concentra la lógica de esa interacción.

## 10. Cambiar estado y actualizar el DOM manualmente

`ESTADOS` contiene los tres textos. Para avanzar, el índice siguiente se calcula con `(indice + 1) % ESTADOS.length`. El resto de la división devuelve cero cuando se llega al final, cerrando el ciclo.

`cambiarEstado(id)` devuelve el libro actualizado. Luego `pintarEstado` cambia el texto y las clases de su etiqueta. La clase `cambiando` reinicia la animación en las celdas. No se reconstruyen tarjetas, tabla ni formulario.

**Por qué:** modificar un objeto no actualiza por sí mismo un nodo HTML. Aquí se ve la responsabilidad adicional que tiene el enfoque manual.

## 11. Animar y quitar en el momento correcto

Al agregar se aplica `entrando`. Al cambiar estado se aplica `cambiando`. Al quitar se desactivan los botones de la fila y se aplica `saliendo`, que reduce opacidad y desplaza la fila.

La eliminación del dato y del nodo ocurre al recibir `transitionend` para la propiedad `opacity` de esa misma fila. Se comprueba el origen porque los eventos también pueden propagarse desde descendientes. Si se borrara la fila al hacer clic, la transición no se vería.

La media query `prefers-reduced-motion` reduce la duración a un valor casi instantáneo; conserva un evento final que permite completar la eliminación.

**Por qué:** los datos y la interfaz deben terminar consistentes incluso si se pulsa más de una vez o el usuario reduce las animaciones.

## 12. Crear y quitar autores

`autores.js` construye campo, label, mensaje y botón para cada autor. Los identificadores son únicos y cada campo recibe las mismas restricciones. El botón Agregar se desactiva con cinco autores y los botones Quitar se desactivan cuando queda uno.

Al quitar, se elimina el grupo completo. `FormData.getAll('autores')` recoge todos los valores del mismo nombre en el orden presente. Los números de las etiquetas pueden tener saltos si se quita un autor; sus identificadores siguen siendo únicos.

**Por qué:** validar o enviar solo el primer campo perdería los autores agregados. La delegación del formulario evita tener que registrar validación nueva para cada campo.

## 13. Combinar HTML5 y mensajes propios

`index.html` declara `required`, `min`, `max`, `minlength`, `maxlength`, `pattern` y tipos como email y date. `formulario.js` lee `campo.validity` y usa `setCustomValidity(mensaje)` para personalizar errores.

Primero se limpia el error anterior con `setCustomValidity('')`; si no se hiciera, un campo corregido podría seguir inválido. Se muestra el texto junto al campo, se añade `is-invalid` y se informa `aria-invalid`.

El formulario lleva `novalidate`: evita las burbujas automáticas del navegador para controlar cuándo se muestran los mensajes. **No elimina las restricciones HTML5**: siguen disponibles mediante `validity` y `checkValidity()`.

Se validan todos los campos antes de decidir si enviar. El primer campo inválido recibe foco. Después de intentar enviar, los mensajes se actualizan mientras se corrige cada campo.

**Por qué:** las restricciones nativas cubren formatos básicos; la lógica JavaScript añade reglas del club y explicaciones consistentes.

## 14. Validar fechas y números

El máximo de año es el año actual y el mínimo de fecha de sesión es hoy. `fechas.js` construye `AAAA-MM-DD` con el calendario local. No se usa `toISOString().slice(0, 10)`, porque la conversión UTC puede dar un día distinto al local cerca de medianoche.

Los límites se actualizan al iniciar y al enviar. Año y páginas deben ser números enteros positivos; páginas tiene un máximo de 20 000 como límite razonable definido por esta implementación. La consigna no fija ese máximo concreto.

**Por qué:** un tipo date no sabe que la sesión debe ser futura; hay que expresar esa regla. Comparar cadenas de fecha con formato uniforme AAAA-MM-DD mantiene el orden cronológico para fechas válidas.

## 15. Enviar la propuesta sin recargar

Tras validar, `FormData` reúne valores. Los números se convierten con `Number` y los textos se recortan. `enviarPropuesta` hace POST con cuerpo `JSON.stringify(propuesta)` y cabecera `Content-Type: application/json`.

Se bloquean envíos repetidos mientras espera. Si funciona, se informa que el registro fue simulado, se reinicia el formulario y se deja un autor vacío. Si falla, se conservan los datos para corregir o reintentar. `finally` reactiva el botón.

**Por qué:** JSONPlaceholder es el servicio solicitado para probar comunicación; no hay que confundir su respuesta HTTP 201 con persistencia real.

## 16. Dividir React en componentes

`App.jsx` coordina. `Filtros` permite seleccionar; `Resumen` muestra cantidades; `ListaLibros` decide si renderizar tarjetas o el vacío; `Libro` muestra una tarjeta; `FormularioLibro` gestiona la nueva lectura; `Campo` y `Panel` reutilizan estructura mediante `children`.

Una prop es un dato recibido del padre. `children` representa el contenido escrito entre las etiquetas de un componente. Props como `onQuitar` son funciones que el hijo llama para solicitar un cambio.

**Por qué:** separar por responsabilidad hace posible explicar y cambiar una función sin mezclar toda la aplicación en un archivo.

## 17. Elevar el estado para sincronizar hermanos

`App` tiene `libros` y `filtros` con `useState`. Estos valores pertenecen al ancestro que los componentes necesitan en común. `Filtros` recibe los valores y la función que los cambia; `Resumen` recibe el resultado calculado.

En cada render, `filtrados` se calcula con `filter`, usando ambas condiciones. Después se cuentan los estados de ese mismo arreglo. Por eso el resumen describe la selección actual, como dice su texto. No se guardan `filtrados` ni `resumen` en otros useState.

**Por qué:** guardar información derivable crea dos versiones que podrían desincronizarse. Elevar el estado permite que los hermanos trabajen con una sola fuente de datos.

## 18. Actualizar sin mutar y usar keys estables

Agregar usa `[...actuales, nuevo]`. Cambiar usa `map` y `{...libro, estado: nuevoEstado}`. Quitar usa `filter`. En los tres casos se crea un arreglo nuevo. Las funciones actualizadoras reciben la versión más reciente del estado.

Cada libro nuevo obtiene `crypto.randomUUID()` al agregarlo, no durante cada render. Cada tarjeta usa `key={libro.id}`. No se usa el índice porque cambia al filtrar o quitar elementos.

**Por qué:** React detecta el nuevo estado y conserva la identidad de cada elemento. Mutar con push o reutilizar claves inestables puede impedir actualizaciones o asociar una interfaz al libro equivocado.

## 19. Entender el formulario controlado

En `FormularioLibro`, los valores están en `useState`. Cada campo tiene `value` y `onChange`: al escribir, se crea un objeto nuevo con el campo actualizado y React renderiza el valor.

Al enviar se validan título, autor, miembro y estado. Los errores se guardan por nombre y se muestran en `Campo`. Si todo es válido, el hijo llama a `onAgregar(datos)` y el padre agrega el libro al estado común.

**Por qué:** el valor que se ve y el que se envía provienen de la misma fuente. El hijo no necesita conocer cómo se almacenan o filtran los libros del padre.

## 20. Comparar el recorrido de una interacción

| Acción | JavaScript manual | React |
| --- | --- | --- |
| Recibir clic | Escucha delegada en tbody | onClick en el componente |
| Identificar libro | dataset.id del botón | id disponible en props |
| Actualizar dato | Función del módulo estado.js | setLibros con map/filter/spread |
| Actualizar pantalla | Buscar fila y cambiar texto/clases | Nuevo render a partir del estado |
| Mantener resumen | Habría que actualizarlo manualmente | Se deriva del arreglo actual |

React también usa el DOM del navegador. La diferencia es quién administra su actualización: nuestros componentes describen qué mostrar y React realiza la reconciliación.

## 21. Probar y medir

`npm test` usa un navegador real con respuestas API controladas. Permite repetir éxito, vacío y error sin depender de que un servidor externo falle justo cuando lo necesitamos. Las comprobaciones reales de los servicios se guardan por separado.

La medición de rendimiento usa producción: el modo desarrollo agrega módulos y herramientas que cambiarían el resultado. Se comparó la misma página antes y después de reducir imports. La explicación del error del género y las capturas están en `depuracion.md`.

**Por qué:** una captura bonita no demuestra que el formulario envíe todos los autores. Un build exitoso tampoco demuestra que se puedan usar los filtros. Hay que verificar comportamiento, aspecto y compilación según lo que se quiere comprobar.

## 22. Entender el historial y la entrega

Cada commit registra un cambio concreto con un mensaje cotidiano. No se crearon fechas pasadas. El requisito de trabajo repartido durante el periodo no se puede cumplir retroactivamente.

La etiqueta `tarea-2` señala una versión exacta. Después de entregar, practica en otra rama para no confundir la versión evaluada con tus ejercicios. El archivo `entrega.txt` contiene el enlace que debes subir a Moodle.

**Por qué:** el docente necesita saber qué código estás defendiendo. Comprender la solución y poder cambiarla es parte de la evaluación, aunque el proyecto ya funcione.
