import { getTrendingByDate, getAllDates } from '$lib/data';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const dates = getAllDates();
	if (!dates.includes(params.date)) {
		throw error(404, `No data for ${params.date}`);
	}

	const trending = getTrendingByDate(params.date);
	return { trending };
};

export function entries() {
	return getAllDates().map(date => ({ date }));
}
