<script lang="ts">
	let {
		title = 'Awesome OSS Trending',
		description = 'Daily trending open-source projects on GitHub, tracked and analyzed.',
		url = 'https://awesome-oss-trending.pages.dev',
		type = 'website'
	}: {
		title?: string;
		description?: string;
		url?: string;
		type?: string;
	} = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<!-- Open Graph -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content="Awesome OSS Trending" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>
