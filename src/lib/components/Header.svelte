<script lang="ts">
	export let title: string = '🥚 Egg Control System';
	export let subtitle: string = 'Real-time production monitoring dashboard';
	export let isLive: boolean = true;
</script>

<header class="border-b border-slate-200 bg-white shadow-lg">
	<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold text-slate-900">{title}</h1>
				<p class="mt-1 text-slate-600">{subtitle}</p>
			</div>
			{#if isLive}
				<div class="flex items-center gap-2">
					<div class="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
					<span class="text-sm text-slate-600">Live</span>
				</div>
			{/if}
		</div>
	</div>
</header>
