import rss from '@astrojs/rss';

/**
 * A closing feed, not a redirect.
 *
 * The rest of the old site redirects with an instant `<meta http-equiv=
 * "refresh">`, but that mechanism cannot work here: GitHub Pages serves
 * `.xml` as XML, so a meta-refresh HTML document at this path would reach the
 * browser as a parse error rather than a redirect, and feed readers would see
 * nothing at all.
 *
 * So the feed stays a valid feed. It points at memerson.com and carries a
 * single item saying so, which is both readable in an aggregator and a plain
 * link for a crawler to follow.
 */
export async function GET() {
  return rss({
    title: 'Error Signal (moved)',
    description: 'This feed has moved to memerson.com.',
    site: 'https://memerson.com/',
    items: [
      {
        title: 'This feed has moved to memerson.com',
        link: 'https://memerson.com/rss.xml',
        // Fixed, not `new Date()` — a build-time timestamp would make every
        // rebuild look like a new post to any reader still subscribed.
        pubDate: new Date('2026-07-27T00:00:00Z'),
        description:
          'errorsignal.dev has moved to memerson.com. Update your reader to https://memerson.com/rss.xml to keep receiving posts.',
      },
    ],
  });
}
