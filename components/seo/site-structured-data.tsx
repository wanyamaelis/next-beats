const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://next-beats-five.vercel.app';

export function SiteStructuredData() {
  const graph = [
    {
      '@id': `${siteUrl}/#organization`,
      '@type': 'Organization',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/icon-512.png` },
      name: 'Neurodiversity Nation',
      sameAs: ['https://www.spreaker.com/show/neurodiversity-nation-amplifying-voices'],
      url: siteUrl,
    },
    {
      '@id': `${siteUrl}/#website`,
      '@type': 'WebSite',
      description: 'Podcast conversations about neurodivergent lived experience, education, advocacy, and inclusive care.',
      name: 'Neurodiversity Nation: Amplifying Voices',
      potentialAction: {
        '@type': 'SearchAction',
        'query-input': 'required name=search_term_string',
        target: `${siteUrl}/search?q={search_term_string}`,
      },
      publisher: { '@id': `${siteUrl}/#organization` },
      url: siteUrl,
    },
  ];

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }} />;
}
