import { json } from '@sveltejs/kit';
import { getArticles } from '$lib/articles';
import type { WorkFrontmatter } from '../../../types';

export async function GET({ url }) {
	const limit = url.searchParams.get('limit');
	const posts = await getArticles<WorkFrontmatter>('work', limit ? parseInt(limit, 10) : undefined);
	return json(posts);
}
