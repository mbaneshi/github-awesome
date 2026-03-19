<script lang="ts">
	import type { Repo } from '$lib/types';

	let { repo }: { repo: Repo } = $props();

	const languageColors: Record<string, string> = {
		'Python': '#3572A5',
		'JavaScript': '#f1e05a',
		'TypeScript': '#3178c6',
		'Rust': '#dea584',
		'Go': '#00ADD8',
		'Java': '#b07219',
		'C++': '#f34b7d',
		'C': '#555555',
		'Ruby': '#701516',
		'Swift': '#F05138',
		'Kotlin': '#A97BFF',
		'Dart': '#00B4AB',
		'Shell': '#89e051',
		'HTML': '#e34c26',
		'CSS': '#563d7c',
		'Vue': '#41b883',
		'Svelte': '#ff3e00',
	};

	const langColor = $derived(repo.language ? (languageColors[repo.language] || '#888') : '#888');
	const orgUrl = $derived(`https://github.com/awesome-oss-trending/${repo.name}`);

	function cleanDescription(text: string): string {
		return text
			.replace(/<[^>]+>/g, '')
			.replace(/\*\*([^*]+)\*\*/g, '$1')
			.replace(/\*([^*]+)\*/g, '$1')
			.replace(/`([^`]+)`/g, '$1')
			.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
			.replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
			.replace(/\s+/g, ' ')
			.trim();
	}

	const description = $derived(repo.description ? cleanDescription(repo.description) : null);
</script>

<article class="repo-card">
	<div class="repo-header">
		<a href={repo.url} target="_blank" rel="noopener" class="repo-name">
			<span class="owner">{repo.owner}/</span>{repo.name}
		</a>
		{#if repo.total_stars}
			<span class="stars" title="Total stars">
				{repo.total_stars.toLocaleString()}
			</span>
		{/if}
	</div>

	{#if description}
		<p class="description">{description}</p>
	{/if}

	<div class="repo-meta">
		{#if repo.language}
			<span class="language">
				<span class="lang-dot" style="background:{langColor}"></span>
				{repo.language}
			</span>
		{/if}
		{#if repo.stars_today}
			<span class="stars-today">+{repo.stars_today} today</span>
		{/if}
		<a href={orgUrl} target="_blank" rel="noopener" class="org-link" title="View fork in awesome-oss-trending org">
			org fork
		</a>
	</div>
</article>

<style>
	.repo-card {
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1.25rem;
		background: var(--card-bg);
		transition: border-color 0.15s, box-shadow 0.15s;
	}
	.repo-card:hover {
		border-color: var(--accent);
		box-shadow: 0 1px 6px rgba(9, 105, 218, 0.15);
	}
	.repo-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}
	.repo-name {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--accent);
		text-decoration: none;
		word-break: break-word;
	}
	.repo-name:hover { text-decoration: underline; }
	.owner { color: var(--muted); font-weight: 400; }
	.stars {
		flex-shrink: 0;
		font-size: 0.85rem;
		color: var(--muted);
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
	.stars::before { content: '\2605'; }
	.description {
		color: var(--text-secondary);
		font-size: 0.9rem;
		line-height: 1.5;
		margin: 0 0 0.75rem;
	}
	.repo-meta {
		display: flex;
		gap: 1rem;
		font-size: 0.8rem;
		color: var(--muted);
		align-items: center;
		flex-wrap: wrap;
	}
	.language {
		display: flex;
		align-items: center;
		gap: 0.3rem;
	}
	.lang-dot {
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}
	.stars-today {
		color: #1a7f37;
		font-weight: 500;
	}
	.org-link {
		color: var(--muted);
		text-decoration: none;
		font-size: 0.75rem;
		border: 1px solid var(--border);
		border-radius: 4px;
		padding: 0.1rem 0.4rem;
	}
	.org-link:hover {
		color: var(--accent);
		border-color: var(--accent);
	}
</style>
