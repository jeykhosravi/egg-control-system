<script lang="ts">
	import type { MachineTypes } from '../../types/machineType.ts';
	import MachineCard from './MachineCard.svelte';
	import FilterButton from './FilterButton.svelte';
	import SerachInput from './SearchInput.svelte';

	let { machines = [] }: { machines: MachineTypes[] } = $props();

	let selectedFilter = $state<MachineTypes['status'] | 'all'>('all');
	let searchQuery = $state('');

	let errorMachines = $derived(machines.filter((m) => m.status === 'error').length);
	let runningCount = $derived(machines.filter((m) => m.status === 'running').length);
	let idleCount = $derived(machines.filter((m) => m.status === 'idle').length);
	let maintenanceCount = $derived(machines.filter((m) => m.status === 'maintenance').length);

	let filteredMachines = $derived(
		machines.filter(
			(m) =>
				(selectedFilter === 'all' || m.status === selectedFilter) &&
				(searchQuery === '' ||
					m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					m.status.toLowerCase().includes(searchQuery.toLowerCase()))
		)
	);

	function setFilter(status: MachineTypes['status'] | 'all') {
		selectedFilter = status;
	}

	function handleSearch(query: string) {
		searchQuery = query;
	}
</script>

<!-- Machine Grid Header -->
<div class="mb-6">
	<div class="mb-4 flex items-center justify-between">
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

	<!-- Filter Buttons -->
	<div class="flex flex-wrap gap-3">
		<FilterButton
			status="all"
			count={machines.length}
			active={selectedFilter === 'all'}
			onClick={() => setFilter('all')}
		/>
		<FilterButton
			status="running"
			count={runningCount}
			active={selectedFilter === 'running'}
			onClick={() => setFilter('running')}
		/>
		<FilterButton
			status="idle"
			count={idleCount}
			active={selectedFilter === 'idle'}
			onClick={() => setFilter('idle')}
		/>
		<FilterButton
			status="error"
			count={errorMachines}
			active={selectedFilter === 'error'}
			onClick={() => setFilter('error')}
		/>
		<FilterButton
			status="maintenance"
			count={maintenanceCount}
			active={selectedFilter === 'maintenance'}
			onClick={() => setFilter('maintenance')}
		/>
	</div>

	<!-- search Input -->
	<div class="mt-4 mb-2 w-full sm:max-w-[200px] rounded-3xl border p-2">
		<SerachInput placeholder="Search machines..." oninput={handleSearch} />
	</div>

	<!-- Machine Grid -->
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each filteredMachines as machine}
			<MachineCard {machine} />
		{/each}
	</div>

	{#if machines.length === 0}
		<div class="py-12 text-center">
			<div class="mb-4 text-6xl">⚙️</div>
			<p class="text-slate-600">Loading machine data...</p>
		</div>
	{:else if filteredMachines.length === 0}
		<div class="py-12 text-center">
			<div class="mb-4 text-6xl">🔍</div>
			<p class="text-slate-600">No machines found with status: {selectedFilter}</p>
			<button
				onclick={() => setFilter('all')}
				class="mt-4 text-sm text-blue-600 underline hover:text-blue-700"
			>
				Clear filter
			</button>
		</div>
	{/if}
</div>
