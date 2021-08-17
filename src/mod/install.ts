import fs from 'fs';
import { write } from 'serial-async-io';
import fetch from './fetch';
import get_component_name from './get_component_name';
import hash from './hash';
import hashmap from './hashmap';
import list from './list';

async function install(...hashes: string[]) {
	for (const longhash of [...hashes, ...list.entries]) {
		const file = get_component_name(longhash.substr(0, 8));
		if (!fs.existsSync(file)) {
			const data = hashmap.get(longhash) || (await fetch(longhash));
			if ((await hash(data)) === longhash.substr(0, 8)) {
				await write(file, data);
			}
		}
	}
}

export = install;
