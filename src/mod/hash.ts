import nsblob from 'nsblob';
import hashmap from './hashmap';
import list from './list';

/**
 * Get short hash of component source
 * @param data Component source
 * @returns short hash
 */
async function hash(data: Buffer | string) {
	const h = await nsblob.store(data);
	const s = h.substr(0, 8);
	hashmap.set(h, data).set(s, data);
	list.add(h);
	return s;
}

export = hash;
