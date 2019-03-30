# catering

> **Cater to callback and promise crowds.**  
> Internally use callbacks, because you an old-school chef.

[![npm status](http://img.shields.io/npm/v/catering.svg)](https://www.npmjs.org/package/catering)
[![node](https://img.shields.io/node/v/catering.svg)](https://www.npmjs.org/package/catering)
[![Travis build status](https://img.shields.io/travis/vweevers/catering.svg?label=travis)](http://travis-ci.org/vweevers/catering)
[![AppVeyor build status](https://img.shields.io/appveyor/ci/vweevers/catering.svg?label=appveyor)](https://ci.appveyor.com/project/vweevers/catering)
[![Dependency status](https://img.shields.io/david/vweevers/catering.svg)](https://david-dm.org/vweevers/catering)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Greenkeeper badge](https://badges.greenkeeper.io/vweevers/catering.svg)](https://greenkeeper.io/)

## Menu

```js
const catering = require('catering').array

module.exports = function (maybeCallback) {
  const [callback, promise] = catering(maybeCallback)
  fs.readFile('example', callback)
  return promise
}
```

```js
const catering = require('catering').object

module.exports = function (maybeCallback) {
  const { callback, promise } = catering(maybeCallback)
  fs.readFile('example', callback)
  return promise
}
```

```js
const catering = require('catering').attach

module.exports = function (maybeCallback) {
  const callback = catering(maybeCallback)
  fs.readFile('example', callback)
  return callback.promise
}
```

## Consume

```js
// Don't force promises on people.
example((err, result) => ..)

// Don't force callbacks on people.
const result = await example()

// Enjoy.
example.then(result => ..)
```

## Install

With [npm](https://npmjs.org) do:

```
npm install catering
```

## License

[MIT](LICENSE) © 2018-present Vincent Weevers. Originally extracted from [`levelup`](https://github.com/Level/levelup/blob/37e0270c8c29d5086904e29e247e918dddcce6e2/lib/promisify.js).
