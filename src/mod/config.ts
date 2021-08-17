import { getConfig } from 'doge-config';

const config = getConfig('nsscm', {
	root: './src/',
	components: './src/components/share',
});

export = config;
