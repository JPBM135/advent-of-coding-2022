import { spawnSync } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { info } from './dist/logger/logger.js';
// Util script to build the project of the specified day

const args = process.argv.slice(2)[0];

if (!args?.length) {
	console.error('No day specified!');
	process.exit(1);
}

const shell =
	process.platform === 'win32' ? 'C:\\Windows\\SysWOW64\\WindowsPowerShell\\v1.0\\powershell.exe' : undefined;

info(`Building Day ${args}...`);

const output = spawnSync('swc.cmd', [`"./day-${args}"`, '--out-dir', `./dist/day-${args}`], {
	shell,
	stdio: 'inherit',
});

if (output.error) {
	console.error(output.error);
	process.exit(1);
}

// info(output.output.toString());

info(`Done building Day ${args}!`);

if (process.argv.includes('--no-run')) process.exit(0);

spawnSync('node', [`./dist/day-${args}`], {
	shell,
	stdio: 'inherit',
});

process.exit(0);
