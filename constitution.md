# 📜 Constitución del Proyecto (Project Constitution)

Este documento establece los principios rectores, las directrices de desarrollo y las reglas no negociables para este proyecto (Portafolio de Emmanuel Amaury Fuentes Venegas). Todos los desarrolladores y agentes de inteligencia artificial (Copilot, Claude, Cursor) deben apegarse estrictamente a estos lineamientos.

---

## 1. 🛡️ Calidad de Código (Code Quality)
- **Legibilidad y Simplicidad**: Priorizar el código limpio ("Clean Code") sobre la astucia. El código debe ser fácil de leer, mantener y entender por encima de todo.
- **Arquitectura Modular**: Mantener los componentes de React pequeños, enfocados en una única responsabilidad (Single Responsibility Principle) y altamente reutilizables.
- **Tipado y Convenciones**: Usar Functional Components y React Hooks de forma estandarizada. 
- **Linters y Formateo**: Todos los commits deben respetar las reglas establecidas en `eslint.config.js`. No se debe ignorar los warnings del linter de forma arbitraria.

## 2. 🧪 Estándares de Pruebas y Contenido (Testing & Content Standards)
- **Estabilidad de la Interfaz**: Asegurar que todos los nuevos componentes rendericen correctamente sin romper la aplicación (`smoke testing` implícito).
- **🚨 REGLA DE CERO TEXTO DURO (ZERO HARDCODED TEXT) 🚨**: Las traducciones y variables de internacionalización deben usarse OBLIGATORIAMENTE para cualquier texto que se muestre en pantalla. Está ESTRICTAMENTE PROHIBIDO incluir textos duros en `jsx`, `js`, arreglos de datos que se renderizan, etc. TODO contenido textual debe provenir de `src/locales/.../translation.json` usando `useTranslation`. Esta regla no tiene excepciones y debe validarse en Inglés y Español.
- **Testeo Responsivo**: Cada nuevo diseño o componente debe ser probado en entornos de dispositivos móviles y de escritorio para garantizar compatibilidad transversal.

## 3. 🎨 Consistencia en Experiencia de Usuario (UX Consistency)
- **Accesibilidad y Multilenguaje**: Mantener siempre el soporte `i18next`. El sistema debe comportarse correctamente según la preferencia de idioma y tema (Dark/Light Mode) del usuario.
- **Diseño Resiliente**: Usar `TailwindCSS` siguiendo el sistema de diseño actual. No se deben introducir hojas de estilos externas arbitrarias ni mezclar frameworks de CSS.
- **Animaciones Suaves**: Utilizar `Framer Motion` o `GSAP` para micro-interacciones y transiciones. Las animaciones deben sentirse fluidas y no entorpecer la navegabilidad.

## 4. ⚡ Requisitos de Rendimiento (Performance Requirements)
- **Carga Diferida y Optimización**: Hacer uso de "Lazy Loading" en componentes pesados y dividir el código (Code Splitting) eficientemente mediante Vite.
- **Optimización de Activos**: Las imágenes y archivos estáticos deben estar comprimidos y utilizar los formatos más modernos (`.webp`, `.avif`) cuando sea posible.
- **Performance Web (Core Web Vitals)**: Los cambios no deben perjudicar el First Contentful Paint (FCP) o el Largest Contentful Paint (LCP) de la aplicación.
