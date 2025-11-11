<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { MachineTypes } from '../../../types/machineType.ts';
	import { getMachineById } from '$lib/api/machine.ts';

	let machine: MachineTypes | undefined;
	let loading = true;
	let error = '';

	onMount(async () => {
		try {
			const slug = $page.params.slug;

			if (!slug) {
				error = 'Invalid machine ID';
				loading = false;
				return;
			}

			const machineId = parseInt(slug);

			if (isNaN(machineId)) {
				error = 'Invalid machine ID';
				loading = false;
				return;
			}

			machine = await getMachineById(machineId);

			if (!machine) {
				error = 'Machine not found';
			}
		} catch (err) {
			error = 'Failed to load machine data';
			console.error(err);
		} finally {
			loading = false;
		}
	});
</script>

{#if loading}
	<div class="loading">Loading machine data...</div>
{:else if error}
	<div class="error">
		<h1>Error</h1>
		<p>{error}</p>
		<a href="/machine">← Back to all machines</a>
	</div>
{:else if machine}
	<div class="machine-detail">
		<header>
			<a href="/" class="back-link">← Back</a>
			<h1>{machine.name}</h1>
			<span class="status status-{machine.status}">{machine.status}</span>
		</header>

		<div class="stats-grid">
			<div class="stat-card">
				<h3>Current Speed</h3>
				<p class="stat-value">{machine.speed} <span class="unit">eggs/min</span></p>
			</div>

			<div class="stat-card">
				<h3>Eggs Processed</h3>
				<p class="stat-value">{machine.eggsProcessed.toLocaleString()}</p>
			</div>

			<div class="stat-card">
				<h3>Temperature</h3>
				<p class="stat-value">{machine.temperature}°C</p>
			</div>

			<div class="stat-card">
				<h3>Active Errors</h3>
				<p class="stat-value {machine.errors > 0 ? 'error-count' : ''}">{machine.errors}</p>
			</div>
		</div>

		{#if machine.errors > 0 && 'lastError' in machine}
			<div class="error-info">
				<h3>Last Error</h3>
				<p>{machine.lastError}</p>
			</div>
		{/if}
	</div>
{/if}

<style>
	.loading {
		text-align: center;
		padding: 2rem;
		font-size: 1.2rem;
	}

	.error {
		padding: 2rem;
		text-align: center;
	}

	.error a {
		color: #0066cc;
		text-decoration: none;
	}

	.machine-detail {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	header {
		margin-bottom: 2rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.back-link {
		color: #0066cc;
		text-decoration: none;
		font-size: 1rem;
	}

	h1 {
		margin: 0;
		flex: 1;
	}

	.status {
		padding: 0.5rem 1rem;
		border-radius: 4px;
		font-weight: 600;
		text-transform: uppercase;
		font-size: 0.875rem;
	}

	.status-running {
		background-color: #d4edda;
		color: #155724;
	}

	.status-idle {
		background-color: #fff3cd;
		color: #856404;
	}

	.status-error {
		background-color: #f8d7da;
		color: #721c24;
	}

	.status-maintenance {
		background-color: #d1ecf1;
		color: #0c5460;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.stat-card {
		background: white;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		padding: 1.5rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	}

	.stat-card h3 {
		margin: 0 0 0.75rem 0;
		font-size: 0.875rem;
		color: #666;
		text-transform: uppercase;
		font-weight: 600;
	}

	.stat-value {
		margin: 0;
		font-size: 2rem;
		font-weight: 700;
		color: #333;
	}

	.stat-value .unit {
		font-size: 1rem;
		color: #666;
		font-weight: 400;
	}

	.error-count {
		color: #dc3545;
	}

	.error-info {
		background: #fff3cd;
		border: 1px solid #ffc107;
		border-radius: 8px;
		padding: 1.5rem;
	}

	.error-info h3 {
		margin: 0 0 0.5rem 0;
		color: #856404;
	}

	.error-info p {
		margin: 0;
		color: #856404;
	}
</style>
