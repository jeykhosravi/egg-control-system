<script lang="ts">
	import type { MachineTypes } from '../../types/machineType.ts';
	import StatsCard from './StatsCard.svelte';

	let { machines = [] }: { machines: MachineTypes[] } = $props();

	let totalEggsProcessed = $derived(machines.reduce((sum, m) => sum + m.eggsProcessed, 0));
	let runningMachines = $derived(machines.filter((m) => m.status === 'running').length);
	let avgSpeed = $derived(
		machines.length
			? Math.round(
					machines.filter((m) => m.status === 'running').reduce((sum, m) => sum + m.speed, 0) /
						machines.filter((m) => m.status === 'running').length || 0
				)
			: 0
	);
</script>

<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
	<StatsCard label="Total Machines" value={machines.length} icon="⚙️" iconBgColor="bg-blue-100" />

	<StatsCard
		label="Running"
		value={runningMachines}
		icon="✓"
		iconBgColor="bg-green-100"
		valueColor="text-green-600"
	/>

	<StatsCard
		label="Avg Speed"
		value={avgSpeed}
		suffix="/min"
		icon="⚡"
		iconBgColor="bg-purple-100"
	/>

	<StatsCard
		label="Total Processed"
		value={(totalEggsProcessed / 1000).toFixed(1)}
		suffix="k"
		icon="🥚"
		iconBgColor="bg-amber-100"
	/>
</div>
