# 19.º Aniversario EPISI · UNAM (2026)

Invitación web interactiva y minimalista para el 19.º aniversario de la **Escuela Profesional de Ingeniería de Sistemas e Informática (EPISI)** de la **Universidad Nacional de Moquegua (UNAM)**.

---

## 🎨 Características de Diseño e Interactividad

- **Formato Todo-en-Uno (Self-Contained):** `index.html` integra todo el código (HTML semántico, estilos CSS, interactividad JS, tipografías WOFF2 y todas las imágenes en Base64). No requiere conexión a internet ni servidor local para visualizarse.
- **Estilo Editorial Minimalista:**
  - Paleta sobria y académica: Marfil papel (`#f6f1e7`), Azul noche (`#07192c`), Dorado suave (`#d9b36c`) y acentos ciruela/verde azulado.
  - Tipografías: Fraunces (serif display editorial) y Manrope (sans geométrica limpia).
  - Microinteracciones, sutiles efectos de desenfoque, sombras suaves y texturas táctiles.
- **Experiencia de Entrada:** Tarjeta de invitación interactiva con efecto de sello dorado que al pulsar desbloquea la página con animación fluida.
- **Secciones:**
  - **Portada / Hero:** Título con tipografía serif, recorte optimizado de la escolta/estandarte de EPISI, badge de aniversario y accesos directos.
  - **Cinta Informativa:** Marquesina sutil con los lemas y conmemoración.
  - **Introducción:** Estadísticas de la trayectoria de la carrera.
  - **Cuenta Regresiva:** Reloj en vivo hacia la ceremonia central del 29 de noviembre de 2026 + botón para descargar evento `.ics` compatible con Google Calendar, Apple Calendar y Outlook.
  - **Programa Interactivo:** Navegación por pestañas por cada día del aniversario (21 al 29 de noviembre) con etiquetas de tipo de actividad.
  - **Actividades Destacadas:** Tarjetas con las actividades y concursos del aniversario:
    - 💻 **Concurso de Programación:** Desafíos algorítmicos, lógica y desarrollo de software.
    - ♟️ **Torneo de Ajedrez:** Estrategia, concentración y pensamiento táctico.
    - 🎮 **Competencia de Videojuegos (E-Sports):** Partidas competitivas y reflejos.
    - ⚽ **Actividades Deportivas:** Gran Campeonato Intercódigos e integración.
  - **Desfile Institucional:** Detalles de ensayo y concentración del desfile.
  - **Archivo Oficial (Lightbox):** Galería interactiva con las piezas originales escaneadas (Invitación, Cronograma y Aviso) con visor ampliado y navegación por teclado (Escape, flechas).
  - **Pie de Página:** Enlaces y botón para compartir enlace.

---

## 🌐 Despliegue en GitHub Pages

El proyecto cuenta con soporte nativo para **GitHub Pages**:

1. Archivo `.nojekyll` para asegurar que todos los recursos se sirvan correctamente sin procesamiento de Jekyll.
2. Workflow automatizado de GitHub Actions en `.github/workflows/deploy.yml` que publica la rama `main` automáticamente.
3. Para habilitarlo en tu repositorio:
   - Ve a **Settings** > **Pages** en GitHub.
   - En **Source**, selecciona **GitHub Actions** (o **Deploy from a branch** seleccionando la rama `main` y carpeta `/root`).
   - La página estará disponible en: `https://juancitucs.github.io/PAGINAIHC/`

---

## 🚀 Cómo Visualizar en Local

Simplemente abre el archivo `index.html` en cualquier navegador web moderno:

```bash
# Ejemplo abriendo directamente con navegador:
google-chrome index.html
# o
firefox index.html
```
