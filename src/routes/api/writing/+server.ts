import { json } from '@sveltejs/kit';
import { getArticles } from '$lib/articles';
import type { WritingFrontmatter } from '../../../types';

export async function GET({ url }) {
	const limit = url.searchParams.get('limit');
	const posts = await getArticles<WritingFrontmatter>(
		'writing',
		limit ? parseInt(limit, 10) : undefined
	);
	return json(posts);
}
