type SectionStructuredDataProps = {
  type: 'WebSite' | 'CollectionPage' | 'ItemList' | 'Product' | 'SearchResultsPage';
  name: string;
  description: string;
  url: string;
  items?: Array<{ name: string; url: string; image?: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://next-beats-five.vercel.app';
const organization = {
  '@id': `${siteUrl}/#organization`,
  '@type': 'Organization',
  name: 'Neurodiversity Nation',
  url: siteUrl,
};

export function SectionStructuredData({ type, name, description, url, items = [] }: SectionStructuredDataProps) {
  const absoluteUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;
  const graph: Record<string, unknown>[] = [
    { '@id': `${absoluteUrl}#page`, '@type': type, description, isPartOf: { '@id': `${siteUrl}/#website` }, name, publisher: organization, url: absoluteUrl },
  ];

  if (items.length > 0) {
    graph.push({
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        image: item.image,
        name: item.name,
        position: index + 1,
        url: item.url,
      })),
      name: `${name} items`,
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
      }}
    />
  );
}
