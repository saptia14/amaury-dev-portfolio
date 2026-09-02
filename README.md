<div align="center">

# 🚀 Emmanuel Amaury Fuentes Venegas - Developer Portfolio

<h3>
  <em>Ingeniero en Sistemas Computacionales | Full Stack Developer</em>
</h3>

<p>
  <img src="https://img.shields.io/badge/Ruby_On_Rails-CC0000?style=for-the-badge&logo=rubyonrails&logoColor=white" alt="Ruby On Rails" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Kotlin-0095D5?style=for-the-badge&logo=kotlin&logoColor=white" alt="Kotlin" />
  <img src="https://img.shields.io/badge/Swift-FA7343?style=for-the-badge&logo=swift&logoColor=white" alt="Swift" />
  <br>
  <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="AWS" />
  <img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare" />
  <img src="https://img.shields.io/badge/DevOps-0052CC?style=for-the-badge&logo=atlassian&logoColor=white" alt="DevOps" />
</p>

</div>

<br />

---

## 👨‍💻 Sobre Mí

Soy **Emmanuel Amaury Fuentes Venegas**, residente en Querétaro, México. Egresado del **Instituto Tecnológico de Querétaro (ITQ)** como Ingeniero en Sistemas Computacionales.  
Mi enfoque principal se divide en varias ramas del desarrollo:
- **Backend & Web**: Ruby On Rails, Javascript.
- **Mobile**: Kotlin (Android Applications), Swift (iOS Applications), y Kotlin Multiplatform.
- **Infraestructura**: Cloud (AWS, Cloudflare), DevOps.

Manejo de Inglés: 80%  
Idioma Principal: Español

Este repositorio contiene el código fuente de mi **portafolio personal**, construido para reflejar mi experiencia, proyectos destacados y habilidades técnicas.

---

## ✨ Características del Portafolio

- ⚡ **Rápido y Optimizado**: Construido con Vite 6 y React 19.
- 🌍 **Internacionalización (i18n)**: Soporte integrado para múltiples idiomas (Inglés y Español) utilizando `i18next`.
- 🤖 **Spec-Kit Integrado**: Metodología y documentación lista para desarrollo colaborativo con Agentes de IA.
- 🎨 **Animaciones Fluidas**: Framer Motion y GSAP.
- 🌙 **Tema Oscuro/Claro**: Soporte para cambiar de temas.

---

## 🛠️ Tecnologías Principales del Portafolio

- **React 19** & **Vite 6**
- **TailwindCSS 4.1** (CSS-first: los tokens viven en `src/index.css`, no hay `tailwind.config.js`)
- **Framer Motion** (+ GSAP, solo para el stagger del hero)
- **i18next** & **react-i18next** (Soporte Multilenguaje)
- **Inter Variable** self-hosted vía `@fontsource-variable/inter`

---

## 🗂️ Dónde vive el contenido

La regla: *si traducirlo sería incorrecto, es **dato**; si dejarlo en inglés sería incorrecto, es **copy**.*

| Qué | Dónde |
|---|---|
| Copy visible (ambos idiomas, siempre en paridad) | `src/locales/{en,es}/translation.json` |
| Experiencia, educación, idiomas, métricas del CV | `src/data/resume.js` |
| Matriz de habilidades, marquee, showcase | `src/data/skills.js` |
| Proyectos (imagen, tags, periodo, métricas) | `src/data/projects.json` |
| Identidad y contacto | `src/data/constants.js` |
| Datos estructurados (JSON-LD) | `src/data/jsonld.js` |

`npm run build` ejecuta antes `npm run i18n:check`, que **falla el build** si las claves de inglés y español se separan o si un id referenciado desde `src/data/` no resuelve en ambos idiomas.

---

## 🔑 Variables de entorno

| Variable | Para qué |
|---|---|
| `VITE_WEB3FORMS_KEY` | Access key del formulario de contacto. Es pública por diseño (Vite la inlinea en el bundle); se externaliza solo para poder rotarla desde Vercel sin abrir un PR. |

Copia `.env.example` a `.env.production` en local, y define la variable en Vercel → Settings → Environment Variables (Production + Preview).

---

## 🚀 Cómo Empezar Localmente

1️⃣ **Clonar el repositorio**
```bash
git clone <tu-repositorio-url>
cd PORTFOLIO
```

2️⃣ **Instalar dependencias**
```bash
npm install
```

3️⃣ **Iniciar servidor de desarrollo**
```bash
npm run dev
```

El servidor estará corriendo en `http://localhost:5173`.

---

<div align="center">
  <sub>Construido por Emmanuel Amaury Fuentes Venegas</sub>
</div>
