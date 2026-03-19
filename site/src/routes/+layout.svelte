<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();

	let dark = $state(false);

	function toggleTheme() {
		dark = !dark;
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
			localStorage.setItem('theme', dark ? 'dark' : 'light');
		}
	}

	$effect(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('theme');
			if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
				dark = true;
				document.documentElement.setAttribute('data-theme', 'dark');
			}
		}
	});
</script>

<div class="layout">
	<header>
		<nav>
			<a href="/" class="brand">Awesome OSS Trending</a>
			<div class="nav-links">
				<a href="/">Today</a>
				<a href="/archive">Archive</a>
				<a href="/about">About</a>
				<a href="/rss.xml" title="RSS Feed">RSS</a>
				<button class="theme-toggle" onclick={toggleTheme} aria-label="Toggle theme">
					{dark ? 'Light' : 'Dark'}
				</button>
			</div>
		</nav>
	</header>

	<main>
		{@render children()}
	</main>

	<footer>
		<p>
			Powered by <a href="https://github.com/mbaneshi/codeilus" target="_blank" rel="noopener">Codeilus</a>
			&middot; Data from <a href="https://github.com/awesome-oss-trending" target="_blank" rel="noopener">awesome-oss-trending</a>
			&middot; Inspired by <a href="https://www.youtube.com/@githubawesome" target="_blank" rel="noopener">GitHub Awesome</a>
		</p>
	</footer>
</div>

<style>
	:global(:root),
	:global([data-theme="light"]) {
		--bg: #f6f8fa;
		--bg-surface: #fff;
		--card-bg: #fff;
		--text: #1f2328;
		--text-secondary: #444;
		--muted: #656d76;
		--border: #d0d7de;
		--accent: #0969da;
		--accent-hover: #0550ae;
		--stars-today: #1a7f37;
		--pill-bg: #fff;
	}

	:global([data-theme="dark"]) {
		--bg: #0d1117;
		--bg-surface: #161b22;
		--card-bg: #161b22;
		--text: #e6edf3;
		--text-secondary: #b1bac4;
		--muted: #8b949e;
		--border: #30363d;
		--accent: #58a6ff;
		--accent-hover: #79c0ff;
		--stars-today: #3fb950;
		--pill-bg: #21262d;
	}

	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	:global(body) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		color: var(--text);
		background: var(--bg);
		line-height: 1.6;
		transition: background 0.2s, color 0.2s;
	}
	.layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	header {
		background: var(--bg-surface);
		border-bottom: 1px solid var(--border);
		padding: 0.75rem 1.5rem;
		position: sticky;
		top: 0;
		z-index: 10;
	}
	nav {
		max-width: 1100px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.brand {
		font-size: 1.15rem;
		font-weight: 700;
		color: var(--text);
		text-decoration: none;
	}
	.nav-links {
		display: flex;
		gap: 1.25rem;
		align-items: center;
	}
	.nav-links a {
		color: var(--muted);
		text-decoration: none;
		font-size: 0.9rem;
		font-weight: 500;
	}
	.nav-links a:hover { color: var(--accent); }
	.theme-toggle {
		background: var(--pill-bg);
		border: 1px solid var(--border);
		color: var(--muted);
		border-radius: 6px;
		padding: 0.25rem 0.6rem;
		font-size: 0.8rem;
		cursor: pointer;
		font-weight: 500;
	}
	.theme-toggle:hover {
		color: var(--accent);
		border-color: var(--accent);
	}
	main {
		flex: 1;
		max-width: 1100px;
		width: 100%;
		margin: 0 auto;
		padding: 2rem 1.5rem;
	}
	footer {
		border-top: 1px solid var(--border);
		padding: 1.5rem;
		text-align: center;
		font-size: 0.8rem;
		color: var(--muted);
		background: var(--bg-surface);
	}
	footer a {
		color: var(--accent);
		text-decoration: none;
	}
	footer a:hover { text-decoration: underline; }
</style>
