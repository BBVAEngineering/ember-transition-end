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

	document.getElementById('ember-testing').appendChild(element);

	return element;
}

module('Unit | Route | on-transition-end', (hooks) => {
	setupTest(hooks);

	hooks.afterEach(() => {
		document.querySelectorAll('.transition-element-test').forEach((el) => el.remove());
	});

	test('it waits for any element transition', (assert) => {
		const done = assert.async();
		const element = createElement();
		const fn = spy();

		element.style.transition = 'background-color 50ms linear 0s';

		onTransitionEnd(element, fn, 'background-color');

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

		element.style.transition = 'background-color 50ms linear 0s';

		onTransitionEnd(element, fn, 'background-color', true);

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

		element.style.transition = 'all 50ms linear 0s';

		onTransitionEnd(element, fnNo, 'opacity');
		onTransitionEnd(element, fn, 'background-color');

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
});
