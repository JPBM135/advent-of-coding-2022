import { debug, success } from '../util/logger.js';
import { input } from './input.js';

const inputArray = input.split('\n');
// debug('Input', inputArray);

const finalArray = [];
let tempArray = [];

for (const item of inputArray) {
	if (!item.length) {
		// debug(tempArray, finalArray);
		finalArray.push(tempArray);
		// debug(finalArray);
		tempArray = [];
		continue;
	}

	// debug(item);

	tempArray.push(Number(item));
	// debug('Final length', finalArray.length);
}

// debug('Final array 1', finalArray);

if (tempArray.length) {
	finalArray.push(tempArray);
	// debug('Final array 2', finalArray);
}

// debug('Final array 3', finalArray);

const reducedArray = finalArray.map((array) => array.reduce((acc, cur) => acc + Number(cur), 0));
const sortedArray = reducedArray.sort((a, b) => b - a);

/* debug([
	'The 10 elfs with the most calories:',
	...sortedArray.map((val, idx) => `${idx + 1}° Elf - ${val}`).slice(0, 10),
]); */

success(1, 1, `The elf with the most calories has: ${sortedArray[0]}`);
success(
	1,
	2,
	`The top 3 elfs with the most calories has: ${sortedArray.slice(0, 3).join(' + ')} = ${sortedArray
		.slice(0, 3)
		.reduce((acc, cur) => acc + cur, 0)}`,
);
