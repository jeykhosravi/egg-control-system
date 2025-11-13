<script lang="ts">
	import type { MachineTypes } from '../types/machineType.ts';
	import { getMachineData } from '$lib/api/machine.ts';
	import Header from '$lib/components/Header.svelte';
	import StatsOverview from '$lib/components/StatsOverview.svelte';
	import MachineGrid from '$lib/components/MachineGrid.svelte';

	let machines = $state<MachineTypes[]>([]);

	$effect(() => {
		getMachineData().then(data => {
			machines = data;
		});
	});
</script>

<div class="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
	<Header />

	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<StatsOverview {machines} />
		<MachineGrid {machines} />
	</main>
</div>
