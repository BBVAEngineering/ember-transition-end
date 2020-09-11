import { run } from '@ember/runloop';

const eventNames = {
	transition:       'transitionend',
	MozTransition:    'transitionend',
	OTransition:      'oTransitionEnd',
	WebkitTransition: 'webkitTransitionEnd',
	msTransition:     'MSTransitionEnd'
};

/**
 * Find transition-end event name on current browser.
 *
 * @method findTransitionEventName
 * @return Boolean
 * @private
 */
function findTransitionEventName() {
	const div = document.createElement('div');
	const key = Object.keys(eventNames).find((eventName) => eventName in div.style);

	return eventNames[key];
}

const transitionEndEventName = findTransitionEventName();

/**
 * Subscribes a callback to a transition-end event by transition property on a given element.
 *
 * @method onTransitionEnd
 * @param {Element} element
 * @param {Function} callback
 * @param {Object} options
 */
export default function onTransitionEnd(element, callback, options = {}) {
	const { transitionProperty = 'all', once = false, onlyTarget = false } = options;

	const fn = (e) => {
		const { propertyName, type, target } = e;

		if (onlyTarget && target !== element) {
			return;
		}

		if (transitionProperty !== 'all' && propertyName !== transitionProperty) {
			return;
		}

		if (once) {
			element.removeEventListener(type, fn, true);
		}

		run(null, callback, e);
	};

	element.addEventListener(transitionEndEventName, fn, true);
}
