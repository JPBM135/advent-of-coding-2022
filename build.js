import { spawnSync } from 'node:child_process';
import process from 'node:process';

// Util script to build the project of the specified day

const args = process.argv.slice(2)[0];

if (!args?.length) {
	console.error('No day specified!');
	process.exit(1);
}

console.log(`Building Day ${args}...`);
spawnSync('swc', [`"./Day ${args}"`, '--out-dir', './dist'], { stdio: 'inherit' });
console.log(`Done building Day ${args}!`);

process.exit(0);
