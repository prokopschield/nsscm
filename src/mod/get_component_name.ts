import path from 'path';
import config from './config';

function get_component_name(hash: string) {
	return path.resolve(config.str.components, `${hash}.svelte`);
}

export = get_component_name;
