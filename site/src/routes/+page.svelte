<script lang="ts">
	import RepoCard from '$lib/components/RepoCard.svelte';
	import SEOHead from '$lib/components/SEOHead.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { trending, totalDays, totalRepos, languages } = data;
</script>

<SEOHead
	title="Trending GitHub Repos - {trending.date} | Awesome OSS Trending"
	description="Today's {trending.count} hottest open-source projects on GitHub. {trending.repos.slice(0, 3).map(r => r.name).join(', ')} and more."
/>

<section class="hero">
	<h1>Trending Open Source</h1>
	<p class="subtitle">{trending.count} projects trending on GitHub &mdash; {trending.date}</p>
	<div class="stats">
		<span>{totalDays} days tracked</span>
		<span>{totalRepos} unique repos</span>
		<span>{languages.length} languages</span>
	</div>
</section>

{#if languages.length > 0}
	<div class="language-pills">
		{#each languages.slice(0, 10) as [lang, count]}
			<span class="pill">{lang} <small>({count})</small></span>
		{/each}
	</div>
{/if}

<section class="repo-grid">
	{#each trending.repos as repo (repo.full_name)}
		<RepoCard {repo} />
	{/each}
</section>

<style>
	.hero {
		text-align: center;
		margin-bottom: 2rem;
	}
	h1 {
		font-size: 2rem;
		margin-bottom: 0.25rem;
	}
	.subtitle {
		color: var(--muted);
		font-size: 1.05rem;
	}
	.stats {
		margin-top: 0.75rem;
		display: flex;
		justify-content: center;
		gap: 1.5rem;
		font-size: 0.85rem;
		color: var(--muted);
	}
	.language-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		justify-content: center;
		margin-bottom: 2rem;
	}
	.pill {
		background: var(--pill-bg);
		border: 1px solid var(--border);
		border-radius: 999px;
		padding: 0.25rem 0.75rem;
		font-size: 0.8rem;
		color: var(--text-secondary);
	}
	.pill small { color: var(--muted); }
	.repo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
		gap: 1rem;
	}
</style>
