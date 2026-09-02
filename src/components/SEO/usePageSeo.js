import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { buildJsonLd } from '../../data/jsonld'

/**
 * Fuente única de SEO en runtime.
 *
 * Es un hook, no un componente, a propósito: un hook no se puede montar por
 * accidente desde una sección, así que la carrera de "gana el último en
 * montarse" que existía con <SEOHead> desaparece por construcción. Se llama
 * exactamente una vez, desde App.
 *
 * No toca og:image, og:url ni el canonical: son constantes y viven estáticas
 * en index.html, que es lo único que leen LinkedIn, Slack y WhatsApp — esos
 * unfurlers no ejecutan JavaScript. Este hook mejora la experiencia en
 * navegador y lo que ve Googlebot, que sí renderiza JS.
 */
function upsertMeta(name, content, isProperty = false) {
  const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
  let tag = document.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(isProperty ? 'property' : 'name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

export function usePageSeo() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const lang = i18n.language?.startsWith('es') ? 'es' : 'en'
    const locale = lang === 'es' ? 'es_MX' : 'en_US'
    const alternate = lang === 'es' ? 'en_US' : 'es_MX'

    // index.html es estático con lang="en"; aquí se corrige al idioma real.
    document.documentElement.lang = lang

    document.title = t('seo.title')
    upsertMeta('title', t('seo.title'))
    upsertMeta('description', t('seo.description'))
    upsertMeta('keywords', t('seo.keywords'))

    upsertMeta('og:title', t('seo.og_title'), true)
    upsertMeta('og:description', t('seo.og_description'), true)
    upsertMeta('og:locale', locale, true)
    upsertMeta('og:locale:alternate', alternate, true)

    upsertMeta('twitter:title', t('seo.og_title'), true)
    upsertMeta('twitter:description', t('seo.og_description'), true)

    // Reescribe el nodo JSON-LD que ya viene en index.html. Debe existir
    // exactamente uno en todo momento.
    const script = document.getElementById('ld-graph')
    if (script) {
      script.textContent = JSON.stringify(buildJsonLd(t, lang))
    }
  }, [t, i18n.language])
}

export default usePageSeo
