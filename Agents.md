# Instrucciones para Agentes de IA (Spec-Kit)

Este documento contiene las reglas fundamentales que cualquier agente de IA (ej. GitHub Copilot, Cursor, Claude) debe seguir al asistir en el desarrollo de este repositorio.

## 👤 Perfil del Usuario
- **Nombre:** Emmanuel Amaury Fuentes Venegas
- **Ubicación:** Querétaro, México (Egresado de ITQ).
- **Rol:** Ingeniero en Sistemas Computacionales / Full Stack Developer.
- **Idiomas:** Español (Nativo), Inglés (80%).
- **Stack Principal:** Ruby On Rails, Javascript, Kotlin (Android), Swift (iOS), Kotlin Multiplatform, Cloud (AWS, Cloudflare), DevOps.

## 🛠️ Reglas del Proyecto (Portafolio Web)

1. **🚨 REGLA CRÍTICA: Internacionalización (i18n) 🚨:**
   - **CERO TEXTO HARDCODED:** Está ESTRICTAMENTE PROHIBIDO insertar texto en duro (hardcoded) en cualquier componente visual o de interfaz de usuario. Esta regla no tiene excepciones.
   - **Nuevos textos:** Cualquier texto, título, párrafo, etiqueta de botón o descripción nueva DEBE ser agregada a los archivos `src/locales/en/translation.json` y `src/locales/es/translation.json`.
   - **Implementación:** Utiliza siempre el hook `useTranslation` (`const { t } = useTranslation();`) de `react-i18next` para renderizar el contenido dinámico en los componentes de React. Los únicos textos estáticos permitidos son nombres propios o de tecnologías/herramientas que no requieran traducción.

2. **Stack Front-End:**
   - Framework: React 19 + Vite.
   - Estilos: Tailwind CSS.
   - Animaciones: Framer Motion / GSAP.

3. **Arquitectura y Limpieza:**
   - Mantener componentes pequeños y reutilizables.
   - Utilizar Functional Components y Hooks.
   - Documentar funciones complejas.

4. **Desarrollo Guiado por Especificaciones (Spec-Driven Development):**
   - Antes de implementar un cambio arquitectónico grande, se debe consultar o actualizar un plan o especificación técnica.
   - Evitar re-escribir secciones completas sin contexto; se debe trabajar iterativamente.

Al seguir estas reglas, garantizas que el código sugerido sea coherente con la arquitectura actual y los requerimientos del portafolio.
