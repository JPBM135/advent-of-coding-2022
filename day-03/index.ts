import { success } from '../logger/logger.js';
import { input } from './input.js';

const priorities = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const rushsacks = input.split('\n');

function splitStringInHalf(str: string): [string, string] {
	return [str.slice(0, str.length / 2), str.slice(str.length / 2)];
}

function findIntersection(str1: string, str2: string): Set<string> {
	const intersections = new Set<string>();

	for (const char of str1) {
		if (str2.includes(char)) intersections.add(char);
	}

	return intersections;
}

let score = 0;

for (const rushsack of rushsacks) {
	const parts = splitStringInHalf(rushsack);
	// console.log(rushsack, parts);
	const intersections = findIntersection(...parts);
	// console.log(intersections);

	for (const char of intersections) {
		// console.log(char, priorities.indexOf(char));
		score += priorities.indexOf(char);
	}
}

success(3, 1, ['Sum of items shared between two rushsacks:', score].join(' '));

const groups = rushsacks.reduce<string[][]>((acc, cur, idx) => {
	const group = Math.floor(idx / 3);

	if (Array.isArray(acc[group])) acc[group]!.push(cur);
	else acc[group] = [cur];

	return acc;
}, []);

// console.log(groups);

function findGroupBadge(group: string[]) {
	for (const char of group[0]!) {
		if (group.every((comp) => comp.includes(char))) return char;
	}

	throw new Error(`No badge found for [${group.join(', ')}]`);
}

let badgeScore = 0;

for (const group of groups) {
	const badge = findGroupBadge(group);
	badgeScore += priorities.indexOf(badge);
}

success(3, 2, ['Sum of badges shared between groups of 3:', badgeScore].join(' '));
