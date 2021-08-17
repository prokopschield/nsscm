import nsblob from 'nsblob';
import hashmap from './hashmap';

/**
 * Get component by hash
 * @param hash short or long hash
 * @returns component Buffer
 */
async function fetch(hash: string): Promise<Buffer | string> {
	const fromdb = hashmap.get(hash);
	if (fromdb) return fromdb;
	if (hash.length !== 64) {
		throw new Error(`Component not installed: ${hash}`);
	}
	return nsblob.fetch(hash);
}

export = fetch;
