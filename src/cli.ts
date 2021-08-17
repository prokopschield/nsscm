#!/usr/bin/env node

import { install, watch } from '.';

(async function () {
	const [, , cmd, ...args] = process.argv;
	let watching = false;
	switch (cmd) {
		case 'watch':
			watch(...args);
			break;
		case 'install':
			await install(...args);
			break;
	}
	if (!watching) {
		console.log(`\r\n\x1b[92mFinished!`);
		console.log(`\x1b[92mPress \x1b[31mENTER\x1b[92m to start watching!`);
		console.log(`\x1b[92mPress any other key to exit.\r\n`);
		process.stdin.once('data', (data) => {
			if (data[0] === 0x0a) {
				watch();
				console.log('\x1b[AWatching!');
			} else {
				process.exit();
			}
		});
	}
})();
