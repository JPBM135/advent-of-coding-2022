import kleur from 'kleur';

kleur.enabled = true;

export function success(day: number, part: number, response: string) {
	console.log(`${kleur.green(`[Day ${day}] Part ${part}:`)} ${response}`);
}

export function info(message: string, ...args: any[]) {
	console.log(`${kleur.blue('[Info]:')} ${message}`, ...args);
}

export function debug(message: string, ...args: any[]) {
	console.log(`${kleur.gray('[Debug]:')} ${message}`, ...args);
}
