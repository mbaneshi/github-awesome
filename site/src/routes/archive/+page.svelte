<script lang="ts">
	import SEOHead from '$lib/components/SEOHead.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SEOHead
	title="Archive | Awesome OSS Trending"
	description="Browse all days of trending GitHub open-source projects."
	url="https://awesome-oss-trending.pages.dev/archive"
/>

<h1>Archive</h1>
<p class="subtitle">Browse trending repos by date</p>

<div class="archive-list">
	{#each data.days as day}
		<a href="/archive/{day.date}" class="day-card">
			<span class="date">{day.date}</span>
			<span class="count">{day.count} repos</span>
			<span class="preview">{day.topRepos.join(', ')}</span>
		</a>
	{/each}
</div>

<style>
	h1 { margin-bottom: 0.25rem; }
	.subtitle { color: var(--muted); margin-bottom: 1.5rem; }
	.archive-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.day-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.25rem;
		background: var(--card-bg);
		border: 1px solid var(--border);
		border-radius: 8px;
		text-decoration: none;
		color: inherit;
		transition: border-color 0.15s;
	}
	.day-card:hover { border-color: var(--accent); }
	.date { font-weight: 600; color: var(--accent); min-width: 7rem; }
	.count { font-size: 0.85rem; color: var(--muted); min-width: 5rem; }
	.preview { font-size: 0.85rem; color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
