import { createWriteStream } from 'node:fs';
import { inspect } from 'node:util';
import kleur from 'kleur';

kleur.enabled = true;

const logStream = createWriteStream('log.log', { flags: 'a' });

inspect.defaultOptions.depth = 10;
inspect.defaultOptions.maxArrayLength = Number.POSITIVE_INFINITY;

interface ILogger {
	debug(message: string, ...args: any[]): void;
	debugEnabled: boolean;
	info(message: string, ...args: any[]): void;
	infoEnabled: boolean;
	success(day: number, part: number, response: string): void;
}

const Logger: ILogger = {
	debugEnabled: true,
	infoEnabled: true,
	success(day: number, part: number, response: string) {
		logStream.write(`\n${kleur.green(`[Day ${day}] Part ${part}:`)} ${response}`);
		console.log(`${kleur.green(`[Day ${day}] Part ${part}:`)} ${response}`);
	},
	info(message: string, ...args: any[]) {
		logStream.write(
			`\n${this.infoEnabled ? '' : '[DISABLED]'}${kleur.blue('[Info]:')} ${message} ${args.map((val) => inspect(val))}`,
		);
		if (!this.infoEnabled) return;
		console.log(`${kleur.blue('[Info]:')} ${message}`, ...args);
	},
	debug(message: string, ...args: any[]) {
		logStream.write(`\n${this.debugEnabled ? '' : '[DISABLED]'}${kleur.gray('[Debug]:')} ${message}`);
		if (!this.debugEnabled) return;
		console.log(`${kleur.gray('[Debug]:')} ${message}`, ...args);
	},
};

export const debug = Logger.debug.bind(Logger);
export const info = Logger.info.bind(Logger);
export const success = Logger.success.bind(Logger);

export default Logger;
