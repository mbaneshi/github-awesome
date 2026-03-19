<script lang="ts">
	import RepoCard from '$lib/components/RepoCard.svelte';
	import SEOHead from '$lib/components/SEOHead.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { trending } = data;
</script>

<SEOHead
	title="Trending Repos - {trending.date} | Awesome OSS Trending"
	description="{trending.count} trending open-source repos on GitHub for {trending.date}."
	url="https://awesome-oss-trending.pages.dev/archive/{trending.date}"
/>

<div class="page-header">
	<a href="/archive" class="back">&larr; Archive</a>
	<h1>Trending &mdash; {trending.date}</h1>
	<p class="subtitle">{trending.count} repositories</p>
</div>

<section class="repo-grid">
	{#each trending.repos as repo (repo.full_name)}
		<RepoCard {repo} />
	{/each}
</section>

<style>
	.page-header { margin-bottom: 1.5rem; }
	.back { color: #0969da; text-decoration: none; font-size: 0.85rem; }
	.back:hover { text-decoration: underline; }
	h1 { margin-top: 0.5rem; }
	.subtitle { color: #656d76; }
	.repo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
		gap: 1rem;
	}
</style>
