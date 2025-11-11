<script lang="ts">
	import type { MachineTypes } from '../../types/machineType.ts';
	import MachineCard from './MachineCard.svelte';

	export let machines: MachineTypes[] = [];

	$: errorMachines = machines.filter((m) => m.status === 'error').length;
</script>

<!-- Machine Grid Header -->
<div class="mb-6 flex items-center justify-between">
	<h2 class="text-xl font-semibold text-slate-900">Machine Status</h2>
	{#if errorMachines > 0}
		<div class="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2">
			<div class="h-2 w-2 rounded-full bg-red-500"></div>
			<span class="text-sm font-medium text-red-800"
				>{errorMachines} machine{errorMachines > 1 ? 's' : ''} with errors</span
			>
		</div>
	{/if}
</div>

<!-- Machine Grid -->
<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
	{#each machines as machine}
		<MachineCard {machine} />
	{/each}
</div>

{#if machines.length === 0}
	<div class="py-12 text-center">
		<div class="mb-4 text-6xl">⚙️</div>
		<p class="text-slate-600">Loading machine data...</p>
	</div>
{/if}
