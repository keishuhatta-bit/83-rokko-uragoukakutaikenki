function setMeta(name, content) {
  let meta = document.querySelector(`meta[name="${name}"]`);

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', content);
}

function setOG(property, content) {
  let meta = document.querySelector(`meta[property="${property}"]`);

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', content);
}

document.addEventListener('DOMContentLoaded', () => {

  // h1取得
  const h1 = document.querySelector('h1');

  // 大学タグ取得
  const univTag = document.querySelector('.profile-hero__tag');

  // 本文取得
  const firstParagraph = document.querySelector('.taikenki-body p');

  if (!h1 || !univTag) return;

  const name = h1.textContent.trim();
  const univ = univTag.textContent.trim();

  const description =
    firstParagraph?.textContent.slice(0, 100) ||
    `${univ}の合格体験記`;

  // title
  document.title =
    `${univ} 合格体験記｜${name}`;

  // description
  setMeta(
    'description',
    `${univ}に合格した${name}さんの体験記。${description}`
  );

  // OGP
  setOG(
    'og:title',
    `${univ} 合格体験記｜${name}`
  );

  setOG(
    'og:description',
    `${univ}に合格した${name}さんのリアルな受験体験記`
  );

  setOG(
    'og:type',
    'article'
  );

  setOG(
    'og:url',
    window.location.href
  );

  setOG(
    'og:image',
    'https://keishuhatta-bit.github.io/83-rokko-uragoukakutaikenki/ogp.png'
  );

  // canonical
  let canonical =
    document.querySelector('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }

  canonical.href = window.location.href;

  // JSON-LD
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${univ} 合格体験記`,
    "description": description,
    "author": {
      "@type": "Person",
      "name": name
    },
    "mainEntityOfPage": window.location.href
  };

  const script = document.createElement('script');

  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(jsonld);

  document.head.appendChild(script);

});