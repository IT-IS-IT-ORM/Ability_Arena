export default function getScreenHeight() {
	// Check if it is a mobile device
	// 1. Mobile browser DOM elements have the tontouchstart attribute, desktop devices do not have this attribute
	// 2. Detects screen orientation, mobile devices can change the orientation (landscape or portrait), desktop devices can't
	if (
		'ontouchstart' in document.documentElement &&
		typeof window.orientation !== 'undefined'
	) {
		return document.documentElement?.clientHeight || window.innerHeight;
	}
}
