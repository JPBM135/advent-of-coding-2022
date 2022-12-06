import { input } from './input.js';

const inputArray = input.split('\n');
console.log(inputArray);

const finalArray = [];
let tempArray = [];

for (const item of inputArray) {
	if (!item.length) {
		// console.log(tempArray, finalArray);
		finalArray.push(tempArray);
		// console.log(finalArray);
		tempArray = [];
		continue;
	}

	// console.log(item);

	tempArray.push(Number(item));
	console.log(finalArray.length);
}

console.log(finalArray);

if (tempArray.length) {
	finalArray.push(tempArray);
	console.log(finalArray);
}

console.log(finalArray);

const reducedArray = finalArray.map((array) => array.reduce((acc, cur) => acc + Number(cur), 0));
const sortedArray = reducedArray.sort((a, b) => b - a);

console.log([
	'The 10 elfs with the most calories:',
	...sortedArray.map((val, idx) => `${idx + 1}° Elf - ${val}`).slice(0, 10),
]);
