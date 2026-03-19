import { getAllDates } from '$lib/data';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const dates = getAllDates();
	const baseUrl = 'https://awesome-oss-trending.pages.dev';

	const urls = [
		`<url><loc>${baseUrl}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`,
		`<url><loc>${baseUrl}/archive</loc><changefreq>daily</changefreq><priority>0.8</priority></url>`,
		`<url><loc>${baseUrl}/about</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>`,
		...dates.map(
			date =>
				`<url><loc>${baseUrl}/archive/${date}</loc><changefreq>never</changefreq><priority>0.6</priority></url>`
		)
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('\n  ')}
</urlset>`;

	return new Response(sitemap.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
