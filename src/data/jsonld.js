import { PERSONAL_INFO } from './constants'
import { EDUCATION, LANGUAGES } from './resume'
import { SKILL_CATEGORIES } from './skills'

const SITE = PERSONAL_INFO.website
const PERSON_ID = `${SITE}/#person`

/**
 * Grafo de datos estructurados: Person + WebSite + ProfilePage.
 *
 * Sin `telephone` a propósito: JSON-LD es lo primero que parsea un scraper de
 * contactos. El número queda visible en el DOM de la sección Contacto, que es
 * donde le sirve a una persona. El correo sí va, porque ya es público en GitHub.
 */
export function buildJsonLd(t, lang) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: PERSONAL_INFO.fullName,
        alternateName: PERSONAL_INFO.name,
        jobTitle: t('about.role'),
        url: SITE,
        image: `${SITE}/avatar.jpg`,
        email: `mailto:${PERSONAL_INFO.email}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Querétaro',
          addressCountry: 'MX',
        },
        alumniOf: EDUCATION.map((edu) => ({
          '@type': 'CollegeOrUniversity',
          name: edu.institution,
        })),
        knowsAbout: SKILL_CATEGORIES.flatMap((category) =>
          category.technologies.map((tech) => tech.name)
        ),
        knowsLanguage: LANGUAGES.map((language) => ({
          '@type': 'Language',
          name: t(`languages.items.${language.id}.name`),
        })),
        sameAs: [PERSONAL_INFO.github, PERSONAL_INFO.linkedin],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        url: SITE,
        name: PERSONAL_INFO.fullName,
        inLanguage: lang,
        publisher: { '@id': PERSON_ID },
      },
      {
        '@type': 'ProfilePage',
        url: SITE,
        mainEntity: { '@id': PERSON_ID },
      },
    ],
  }
}
