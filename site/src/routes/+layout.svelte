<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
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
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	:global(body) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		color: #1f2328;
		background: #f6f8fa;
		line-height: 1.6;
	}
	.layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	header {
		background: #fff;
		border-bottom: 1px solid #d0d7de;
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
		color: #1f2328;
		text-decoration: none;
	}
	.nav-links {
		display: flex;
		gap: 1.25rem;
	}
	.nav-links a {
		color: #656d76;
		text-decoration: none;
		font-size: 0.9rem;
		font-weight: 500;
	}
	.nav-links a:hover { color: #0969da; }
	main {
		flex: 1;
		max-width: 1100px;
		width: 100%;
		margin: 0 auto;
		padding: 2rem 1.5rem;
	}
	footer {
		border-top: 1px solid #d0d7de;
		padding: 1.5rem;
		text-align: center;
		font-size: 0.8rem;
		color: #656d76;
		background: #fff;
	}
	footer a {
		color: #0969da;
		text-decoration: none;
	}
	footer a:hover { text-decoration: underline; }
</style>
