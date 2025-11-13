<script lang="ts">
	let { value = $bindable(''), placeholder = '', oninput }: { value?: string; placeholder?: string; oninput?: (value: string) => void } = $props();

	const handleInput = (e: Event) => {
		value = (e.target as HTMLInputElement).value;
		oninput?.(value);
	};
</script>

<input class="outline-none" type="text" bind:value {placeholder} oninput={handleInput} />
