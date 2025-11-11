<script lang="ts">
	import type { MachineTypes } from '../../types/machineType.ts';

	export let machine: MachineTypes;

	function getStatusColor(status: MachineTypes['status']) {
		switch (status) {
			case 'running':
				return 'bg-green-100 text-green-800 border-green-200';
			case 'idle':
				return 'bg-yellow-100 text-yellow-800 border-yellow-200';
			case 'error':
				return 'bg-red-100 text-red-800 border-red-200';
			case 'maintenance':
				return 'bg-blue-100 text-blue-800 border-blue-200';
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	}

	function getStatusDot(status: MachineTypes['status']) {
		switch (status) {
			case 'running':
				return 'bg-green-500';
			case 'idle':
				return 'bg-yellow-500';
			case 'error':
				return 'bg-red-500';
			case 'maintenance':
				return 'bg-blue-500';
			default:
				return 'bg-gray-500';
		}
	}

	function getProgressBarColor(status: MachineTypes['status']) {
		switch (status) {
			case 'running':
				return 'bg-green-500';
			case 'error':
				return 'bg-red-500';
			default:
				return 'bg-slate-300';
		}
	}
</script>

<a
	href="/machine/{machine.id}"
	class="block cursor-pointer rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
>
	<!-- Machine Header -->
	<div class="mb-4 flex items-start justify-between">
		<div>
			<h3 class="text-lg font-semibold text-slate-900">{machine.name}</h3>
			<p class="text-sm text-slate-500">ID: #{machine.id}</p>
		</div>
		<span
			class="rounded-full border px-3 py-1 text-xs font-semibold {getStatusColor(machine.status)}"
		>
			<span class="inline-flex items-center gap-1.5">
				<span class="h-1.5 w-1.5 rounded-full {getStatusDot(machine.status)}"></span>
				{machine.status.charAt(0).toUpperCase() + machine.status.slice(1)}
			</span>
		</span>
	</div>

	<!-- Machine Metrics -->
	<div class="space-y-3">
		<div class="flex items-center justify-between">
			<span class="text-sm text-slate-600">Speed</span>
			<span class="text-sm font-semibold text-slate-900"
				>{machine.speed} <span class="text-slate-500">eggs/min</span></span
			>
		</div>

		<div class="flex items-center justify-between">
			<span class="text-sm text-slate-600">Temperature</span>
			<span class="text-sm font-semibold text-slate-900"
				>{machine.temperature}<span class="text-slate-500">°C</span></span
			>
		</div>

		<div class="flex items-center justify-between">
			<span class="text-sm text-slate-600">Eggs Processed</span>
			<span class="text-sm font-semibold text-slate-900"
				>{machine.eggsProcessed.toLocaleString()}</span
			>
		</div>

		{#if machine.errors > 0}
			<div
				class="mt-3 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-3 py-2"
			>
				<span class="text-sm font-medium text-red-800">Active Errors</span>
				<span class="text-sm font-bold text-red-800">{machine.errors}</span>
			</div>
		{/if}
	</div>

	<!-- Progress Bar (Speed Indicator) -->
	<div class="mt-4 border-t border-slate-100 pt-4">
		<div class="mb-2 flex items-center justify-between">
			<span class="text-xs text-slate-500">Speed Capacity</span>
			<span class="text-xs font-medium text-slate-600"
				>{Math.round((machine.speed / 150) * 100)}%</span
			>
		</div>
		<div class="h-2 w-full overflow-hidden rounded-full bg-slate-100">
			<div
				class="h-2 rounded-full transition-all duration-500 {getProgressBarColor(machine.status)}"
				style="width: {Math.min((machine.speed / 150) * 100, 100)}%"
			></div>
		</div>
	</div>
</a>
