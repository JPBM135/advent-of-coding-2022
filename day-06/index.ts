import { success } from '../logger/logger.js';
import { input } from './input.js';

const chunks = input.split('');

function findMarker(input: string[], markerSize: number) {
	let charSize = 0;
	const circular: string[] = [];

	for (const char of input) {
		if (circular.length >= markerSize) circular.shift();
		circular.push(char);
		charSize++;
		if (circular.length === markerSize && circular.length === new Set(circular).size) break;
	}

	return charSize;
}

success(6, 1, ['Found packet marker at:', findMarker(chunks, 4)].join(' '));
success(6, 2, ['Found message marker at:', findMarker(chunks, 14)].join(' '));
