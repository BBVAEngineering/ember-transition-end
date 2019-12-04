# cross-transition-end

[![Build Status](https://travis-ci.com/BBVAEngineering/cross-tansition-shake.svg?branch=master)](https://travis-ci.com/BBVAEngineering/cross-tansition-shake)
[![GitHub version](https://badge.fury.io/gh/BBVAEngineering%2Fcross-tansition-shake.svg)](https://badge.fury.io/gh/BBVAEngineering%2Fcross-tansition-shake)
[![NPM version](https://badge.fury.io/js/cross-tansition-shake.svg)](https://badge.fury.io/js/cross-tansition-shake)
[![Dependency Status](https://david-dm.org/BBVAEngineering/cross-tansition-shake.svg)](https://david-dm.org/BBVAEngineering/cross-tansition-shake)
[![codecov](https://codecov.io/gh/BBVAEngineering/cross-tansition-shake/branch/master/graph/badge.svg)](https://codecov.io/gh/BBVAEngineering/cross-tansition-shake)
[![Greenkeeper badge](https://badges.greenkeeper.io/BBVAEngineering/cross-tansition-shake.svg)](https://greenkeeper.io/)

## Information

[![NPM](https://nodei.co/npm/cross-tansition-shake.png?downloads=true&downloadRank=true)](https://nodei.co/npm/cross-tansition-shake/)

Cross-browser transtionend event listener

## Installation

```
npm install cross-transition-end
```

## Usage

```js
import crossTransitionEnd from 'cross-transition-end';

const element = document.querySelector('#foo');

onTransitionEnd(element, () => {
    // Do something...
}, 'all', true);
```

## Arguments

Ordered by position:

### 1º `element`

type: `HTMLElement`

The target element to listen when the animation ends.

### 2º `callback`

type: `Function`

The callback executed each time the animation ends.

### 3º `transition`

type: `String`
default: `all`

CSS transition value.

### 4º `once`

type: `Boolean`
default: `false`

Use `true` when the listener should be triggered once.

## Contribute

If you want to contribute to this addon, please read the [CONTRIBUTING.md](CONTRIBUTING.md).

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/BBVAEngineering/cross-tansition-shake/tags).

## Authors

See the list of [contributors](https://github.com/BBVAEngineering/cross-tansition-shake/graphs/contributors) who participated in this project.

## License

This project is licensed under the [MIT License](LICENSE.md).
