export async function getArticles<T extends { startDate?: string; publishedDate?: string }>(
	type: 'work' | 'writing',
	limit?: number
) {
	let articles: T[] = [];
	let paths: Record<string, unknown>;

	// This is necessary because 'glob' doesn't allow for dynamic values.
	// Open vite issue: https://github.com/vitejs/vite/issues/5478
	switch (type) {
		case 'work':
			paths = import.meta.glob('/src/articles/work/*.md', { eager: true });
			break;
		case 'writing':
			paths = import.meta.glob('/src/articles/writing/*.md', { eager: true });
			break;
		default:
			paths = {} as Record<string, unknown>;
	}

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as T;
			const post = { ...metadata, slug };
			articles.push(post);
		}
	}

	articles = articles.sort((first, second) => {
		if (first?.startDate && second.startDate) {
			return new Date(second.startDate).getTime() - new Date(first.startDate).getTime();
		}
		if (first?.publishedDate && second.publishedDate) {
			return new Date(second.publishedDate).getTime() - new Date(first.publishedDate).getTime();
		}
		return 0;
	});

	return articles.slice(0, limit || articles.length);
}
