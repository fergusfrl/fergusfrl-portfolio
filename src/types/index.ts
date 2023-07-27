export type Frontmatter = {
	title: string;
	description: string;
	snippet?: string;
	publishedDate: string;
	tags: string[];
	slug: string;
};

export type Article = {
	frontmatter: Frontmatter;
	content: string;
};
