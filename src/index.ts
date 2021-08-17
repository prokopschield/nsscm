import fs from 'fs';
import config from './mod/config';
import installComponents from './mod/install';
import watch_components_change from './mod/watch_components_change';

export function init(directory?: string, components?: string) {
	directory = config.str.root = directory || config.str.root;
	components = config.str.components = components || config.str.components;
	if (!fs.existsSync(directory)) {
		fs.mkdirSync(directory, { recursive: true });
	}
	if (!fs.existsSync(components)) {
		fs.mkdirSync(components, { recursive: true });
	}
}

export function watch(directory?: string, components?: string) {
	init(directory, components);
	return watch_components_change();
}

export function install(...components: string[]) {
	init();
	return installComponents(...components);
}
