type SectionStructuredDataProps = {
  type: 'WebSite' | 'CollectionPage' | 'ItemList' | 'Product' | 'SearchResultsPage';
  name: string;
  description: string;
  url: string;
  items?: Array<{ name: string; url: string; image?: string }>;
};

const organization = {
  '@type': 'Organization',
  name: 'Neurodiversity Nation',
  url: 'https://neurodiversitynation.com',
};

export function SectionStructuredData({ type, name, description, url, items = [] }: SectionStructuredDataProps) {
  const graph: Record<string, unknown>[] = [
    { '@type': type, description, name, publisher: organization, url },
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
