import type { TrendingDay, DataIndex, Languages } from './types';

// Data files are copied to src/data/ at build time by build-index.mjs
// SvelteKit reads them during prerender via these functions

const dataModules = import.meta.glob('/src/data/*.json', { eager: true });

function loadJson<T>(filename: string): T {
	const path = `/src/data/${filename}`;
	const mod = dataModules[path] as { default: T } | undefined;
	if (!mod) throw new Error(`Data file not found: ${filename}`);
	return mod.default;
}

export function getIndex(): DataIndex {
	return loadJson<DataIndex>('index.json');
}

export function getLanguages(): Languages {
	return loadJson<Languages>('languages.json');
}

export function getTrendingByDate(date: string): TrendingDay {
	return loadJson<TrendingDay>(`${date}.json`);
}

export function getLatestDate(): string {
	return getIndex().latest;
}

export function getAllDates(): string[] {
	return getIndex().dates;
}

export function getAllLanguages(): [string, number][] {
	const langs = getLanguages();
	return Object.entries(langs).sort((a, b) => b[1] - a[1]);
}
