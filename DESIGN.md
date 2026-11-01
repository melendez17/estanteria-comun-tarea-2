---
name: Estantería Común
description: Sistema visual compartido para buscar libros y organizar lecturas.
colors:
  primary: "#235647"
  secondary: "#6b594b"
  danger: "#a02232"
  body-bg: "#f6f5ef"
  body-color: "#243a32"
  papel: "#fffefa"
  border: "#cbd4cc"
  input-border: "#899d91"
  focus: "#967027"
  muted: "#4d6257"
  pendiente-bg: "#e7ebdf"
  pendiente-text: "#334933"
  leyendo-bg: "#f4e4bc"
  leyendo-text: "#654b11"
  leido-bg: "#d4e7dd"
  leido-text: "#164b36"
typography:
  display:
    fontFamily: 'Georgia, "Times New Roman", serif'
    fontSize: "clamp(2.2rem, 5vw, 3.5rem)"
    lineHeight: 1.08
  body:
    fontFamily: '"Segoe UI", system-ui, sans-serif'
  title:
    fontFamily: 'Georgia, "Times New Roman", serif'
    fontSize: "1.25rem"
  label:
    fontSize: ".85rem"
    fontWeight: 600
rounded:
  panel: ".75rem"
  estado: ".35rem"
spacing:
  base: ".25rem"
  espacio: "1.25rem"
  panel: "1.5rem"
components:
  panel:
    backgroundColor: "{colors.papel}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel}"
  estado-pendiente:
    backgroundColor: "{colors.pendiente-bg}"
    textColor: "{colors.pendiente-text}"
    rounded: "{rounded.estado}"
    padding: ".3rem .65rem"
  estado-leyendo:
    backgroundColor: "{colors.leyendo-bg}"
    textColor: "{colors.leyendo-text}"
    rounded: "{rounded.estado}"
    padding: ".3rem .65rem"
  estado-leido:
    backgroundColor: "{colors.leido-bg}"
    textColor: "{colors.leido-text}"
    rounded: "{rounded.estado}"
    padding: ".3rem .65rem"
---

# Design System: Estantería Común

## Overview

Sistema funcional para un club de lectura: superficies claras, acento verde y títulos con serif. Esta documentación describe la implementación delegada; no atribuye al usuario una metáfora ni preferencias de marca adicionales.

Fuente de verdad: `buscador-js/scss/_variables.scss`, `_mixins.scss` y `_componentes.scss`. React importa esos mismos estilos. Bootstrap aporta los controles, contenedores y utilidades restantes.

**Key Characteristics:**
- Jerarquía de lectura clara.
- Formularios y estados visibles en español.
- Estilos compartidos y composición mobile-first.

## Colors

El verde principal identifica acciones; el marrón secundario acompaña acciones de menor prioridad. El rojo comunica errores. Fondo cálido, papel y bordes suaves separan regiones sin gran contraste decorativo.

Los estados combinan texto y fondo: Pendiente, Leyendo y Leído conservan su nombre visible. El ocre marca el foco de teclado; el texto secundario usa el tono atenuado.

## Typography

Georgia distingue títulos y marca; Segoe UI con alternativas del sistema sirve a controles y cuerpo. El título principal escala con el ancho; los títulos de libros permiten cortar palabras largas. La introducción limita el párrafo a (65ch). Las tablas y resúmenes usan números tabulares.

## Layout

El catálogo empieza con una columna, pasa a dos desde (48rem) y a tres desde (70rem), con separación dada por `--espacio`. La función Sass de espaciado avanza en cuartos de rem. La introducción tiene ancho máximo de (48rem), las secciones separan su contenido y los paneles agrupan formularios y resultados.

Las acciones permiten varias filas. El cuerpo tiene ancho mínimo de (20rem). Mantener las utilidades responsivas de Bootstrap y los contenedores de tabla desplazables ya usados.

## Elevation & Depth

La capa personalizada separa paneles mediante fondo y borde de (1px), sin sombras propias. La profundidad depende de agrupación, espaciado y color.

## Shapes

Paneles con esquinas suaves; etiquetas de estado más compactas. Las portadas mantienen proporción mediante `object-fit: contain`, dentro de un área de altura fija (13rem).

## Components

- Botones, navegación y campos: componentes de Bootstrap con las variables Sass del proyecto. Preservar etiquetas de formulario, foco visible y estados deshabilitados.
- Tarjetas de libro: cuerpo flexible, acciones al final y títulos que admiten contenido largo.
- Errores de campo: texto rojo junto al campo, tamaño (.875rem) y espacio reservado para reducir saltos.
- Lecturas: entrada (.3s), cambio (.55s) y salida (.24s), con `ease-out`; reducir animación cuando el sistema solicita menos movimiento.
- Resumen y tabla: bordes separadores y números tabulares para comparar cantidades.

## Do's and Don'ts

**Hacer**
- Reutilizar los estilos Sass compartidos entre ambas aplicaciones.
- Mantener nombres de estado y mensajes de error visibles.
- Comprobar formularios y acciones en pantallas pequeñas y con teclado.

**Evitar**
- Comunicar estados únicamente mediante color.
- Introducir estilos divergentes para controles equivalentes.
- Añadir movimiento que ignore la preferencia de movimiento reducido.
