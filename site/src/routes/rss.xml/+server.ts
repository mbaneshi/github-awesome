import { getAllDates, getTrendingByDate } from '$lib/data';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const dates = getAllDates().slice(0, 30);
	const baseUrl = 'https://awesome-oss-trending.pages.dev';

	const items = dates.map(date => {
		const day = getTrendingByDate(date);
		const topNames = day.repos.slice(0, 5).map(r => r.name).join(', ');
		return `
    <item>
      <title>Trending Repos - ${day.date} (${day.count} repos)</title>
      <link>${baseUrl}/archive/${day.date}</link>
      <guid>${baseUrl}/archive/${day.date}</guid>
      <pubDate>${new Date(day.date).toUTCString()}</pubDate>
      <description>${day.count} trending repos: ${topNames} and more.</description>
    </item>`;
	});

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Awesome OSS Trending</title>
    <link>${baseUrl}</link>
    <description>Daily trending open-source projects on GitHub</description>
    <language>en</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items.join('\n')}
  </channel>
</rss>`;

	return new Response(rss.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
