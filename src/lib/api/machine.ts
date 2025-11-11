import type { MachineTypes } from '../../types/machineType.ts';

// get all machines data from mock json file
export async function getMachineData(): Promise<MachineTypes[]> {
	const res = await fetch('/mock/machine.json');
	if (!res.ok) throw new Error('Failed to fetch machines');
	const data = await res.json();
	return data.machines;
}

// get machine data by id
export async function getMachineById(id: number): Promise<MachineTypes | undefined> {
	const machines = await getMachineData();
	return machines.find((machine) => machine.id === id);
}
