import { json } from '@sveltejs/kit';
import type { Frontmatter } from '../../../types';

async function getWriting(limit?: number) {
	let writing: Frontmatter[] = [];
	const paths = import.meta.glob('/src/articles/writing/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Frontmatter;
			const post = { ...metadata, slug };
			writing.push(post);
		}
	}

	writing = writing.sort(
		(first, second) =>
			new Date(second.publishedDate).getTime() - new Date(first.publishedDate).getTime()
	);

	return writing.slice(0, limit || writing.length);
}

export async function GET({ url }) {
	const limit = url.searchParams.get('limit');
	const posts = await getWriting(limit ? parseInt(limit, 10) : undefined);
	return json(posts);
}
