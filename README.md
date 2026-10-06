# Portfolio de Juan Cruz Bocadi

Portfolio personal inspirado visualmente en VS Code. El explorador y las pestañas llevan a cuatro secciones semánticas: presentación, sobre mí, proyectos y contacto. La búsqueda rápida se abre con `Ctrl + K` (o `⌘ + K` en Mac).

**Sitio público:** https://juanbocadi.github.io/portfolio-vscode/

## Stack

- HTML5 semántico
- CSS3 con Grid, Flexbox y media queries
- JavaScript nativo
- Google Fonts: DM Sans y Space Grotesk, con fuentes del sistema como respaldo

No hay dependencias ni proceso de compilación.

## Ejecutar localmente

Desde esta carpeta:

```bash
python -m http.server 4173
```

Abrí `http://localhost:4173` en el navegador. También se puede abrir `index.html` directamente. El sitio no requiere API ni variables de entorno.

## Estructura

- `index.html`: contenido y navegación.
- `styles.css`: diseño, temas y adaptación a distintas pantallas.
- `app.js`: menú móvil, pestaña activa, buscador rápido y preferencia de tema.
- `assets/`: favicon y CV descargable.

## Accesibilidad y responsive

El sitio incluye un solo `h1`, landmarks HTML, enlace para saltar al contenido, navegación por teclado, indicadores de foco, colores legibles y soporte para `prefers-reduced-motion`. Está diseñado para 360, 768 y 1280 px sin desplazamiento horizontal.

## Publicación

GitHub Pages sirve la raíz de la rama `main`. Cada push actualiza el sitio. Al ser estático, también se puede publicar en Netlify o Vercel sin comando de build.

## Contenido

La información profesional se basó en `CV_Juan_Cruz_Bocadi.pdf`. Los proyectos enlazan a repositorios públicos de [JuanBocadi](https://github.com/JuanBocadi). La biografía está redactada en primera persona como borrador para que Juan la revise y la ajuste a su voz antes de presentar el trabajo.
