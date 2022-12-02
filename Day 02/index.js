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
	player: 0,
	self: 0,
};

function moveToType(move) {
	const entries = Object.entries(table);
	return entries.find((val) => val[1].indexOf(move) >= 0)[0];
}

function calcScore(move, result) {
	let tempScore = 0;

	tempScore += Object.keys(table).indexOf(move) + 1;
	tempScore += scoreArray.indexOf(result) * 3;

	return tempScore;
}

// Part 1

for (const [player, self] of rounds) {
	const moveArray = [moveToType(player), moveToType(self)];
	const resultArray = [];

	// console.log(playerMove, selfMove);

	if (moveArray[0] === moveArray[1]) {
		resultArray.push('Draw', 'Draw');
	} else if (Object.entries(antTable).find(([p, s]) => p === moveArray[0] && s === moveArray[1])) {
		resultArray.push('Loss', 'Win');
	} else {
		resultArray.push('Win', 'Loss');
	}

	Object.keys(scores).forEach((val, idx) => {
		scores[val] += calcScore(moveArray.at(idx), resultArray.at(idx));
	});
}

console.log(['Result of the game', `You: ${scores.self}`, `Player: ${scores.player}`].join('\n'));

// Part 2

scores.player = 0;
scores.self = 0;

function findTheRightMove(player, self) {
	switch (self) {
		case 'X':
			return Object.entries(antTable).filter(([_, move]) => move === player)[0][0];
		case 'Y':
			return player;
		case 'Z':
			return Object.entries(antTable).filter(([move]) => move === player)[0][1];
	}
}

for (const [player, self] of rounds) {
	const moveArray = [moveToType(player), findTheRightMove(moveToType(player), self)];
	const resultArray = [];

	switch (self) {
		case 'X':
			resultArray.push('Win', 'Loss');
			break;
		case 'Y':
			resultArray.push('Draw', 'Draw');
			break;
		case 'Z':
			resultArray.push('Loss', 'Win');
			break;
	}

	Object.keys(scores).forEach((val, idx) => {
		// console.log(moveArray.at(idx), resultArray.at(idx), calcScore(moveArray.at(idx), resultArray.at(idx)));
		scores[val] += calcScore(moveArray.at(idx), resultArray.at(idx));
	});
}

console.log(['Result of Part 2', `You: ${scores.self}`, `Player: ${scores.player}`].join('\n'));
