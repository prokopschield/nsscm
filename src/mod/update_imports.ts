import fs from 'fs';
import path from 'path';
import { read, write } from 'serial-async-io';
import config from './config';
import get_latest_component from './get_latest_component';
import modmap from './modmap';

function update_imports() {
	return scandir(config.str.root);
}

async function scandir(dir: string) {
	for (const filename of await fs.promises.readdir(dir)) {
		const file = path.resolve(dir, filename);
		const stat = await fs.promises.stat(file);
		if (stat.isDirectory()) {
			await scandir(file);
		} else if (stat.isFile()) {
			await scanf(file);
		}
	}
}

async function scanf(file: string) {
	const contents = (await read(file)).toString();
	let modified = contents;
	const used_components = contents.match(/[0-9a-f]{8}/g);
	if (!used_components) return;
	for (const component of used_components) {
		if (modmap.has(component)) {
			modified = modified.replace(component, get_latest_component(component));
		}
	}
	if (modified !== contents) {
		await write(file, modified);
	}
}

export = update_imports;
