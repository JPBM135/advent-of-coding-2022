import { success } from '../util/logger.js';
import { input } from './input.js';

const inputArray = input.split('\n').map((line) => line.split(','));

let fullyContainedRanges = 0;

type NumberTupple = [number, number];

for (const [range1, range2] of inputArray as [[string, string]]) {
	const [r1Start, r1End] = range1
		.split('-')
		.map(Number)
		.sort((a, b) => a - b) as NumberTupple;
	const [r2Start, r2End] = range2
		.split('-')
		.map(Number)
		.sort((a, b) => a - b) as NumberTupple;

	if (r1End <= r2End && r1Start >= r2Start) {
		// console.log(`${r1Start}-${r1End} is fully in ${r2Start}-${r2End}`);
		fullyContainedRanges++;
		continue;
	}

	if (r2End <= r1End && r2Start >= r1Start) {
		// console.log(`${r2Start}-${r2End} is fully in ${r1Start}-${r1End}`);
		fullyContainedRanges++;
	}
}

success(4, 1, ['Fully contained intervals:', fullyContainedRanges].join(' '));

function rangeToNumber(range: string): number[] {
	const [start, end] = range
		.split('-')
		.map(Number)
		.sort((a, b) => a - b) as NumberTupple;

	return Array.from({ length: end - start + 1 })
		.fill(0)
		.map((_, index) => start + index);
}

let intersectRanges = 0;

for (const ranges of inputArray as [[string, string]]) {
	// console.log(ranges);
	const numbers = ranges.flatMap(rangeToNumber);
	// console.log(numbers);
	if (numbers.length !== new Set(numbers).size) intersectRanges++;
}

success(4, 2, ['Ranges that intersect:', intersectRanges].join(' '));
