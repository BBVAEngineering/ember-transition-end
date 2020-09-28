/* eslint no-magic-numbers:0 */

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import onTransitionEnd from 'ember-transition-end/utils/on-transition-end';
import { spy } from 'sinon';

function createElement() {
	const element = document.createElement('div');

	element.classList.add('transition-element-test');
	element.style.backgroundColor = 'white';
	element.style.opacity = '1';
	element.style.width = '200px';
	element.style.height = '200px';

	return element;
}

function appendRoot(element) {
	document.getElementById('ember-testing').appendChild(element);
}

module('Unit | Utils | on-transition-end', (hooks) => {
	setupTest(hooks);

	hooks.afterEach(() => {
		document.querySelectorAll('.transition-element-test').forEach((el) => el.remove());
	});

	test('it waits for any element transition', (assert) => {
		const done = assert.async();
		const element = createElement();
		const fn = spy();

		appendRoot(element);

		element.style.transition = 'background-color 50ms linear 0s';

		onTransitionEnd(element, fn, { transitionProperty: 'background-color' });

		const step3 = () => {
			assert.ok(fn.calledTwice, 'fn is called twice');
			done();
		};
		const step2 = () => {
			assert.ok(fn.calledOnce, 'fn is called once');
			element.style.backgroundColor = 'green';
			setTimeout(step3, 100);
		};
		const step1 = () => {
			element.style.backgroundColor = 'red';
			setTimeout(step2, 100);
		};

		setTimeout(step1, 16);
	});

	test('it waits for any element transition once', (assert) => {
		const done = assert.async();
		const element = createElement();
		const fn = spy();

		appendRoot(element);

		element.style.transition = 'background-color 50ms linear 0s';

		onTransitionEnd(element, fn, { transitionProperty: 'background-color', once: true });

		const step3 = () => {
			assert.ok(fn.calledOnce, 'fn is still called once');
			done();
		};
		const step2 = () => {
			assert.ok(fn.calledOnce, 'fn is called once');
			element.style.backgroundColor = 'green';
			setTimeout(step3, 100);
		};
		const step1 = () => {
			element.style.backgroundColor = 'red';
			setTimeout(step2, 100);
		};

		setTimeout(step1, 16);
	});

	test('it waits for selected element transition', (assert) => {
		const done = assert.async();
		const element = createElement();
		const fn = spy();
		const fnNo = spy();

		appendRoot(element);

		element.style.transition = 'all 50ms linear 0s';

		onTransitionEnd(element, fnNo, { transitionProperty: 'opacity' });
		onTransitionEnd(element, fn, { transitionProperty: 'background-color' });

		const step2 = () => {
			assert.ok(fn.calledOnce, 'fn is called once');
			assert.ok(fnNo.notCalled, 'fnNo is not called');
			done();
		};
		const step1 = () => {
			element.style.backgroundColor = 'red';
			setTimeout(step2, 200);
		};

		setTimeout(step1, 16);
	});

	test('it waits for any element transition', (assert) => {
		const done = assert.async();
		const element = createElement();
		const fn = spy();

		appendRoot(element);

		element.style.transition = 'all 50ms linear 0s';

		onTransitionEnd(element, fn);

		const step2 = () => {
			assert.ok(fn.calledOnce, 'fn is called once');
			done();
		};
		const step1 = () => {
			element.style.opacity = 0;
			setTimeout(step2, 200);
		};

		setTimeout(step1, 16);
	});

	test('it listens for nested transitions', (assert) => {
		const done = assert.async();
		const element = document.createElement('div');
		const nested = createElement();
		const fn = spy();

		element.appendChild(nested);
		appendRoot(element);

		nested.style.transition = 'all 50ms linear 0s';

		onTransitionEnd(element, fn);

		const step2 = () => {
			assert.ok(fn.calledOnce, 'fn is called once');
			done();
		};
		const step1 = () => {
			nested.style.opacity = 0;
			setTimeout(step2, 200);
		};

		setTimeout(step1, 16);
	});

	test('it only listens for direct transitions', (assert) => {
		const done = assert.async();
		const element = createElement();
		const fn = spy();

		appendRoot(element);

		element.style.transition = 'all 50ms linear 0s';

		onTransitionEnd(element, fn, { onlyTarget: true });

		const step2 = () => {
			assert.ok(fn.calledOnce, 'fn is called once');
			done();
		};
		const step1 = () => {
			element.style.opacity = 0;
			setTimeout(step2, 200);
		};

		setTimeout(step1, 16);
	});

	test('it does not listen for nested transitions', (assert) => {
		const done = assert.async();
		const element = document.createElement('div');
		const nested = createElement();
		const fn = spy();

		element.appendChild(nested);
		appendRoot(element);

		nested.style.transition = 'all 50ms linear 0s';

		onTransitionEnd(element, fn, { onlyTarget: true });

		const step2 = () => {
			assert.ok(fn.notCalled, 'fn is not called');
			done();
		};
		const step1 = () => {
			nested.style.opacity = 0;
			setTimeout(step2, 200);
		};

		setTimeout(step1, 16);
	});

	test('it returns a remove listener function', (assert) => {
		const done = assert.async();
		const element = createElement();
		const fn = spy();

		appendRoot(element);

		element.style.transition = 'all 50ms linear 0s';

		const removeEventListener = onTransitionEnd(element, fn);

		const step2 = () => {
			assert.ok(fn.notCalled, 'fn is not called');
			done();
		};
		const step1 = () => {
			element.style.opacity = 0;
			setTimeout(step2, 200);
		};

		removeEventListener();

		setTimeout(step1, 16);
	});
});
