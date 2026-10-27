type PodcastStructuredDataProps = {
  title: string;
  description: string;
  image?: string;
  url: string;
  episodeCount?: number;
};

export function PodcastStructuredData({ title, description, image, url, episodeCount }: PodcastStructuredDataProps) {
  const absoluteUrl = url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://next-beats-five.vercel.app'}${url}`;
  const graph = [
    {
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://next-beats-five.vercel.app'}/#organization`,
      '@type': 'Organization',
      name: 'Neurodiversity Nation: Amplifying Voices',
      url: 'https://neurodiversitynation.com',
    },
    {
      '@id': `${absoluteUrl}#podcast`,
      '@type': 'PodcastSeries',
      author: { '@id': `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://next-beats-five.vercel.app'}/#organization` },
      description,
      image,
      name: title,
      numberOfEpisodes: episodeCount,
      publisher: { '@id': `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://next-beats-five.vercel.app'}/#organization` },
      url: absoluteUrl,
      webFeed: 'https://www.spreaker.com/show/neurodiversity-nation-amplifying-voices',
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }} />;
}
