import { input } from './input.js';

const rounds = input.split('\n').map((round) => round.split(' '));

const table = {
	Rock: ['A', 'X'],
	Paper: ['B', 'Y'],
	Scissor: ['C', 'Z'],
};

const antTable = {
	Rock: 'Paper',
	Paper: 'Scissor',
	Scissor: 'Rock',
};

const scoreArray = ['Loss', 'Draw', 'Win'];

const scores = {
	enemy: 0,
	player: 0,
};

function moveToType(move) {
	const entries = Object.entries(table);
	return entries.find((val) => val[1].includes(move))[0];
}

function calcScore(move, result) {
	let tempScore = 0;

	tempScore += Object.keys(table).indexOf(move) + 1;
	tempScore += scoreArray.indexOf(result) * 3;

	return tempScore;
}

// Part 1

for (const [enemy, player] of rounds) {
	const moveArray = [moveToType(enemy), moveToType(player)];
	const resultArray = [];

	// console.log(enemyMove, playerMove);

	if (moveArray[0] === moveArray[1]) {
		resultArray.push('Draw', 'Draw');
	} else if (Object.entries(antTable).some(([enm, ply]) => enm === moveArray[0] && ply === moveArray[1])) {
		resultArray.push('Loss', 'Win');
	} else {
		resultArray.push('Win', 'Loss');
	}

	for (const [idx, val] of Object.keys(scores).entries()) {
		scores[val] += calcScore(moveArray.at(idx), resultArray.at(idx));
	}
}

console.log(['Result of the game', `You: ${scores.player}`, `enemy: ${scores.enemy}`].join('\n'));

// Part 2

scores.enemy = 0;
scores.player = 0;

function findTheRightMove(enemy, player) {
	switch (player) {
		case 'X':
			return Object.entries(antTable).find(([_, move]) => move === enemy)[0];
		case 'Y':
			return enemy;
		case 'Z':
			return Object.entries(antTable).find(([move]) => move === enemy)[1];
	}
}

for (const [enemy, player] of rounds) {
	const moveArray = [moveToType(enemy), findTheRightMove(moveToType(enemy), player)];
	const resultArray = [];

	switch (player) {
		case 'X':
			resultArray.push('Win', 'Loss');
			break;
		case 'Y':
			resultArray.push('Draw', 'Draw');
			break;
		case 'Z':
			resultArray.push('Loss', 'Win');
			break;
		default:
			throw new Error(`Unknown type ${player}`);
	}

	for (const [idx, val] of Object.keys(scores).entries()) {
		// console.log(moveArray.at(idx), resultArray.at(idx), calcScore(moveArray.at(idx), resultArray.at(idx)));
		scores[val] += calcScore(moveArray.at(idx), resultArray.at(idx));
	}
}

console.log(['Result of Part 2', `You: ${scores.player}`, `enemy: ${scores.enemy}`].join('\n'));
