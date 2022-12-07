import { /* debug, */ success } from '../logger/logger.js';
import { input } from './input.js';

const stdout = input.split('\n').slice(1);

const dirMap = new Map<string, number>();
const current: string[] = [];

for (const line of stdout) {
	if (line.startsWith('$ cd')) {
		const dirString = line.slice(4).trim();

		if (dirString === '..') current.pop();
		else current.push(dirString);

		continue;
	}

	if (!/^\d/.test(line)) continue;

	for (let idx = 0; idx < current.length + 1; idx++) {
		const dir = '/' + current.slice(0, idx).join('/');
		const value = (dirMap.get(dir) ?? 0) + Number.parseInt(line, 10);
		// debug(dir, line, dirMap.get(dir), value, Number.parseInt(line, 10));
		dirMap.set(dir, value);
	}
}

// debug('DirMap', dirMap);

let sum = 0;

const dirArray = [...dirMap.entries()];

for (const [_, value] of dirArray) sum += value <= 100_000 ? value : 0;

success(7, 1, `The sum of the directories that have less than 100k bytes is: ${sum}`);

const freeSize = 70_000_000 - dirMap.get('/')!;

const filteredDirs = dirArray.filter((val) => val[1] > 30_000_000 - freeSize).sort((a, b) => a[1] - b[1]);

// debug('DirArray', dirArray, freeSize);

success(7, 2, `The smallest dir capable of freeing the space has teh size of: ${filteredDirs.at(0)?.join(' - ')}`);
