export interface Repo {
	owner: string;
	name: string;
	full_name: string;
	description: string | null;
	language: string | null;
	total_stars: number | null;
	stars_today: number | null;
	url: string;
	clone_url: string;
}

export interface TrendingDay {
	date: string;
	scraped_at: string;
	count: number;
	repos: Repo[];
	source?: string;
}

export interface DataIndex {
	dates: string[];
	latest: string;
	total_days: number;
	total_unique_repos: number;
	updated_at: string;
}

export interface Languages {
	[language: string]: number;
}
