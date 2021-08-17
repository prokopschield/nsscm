import path from 'path';
import config from './config';

function is_component(fspath: string) {
	return !path.relative(config.str.components, fspath).startsWith('.');
}

export = is_component;
