type PodcastStructuredDataProps = {
  title: string;
  description: string;
  image?: string;
  url: string;
  episodeCount?: number;
};

export function PodcastStructuredData({ title, description, image, url, episodeCount }: PodcastStructuredDataProps) {
  const absoluteUrl = url.startsWith('http') ? url : `https://neurodiversitynation.com${url}`;
  const graph = [
    {
      '@id': 'https://neurodiversitynation.com/#organization',
      '@type': 'Organization',
      name: 'Neurodiversity Nation: Amplifying Voices',
      url: 'https://neurodiversitynation.com',
    },
    {
      '@id': `${absoluteUrl}#podcast`,
      '@type': 'PodcastSeries',
      author: { '@id': 'https://neurodiversitynation.com/#organization' },
      description,
      image,
      name: title,
      numberOfEpisodes: episodeCount,
      publisher: { '@id': 'https://neurodiversitynation.com/#organization' },
      url: absoluteUrl,
      webFeed: 'https://www.spreaker.com/show/neurodiversity-nation-amplifying-voices',
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }} />;
}
