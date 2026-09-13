import { useEffect } from 'react';

const BASE_URL = 'https://contatorafaeleleoterio-hub.github.io/ToolOptimizerCNC';
const OG_IMAGE = `${BASE_URL}/og-image.png`;

interface SeoHeadProps {
  title: string;
  description?: string;
  url?: string;
}

const DEFAULT_DESCRIPTION =
  'Calculadora profissional de parâmetros de corte CNC. Calcule RPM, Avanço e Potência em segundos com segurança. Fresamento, torneamento e furação.';

const DEFAULT_KEYWORDS =
  'CNC, fresamento, parâmetros de corte, RPM, avanço, potência, velocidade de corte, torneamento, calculadora CNC, usinagem, Kienzle, Vc, fz';

/** Upsert a <meta> tag identified by name or property attribute. */
function setMeta(key: 'name' | 'property', attr: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${attr}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(key, attr);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Upsert a <link rel="canonical"> */
function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * SeoHead — injects meta tags and canonical link dynamically.
 * Schema.org JSON-LD is static in index.html.
 */
export function SeoHead({ title, description = DEFAULT_DESCRIPTION, url }: SeoHeadProps) {
  const pageUrl = url ?? BASE_URL + '/';

  useEffect(() => {
    // Standard meta
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', DEFAULT_KEYWORDS);
    setMeta('name', 'robots', 'index, follow');

    // Open Graph
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', pageUrl);
    setMeta('property', 'og:image', OG_IMAGE);
    setMeta('property', 'og:site_name', 'ToolOptimizer CNC');
    setMeta('property', 'og:locale', 'pt_BR');

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', OG_IMAGE);

    // Canonical
    setCanonical(pageUrl);
  }, [title, description, pageUrl]);

  return null;
}
