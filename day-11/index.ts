import { debug, success } from '../util/logger.js';
import { input } from './input.js';

interface Monkey {
	inspected: number;
	items: number[];
	op(input: number): number;
	test(input: number): boolean;
	testValue: number;
	throwTo: [number, number];
}

enum OP {
	Minus = '-',
	Multiply = '*',
	Plus = '+',
}

function genOpFunction(op: OP, number?: number) {
	// eslint-disable-next-line no-param-reassign
	number = Number.isNaN(number) ? undefined : number;

	switch (op) {
		case OP.Minus:
			return (input: number) => input - (number ?? input);
		case OP.Multiply:
			return (input: number) => input * (number ?? input);
		case OP.Plus:
			return (input: number) => input + (number ?? input);
	}
}

// Chunk the input to five lines per element
const chunks = input.split('\n').reduce<string[][]>((acc, cur) => {
	if (!cur) return acc;

	const last = acc[acc.length - 1];

	if (last && last.length < 6) last.push(cur);
	else acc.push([cur]);

	return acc;
}, []);

// debug('Chunks:', chunks);

function parseMonkeys() {
	return chunks.reduce<Monkey[]>((acc, cur) => {
		const [_, stLine, opLine, testLine, trueLine, falseLine] = cur.map((line) => line.trim());

		const [op, number] = opLine?.slice(21).split(' ') as [OP, number | undefined];

		const quotient = Number(testLine?.slice(19));

		const monkeyObj: Monkey = {
			inspected: 0,
			items: Array.from(stLine!.matchAll(/\d+/g)).map(Number),
			op: genOpFunction(op, Number(number)),
			test: (input) => input % quotient === 0,
			testValue: quotient,
			throwTo: [Number(trueLine?.match(/\d+/)), Number(falseLine?.match(/\d+/))],
		};

		acc.push(monkeyObj);

		return acc;
	}, []);
}

function findMonkeyBusiness(rounds = 20, tooWorried = false) {
	const localMonkeys = parseMonkeys();
	const testMedian = localMonkeys.reduce((acc, cur) => acc * cur.testValue, 1);

	for (let idx = 0; idx < rounds; idx++) {
		for (const [ind, { op, items, test, throwTo }] of localMonkeys.entries()) {
			localMonkeys[ind]!.inspected += items.length;

			while (items.length) {
				const item = items.shift()!;

				const worryLevel = tooWorried ? op(item) % testMedian : Math.floor(op(item) / 3);

				const monkeyToTrow = test(worryLevel) ? throwTo[0] : throwTo[1];
				localMonkeys[monkeyToTrow]!.items.push(worryLevel);
			}
		}
	}

	return localMonkeys
		.map((val) => BigInt(val.inspected))
		.sort((a, b) => Number(b - a))
		.reduce((acc, cur, idx) => {
			if (idx > 1) return acc;
			debug('Cur', cur);
			return acc * cur;
		}, BigInt(1));
}

success(11, 1, `Monkey business while not very worried (20 rounds): ${findMonkeyBusiness()}`);
success(11, 2, `Monkey business while very worried (10000 rounds): ${findMonkeyBusiness(10_000, true)}`);
