<script lang="ts">
	import type { MachineTypes } from '../../types/machineType.ts';

	export let status: MachineTypes['status'] | 'all';
	export let count: number;
	export let active: boolean = false;
	export let onClick: () => void;

	function getStatusIcon(status: MachineTypes['status'] | 'all') {
		switch (status) {
			case 'running':
				return '▶️';
			case 'idle':
				return '⏸️';
			case 'error':
				return '⚠️';
			case 'maintenance':
				return '🔧';
			case 'all':
				return '📊';
			default:
				return '';
		}
	}

	function getStatusLabel(status: MachineTypes['status'] | 'all') {
		return status.charAt(0).toUpperCase() + status.slice(1);
	}
</script>

<button
	on:click={onClick}
	class="flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200
	{active
		? 'border-black bg-gray-100 text-black'
		: 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'}"
>
	<span class="text-base">{getStatusIcon(status)}</span>
	<span>{getStatusLabel(status)}</span>
	<span
		class="ml-1 rounded-full px-2 py-0.5 text-xs font-semibold {active
			? 'bg-white/50'
			: 'bg-slate-100'}"
	>
		{count}
	</span>
</button>
