import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import process from 'node:process';
import kleur from 'kleur';
import logger, { debug, info } from '../dist/util/logger.js';
// Util script to build the project of the specified day

const args = process.argv.slice(2)[0];

const runAll = process.argv.includes('--all');

if (!args?.length && !runAll) {
	console.error('No day specified!');
	process.exit(1);
}

const shell =
	process.platform === 'win32' ? 'C:\\Windows\\SysWOW64\\WindowsPowerShell\\v1.0\\powershell.exe' : undefined;

if (runAll) info(`Building all days avaliable...`);

const folders = runAll ? readdirSync('.').filter((folder) => folder.startsWith('day-')) : [args];

for (const days of folders) {
	const day = days.replace('day-', '');

	debug(`Building Day ${day}...`);

	const output = spawnSync('swc.cmd', [`"./day-${day}"`, '--out-dir', `./dist/day-${day}`, '--copy-files'], {
		shell,
		stdio: 'inherit',
	});

	if (output.error) {
		console.error(output.error);
		process.exit(1);
	}

	debug(`Done building Day ${day}!`);
}
// info(output.output.toString());

const avaliableDays = readdirSync('./dist')
	.filter((folder) => folder.startsWith('day-'))
	.map((day) => day.replace('day-', ''));

if (runAll) {
	info(`Done building all days avaliable! (${avaliableDays.join(', ')})`);
	logger.infoEnabled = false;
	logger.debugEnabled = false;
	console.log(kleur.bold('='.repeat(50)));
}

for (const day of avaliableDays) {
	info(`Running Day ${day}...`);

	debug(`Running node ./dist/day-${day}, timing started...`);

	const time = performance.now();

	if (!runAll) console.log(kleur.bold('='.repeat(50)));

	spawnSync('node', [`./dist/day-${day}`], {
		shell,
		stdio: 'inherit',
	});

	console.log(kleur.bold('='.repeat(50)));

	debug(`Done running node ./dist/day-${day}, timing ended!`, `Took ${(performance.now() - time).toFixed(3)}ms`);
	info(`Done running Day ${day}!`);
}

process.exit(0);
