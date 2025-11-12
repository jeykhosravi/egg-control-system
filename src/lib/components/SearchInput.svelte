<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let value: string = '';
	export let placeholder: string = '';

	const handleInput = (e: Event) => {
		value = (e.target as HTMLInputElement).value;
		dispatch('input', value);
	};
</script>

<input class="outline-none" type="text" bind:value {placeholder} on:input={handleInput} />
