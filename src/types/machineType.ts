export interface MachineTypes {
	id: number;
	name: string;
	status: 'running' | 'idle' | 'error' | 'maintenance';
	speed: number; // current speed (eggs/min)
	eggsProcessed: number; // total eggs processed
	temperature: number; // °C
	errors: number; // number of errors currently active
	lastError?: string; // optional error message
}
