import { getLatestDate, getTrendingByDate, getIndex, getAllLanguages } from '$lib/data';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const latest = getLatestDate();
	const trending = getTrendingByDate(latest);
	const index = getIndex();
	const languages = getAllLanguages();

	return {
		trending,
		totalDays: index.total_days,
		totalRepos: index.total_unique_repos,
		languages
	};
};
