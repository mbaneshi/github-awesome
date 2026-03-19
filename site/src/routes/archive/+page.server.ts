import { getAllDates, getTrendingByDate } from '$lib/data';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const dates = getAllDates();
	const days = dates.map(date => {
		const day = getTrendingByDate(date);
		return {
			date: day.date,
			count: day.count,
			topRepos: day.repos.slice(0, 3).map(r => r.name)
		};
	});

	return { days };
};
