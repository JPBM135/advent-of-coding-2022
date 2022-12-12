import { debug, success } from '../util/logger.js';
import { input } from './input.js';

const commands = input.split('\n').map((line) => line.split(' ')) as [string, string?][];

let cycles = 1;
let xRegister = 1;

const sums: number[] = [];
const screen: string[][] = [[], [], [], [], [], []];

function checkCycles() {
	if ((cycles - 20) % 40 === 0) {
		debug('SPECIAL ABOVE');
		sums.push(cycles * xRegister);
	}
}

function draw() {
	const index = Math.floor(cycles / 40);

	let char = '.';
	const row = screen.at(index);

	if (!row) return;

	if (row?.length && (xRegister === row.length || xRegister === row.length - 1 || xRegister === row.length - 2))
		char = '#';

	screen[index]?.push(char);

	// debug(`Row (${index}) | L ${row?.length} | C: ${cycles}`);
}

draw();
draw();

for (const [_, number] of commands) {
	/* 	debug(
		`Command (C: ${cycles}) | Reg: ${xRegister}`,
		_,
		number,
		sums.reduce((acc, cur) => acc + cur, 0),
	); */

	checkCycles();

	const mod = Number(number);

	if (Number.isNaN(mod)) {
		cycles++;
		draw();
		continue;
	}

	cycles++;
	/* 	debug(
		`Command (C: ${cycles}) | Reg: ${xRegister}`,
		_,
		number,
		sums.reduce((acc, cur) => acc + cur, 0),
	); */
	draw();
	checkCycles();

	cycles++;
	xRegister += mod;
	draw();
}

success(
	10,
	1,
	`The sum of the six signal strengths (20, 60, 100, 140, 180, 220): ${sums.reduce((acc, cur) => acc + cur, 0)}`,
);

success(10, 2, `The rendered letters are:\n${screen.map((line) => line.join('')).join('\n')} `);
