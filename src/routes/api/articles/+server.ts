import { json } from '@sveltejs/kit';
import type { Frontmatter } from '../../../types';

async function getPosts() {
	let articles: Frontmatter[] = [];
	const paths = import.meta.glob('/src/articles/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Frontmatter;
			const post = { ...metadata, slug };
			articles.push(post);
		}
	}

	articles = articles.sort(
		(first, second) =>
			new Date(second.publishedDate).getTime() - new Date(first.publishedDate).getTime()
	);

	return articles;
}

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
