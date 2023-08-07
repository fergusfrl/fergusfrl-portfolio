function generateArticleSitemap() {
	const paths = import.meta.glob('/src/articles/*.md', { eager: true });
	let urls = '';

	for (const path in paths) {
		const slug = path.split('/').at(-1)?.replace('.md', '');
		urls += `<url>
            <loc>https://fergusfrl.com/writing/${slug}/</loc>
            <changefreq>monthly</changefreq>
            <priority>0.8</priority>
        </url>`;
	}

	return urls;
}

export async function GET() {
	return new Response(
		`
        <?xml version="1.0" encoding="UTF-8" ?>
        <urlset
            xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="https://www.w3.org/1999/xhtml"
            xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
            xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
            xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
            xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
        >
            <url>
                <loc>https://fergusfrl.com/</loc>
                <changefreq>monthly</changefreq>
                <priority>1</priority>
            </url>
            <url>
                <loc>https://fergusfrl.com/writing/</loc>
                <changefreq>monthly</changefreq>
                <priority>0.9</priority>
            </url>
            ${generateArticleSitemap()}
        </urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}
