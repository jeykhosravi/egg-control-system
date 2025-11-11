<script lang="ts">
	export let label: string;
	export let value: string | number;
	export let suffix: string = '';
	export let icon: string;
	export let iconBgColor: string = 'bg-blue-100';
	export let valueColor: string = 'text-slate-900';
</script>

<div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
	<div class="flex items-center justify-between">
		<div>
			<p class="text-sm font-medium text-slate-600">{label}</p>
			<p class="mt-2 text-3xl font-bold {valueColor}">
				{value}{#if suffix}<span class="text-lg text-slate-500">{suffix}</span>{/if}
			</p>
		</div>
		<div class="flex h-12 w-12 items-center justify-center rounded-lg {iconBgColor}">
			<span class="text-2xl">{icon}</span>
		</div>
	</div>
</div>
