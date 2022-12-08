import { success } from '../util/logger.js';
import { input } from './input.js';

const inputArray = input.split('\n');

type CratesTuple = [string[], string[], string[], string[], string[], string[], string[], string[], string[]];

const crates: string[][] = inputArray.slice(1).reduce<string[][]>((acc, cur) => {
	if (!cur.includes('[')) return acc;

	const match = Array.from(cur.matchAll(/.{4}/g));
	// console.log(match);

	if (!match) return acc;

	for (let idx = 0; idx <= match.length; idx++) {
		const chunk = /\[(?<crate>\w)]/.exec(match[idx] as unknown as string);
		// console.log(chunk);

		// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
		if (!chunk || !chunk?.groups?.crate) continue;

		if (Array.isArray(acc[idx])) acc[idx]!.unshift(chunk.groups.crate);
		else acc[idx] = [chunk.groups.crate];
	}

	return acc;
}, []) as CratesTuple;

const cratesBy9001 = Array.from({ length: crates.length })
	.fill(0)
	.map((_, idx) => [...crates[idx]!]);

interface MoveGroups {
	amount: number;
	end: number;
	start: number;
}

const moves = inputArray
	.map((line) => /move (?<amount>\d*) from (?<start>\d*) to (?<end>\d+)/.exec(line))
	.filter((arr) => arr?.length)
	.map((move) => move?.groups as unknown as MoveGroups) as MoveGroups[];

for (const { amount, end, start } of moves) {
	const crate = crates.at(start - 1)!;
	// console.log(crate);
	const selected = crate.splice(crate.length - amount);
	crates.at(end - 1)?.push(...selected.reverse());
	// console.log(crates.at(end - 1));
}

success(5, 1, ['Last crates:', crates.map((create) => create.at(-1)).join('')].join(' '));

for (const { amount, end, start } of moves) {
	const crate = cratesBy9001.at(start - 1)!;
	// console.log(crate);
	const selected = crate.splice(crate.length - amount);
	cratesBy9001.at(end - 1)?.push(...selected);
	// console.log(cratesBy9001.at(end - 1));
}

success(5, 2, ['Last crates moved by 9001:', cratesBy9001.map((create) => create.at(-1)).join('')].join(' '));
