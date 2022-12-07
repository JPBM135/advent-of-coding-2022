import { inspect } from 'node:util';
import kleur from 'kleur';

kleur.enabled = true;

inspect.defaultOptions.depth = 10;
inspect.defaultOptions.maxArrayLength = Number.POSITIVE_INFINITY;

export function success(day: number, part: number, response: string) {
	console.log(`${kleur.green(`[Day ${day}] Part ${part}:`)} ${response}`);
}

export function info(message: string, ...args: any[]) {
	console.log(`${kleur.blue('[Info]:')} ${message}`, ...args);
}

export function debug(message: string, ...args: any[]) {
	console.log(`${kleur.gray('[Debug]:')} ${message}`, ...args);
}
