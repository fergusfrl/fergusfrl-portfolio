import { json } from '@sveltejs/kit';
import type { WorkFrontmatter } from '../../../types';

async function getWork(limit?: number) {
	let work: WorkFrontmatter[] = [];
	const paths = import.meta.glob('/src/articles/work/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as WorkFrontmatter;
			const post = { ...metadata, slug };
			work.push(post);
		}
	}

	work = work.sort(
		(first, second) => new Date(second.startDate).getTime() - new Date(first.startDate).getTime()
	);

	return work.slice(0, limit || work.length);
}

export async function GET({ url }) {
	const limit = url.searchParams.get('limit');
	const posts = await getWork(limit ? parseInt(limit, 10) : undefined);
	return json(posts);
}
