import { spawnSync } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
// Util script to build the project of the specified day

const args = process.argv.slice(2)[0];

if (!args?.length) {
	console.error('No day specified!');
	process.exit(1);
}

const shell =
	process.platform === 'win32' ? 'C:\\Windows\\SysWOW64\\WindowsPowerShell\\v1.0\\powershell.exe' : undefined;

console.log(`Building Day ${args}...`);

const output = spawnSync('swc.cmd', [`"./Day ${args}"`, '--out-dir', './dist'], {
	shell,
	stdio: 'inherit',
});

if (output.error) {
	console.error(output.error);
	process.exit(1);
}

// console.log(output.output.toString());

console.log(`Done building Day ${args}!`);

process.exit(0);
