import { getConfig } from 'doge-config';

const config = getConfig('nsscm', {
	root: './src/',
	components: './src/lib/components/nsscm/',
});

export = config;
