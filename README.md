# ember-transition-end

[![Build Status](https://travis-ci.com/BBVAEngineering/ember-transition-end.svg?branch=master)](https://travis-ci.com/BBVAEngineering/ember-transition-end)
[![GitHub version](https://badge.fury.io/gh/BBVAEngineering%2Fember-transition-end.svg)](https://badge.fury.io/gh/BBVAEngineering%2Fember-transition-end)
[![NPM version](https://badge.fury.io/js/ember-transition-end.svg)](https://badge.fury.io/js/ember-transition-end)
[![Dependency Status](https://david-dm.org/BBVAEngineering/ember-transition-end.svg)](https://david-dm.org/BBVAEngineering/ember-transition-end)
[![codecov](https://codecov.io/gh/BBVAEngineering/ember-transition-end/branch/master/graph/badge.svg)](https://codecov.io/gh/BBVAEngineering/ember-transition-end)

## Information

[![NPM](https://nodei.co/npm/ember-transition-end.png?downloads=true&downloadRank=true)](https://nodei.co/npm/ember-transition-end/)

Cross-browser transtionend event listener for Ember apps.

## Installation

```
npm install ember-transition-end
```

## Usage

```js
import onTransitionEnd from 'ember-transition-end/utils/on-transition-end';

const element = document.querySelector('#foo');

onTransitionEnd(element, () => {
    // Do something...
}, { transitionProperty: 'all', once: true });
```

## Arguments

Ordered by position:

1. `element`

type: `HTMLElement`

The target element to listen when the animation ends.

2. `callback`

type: `Function`

The callback executed each time the animation ends.

3. `options`

type: `Object`

List of options to configure listener:

|       Property       |    Type   | Default | Description                                    |
|:--------------------:|:---------:|---------|------------------------------------------------|
| `transitionProperty` |  `String` | `all`   | CSS Transition Property.                       |
|        `once`        | `Boolean` | `false` | Trigger listener only once.                    |
|     `onlyTarget`     | `Boolean` | `false` | Only listen for transitions on target element. |

## Return value

It returns a `removeEventListener` callback to be used to remove event listener.

```
import onTransitionEnd from 'ember-transition-end/utils/on-transition-end';

const element = document.querySelector('#foo');

const removeEventListener = onTransitionEnd(element, () => {
    // Do something...
});

// remove event listener
removeEventListener();
```

## Contribute

If you want to contribute to this addon, please read the [CONTRIBUTING.md](CONTRIBUTING.md).

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/BBVAEngineering/ember-transition-end/tags).

## Authors

See the list of [contributors](https://github.com/BBVAEngineering/ember-transition-end/graphs/contributors) who participated in this project.

## License

This project is licensed under the [MIT License](LICENSE.md).
