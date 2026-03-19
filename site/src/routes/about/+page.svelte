<script lang="ts">
	import SEOHead from '$lib/components/SEOHead.svelte';
</script>

<SEOHead
	title="About | Awesome OSS Trending"
	description="About the Awesome OSS Trending project - daily tracking of trending GitHub repos."
	url="https://awesome-oss-trending.pages.dev/about"
/>

<h1>About</h1>

<div class="content">
	<p>
		<strong>Awesome OSS Trending</strong> automatically tracks trending open-source projects on GitHub every day.
		Each repo is forked into the <a href="https://github.com/awesome-oss-trending" target="_blank" rel="noopener">awesome-oss-trending</a> GitHub organization for study and preservation.
	</p>

	<h2>How It Works</h2>
	<ol>
		<li>A daily automated pipeline scrapes GitHub's trending page</li>
		<li>New repos are forked to the org</li>
		<li>This site is rebuilt and deployed to Cloudflare Pages</li>
		<li>You get a searchable, browsable archive of trending OSS</li>
	</ol>

	<h2>Our Products</h2>
	<p>We build open-source tools with <strong>Rust + SvelteKit</strong>:</p>
	<ul>
		<li><a href="https://github.com/mbaneshi/codeilus" target="_blank" rel="noopener"><strong>Codeilus</strong></a> &mdash; Turn any codebase into an interactive learning experience. Single Rust binary with embedded SvelteKit UI.</li>
		<li><a href="https://github.com/mbaneshi/agentforge-hq" target="_blank" rel="noopener"><strong>AgentForge HQ</strong></a> &mdash; Self-improving AI workforce platform with 100+ agent personas.</li>
	</ul>

	<h2>Inspiration</h2>
	<p>
		Inspired by the <a href="https://www.youtube.com/@githubawesome" target="_blank" rel="noopener">GitHub Awesome</a> YouTube channel
		and <a href="https://githubawesome.com" target="_blank" rel="noopener">githubawesome.com</a>.
	</p>

	<h2>Open Source</h2>
	<p>
		This project is fully open source.
		<a href="https://github.com/mbaneshi/github-awesome" target="_blank" rel="noopener">View on GitHub</a>.
	</p>
</div>

<style>
	.content {
		max-width: 700px;
		line-height: 1.8;
	}
	h2 { margin-top: 1.5rem; margin-bottom: 0.5rem; }
	p, ol, ul { margin-bottom: 1rem; }
	a { color: #0969da; }
	li { margin-bottom: 0.4rem; }
</style>
