import modmap from './modmap';

function get_latest_component(hash: string) {
	let newhash = modmap.get(hash);
	while (newhash && newhash !== hash) {
		newhash = modmap.get((hash = newhash));
	}
	return hash;
}

export = get_latest_component;
