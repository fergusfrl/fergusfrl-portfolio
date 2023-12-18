export type WritingFrontmatter = {
	title: string;
	description: string;
	snippet: string;
	image: string;
	publishedDate: string;
	tags: string[];
	slug: string;
};

export type WorkFrontmatter = {
	title: string;
	company: string;
	image: string;
	startDate: string;
	finishDate: string;
	slug: string;
	link: string;
};

export type Scratchpad = {
	title: string;
	slug: string;
	image: string;
}

export type Breadcrumb = { label: string; href: string };

export type Location = {
	title: string;
	address: string;
	coordinates: {
		lat: number;
		lng: number;
	}
}
