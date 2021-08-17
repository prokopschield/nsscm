import fs from 'fs';
import path from 'path';
import delay from 'ps-std/lib/functions/delay';
import { read, write } from 'serial-async-io';
import { watch } from 'ts-hound';
import config from './config';

import get_component_name from './get_component_name';
import get_latest_component from './get_latest_component';
import hash from './hash';
import is_component from './is_component';
import list from './list';
import modmap from './modmap';
import update_imports from './update_imports';

let update_in_progress = false;
let update_pending = true;

async function trigger_update(update = true) {
	if (update_in_progress) {
		update_pending = true;
	} else if (update || update_pending) {
		update_pending = false;
		update_in_progress = true;
		await update_imports();
		update_in_progress = false;
		trigger_update(false);
	}
}

function watch_components_change() {
	const hound = watch(config.str.root);
	hound.on('change', async (file) => {
		await delay(80);
		if (!fs.existsSync(file)) return;
		if (is_component(file)) {
			const s = await hash(await read(file));
			if (get_latest_component(s) !== s) {
				// file was changed back
				modmap.delete(s);
			}
			modmap.set(path.basename(file).replace(path.extname(file), ''), s);
			const nf = get_component_name(s);
			if (!fs.existsSync(file)) return;
			if (path.relative(file, nf)) {
				fs.renameSync(file, nf);
				hound.watch(nf);
				const to_remove = path.basename(file).replace(path.extname(file), '');
				list.remove(...list.entries.filter((a) => a.includes(to_remove)));
				trigger_update();
			}
		}
	});
}

export = watch_components_change;
