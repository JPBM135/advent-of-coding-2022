import { /* debug, */ success } from '../util/logger.js';
import { input } from './input.js';

const forest = input.split('\n').map((row) => row.split('').map(Number));

// debug('Forest', forest);

function createRayCasts(Xcord: number, Ycord: number, reverse = false): number[][] {
	function condtionalReverse(array: number[]) {
		if (reverse) return array.reverse();
		return array;
	}

	return [
		condtionalReverse(forest[Ycord]?.slice(0, Xcord) ?? []),
		forest[Ycord]?.slice(Xcord + 1) ?? [],
		condtionalReverse(forest.slice(0, Ycord).map((row) => row[Xcord]!) ?? []),
		forest.slice(Ycord + 1).map((row) => row[Xcord]!) ?? [],
	];
}

function isOnEdge(Xcord: number, Ycord: number) {
	return Xcord === 0 || Ycord === 0 || Xcord === forest[0]!.length - 1 || Ycord === forest.length - 1;
}

function isVisible(size: number, Xcord: number, Ycord: number) {
	const raycasts = createRayCasts(Xcord, Ycord);
	// debug(`Raycasts: ${size}`, raycasts, forest[Ycord]);
	return raycasts.some((ray) => ray?.every((val) => val < size));
}

function calcScenicScore(size: number, Xcord: number, Ycord: number) {
	const raycasts = createRayCasts(Xcord, Ycord, true);

	const scenicScore = [];

	for (const ray of raycasts) {
		const index = ray.findIndex((val) => val >= size);
		scenicScore.push(index < 0 ? ray.length : index + 1);
	}

	// debug(`Scenic RayCasts | Cordinates: X: ${Xcord}, Y: ${Ycord} | Size: ${size} | Score ${scenicScore}`, raycasts);

	return scenicScore.reduce((acc, cur) => acc * cur, 1);
}

let visibleTrees = 0;
let biggestScenicScore = 0;

for (const [Ycord, row] of forest.entries()) {
	for (const [Xcord, size] of row.entries()) {
		// debug(`Cordinates: X: ${Xcord} | Y: ${Ycord} | ${isOnEdge(Xcord, Ycord)}`);
		if (isOnEdge(Xcord, Ycord) || isVisible(size, Xcord, Ycord)) visibleTrees++;

		const scenicScore = calcScenicScore(size, Xcord, Ycord);
		if (scenicScore > biggestScenicScore) biggestScenicScore = scenicScore;
	}
}

success(8, 1, `The number of visible trees is: ${visibleTrees}`);
success(8, 2, `The biggest scenic score possible is: ${biggestScenicScore}`);
