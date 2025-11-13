<script lang="ts">
	let {
		label,
		value,
		suffix = '',
		icon,
		iconBgColor = 'bg-blue-100',
		valueColor = 'text-slate-900'
	}: {
		label: string;
		value: string | number;
		suffix?: string;
		icon: string;
		iconBgColor?: string;
		valueColor?: string;
	} = $props();
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
