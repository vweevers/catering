'use strict'

const test = require('tape')
const catering = require('.')

const variants = [
  function (error, result, maybeCallback) {
    const [callback, promise] = catering.array(maybeCallback)
    process.nextTick(callback, error, result)
    return promise
  },

  function (error, result, maybeCallback) {
    const { callback, promise } = catering.object(maybeCallback)
    process.nextTick(callback, error, result)
    return promise
  },

  function (error, result, maybeCallback) {
    const callback = catering.attach(maybeCallback)
    process.nextTick(callback, error, result)
    return callback.promise
  }
]

test('success with callback', function (t) {
  t.plan(variants.length * 2)

  for (const variant of variants) {
    variant(null, 'cake', (err, result) => {
      t.is(err, null)
      t.is(result, 'cake')
    })
  }
})

test('error with callback', function (t) {
  t.plan(variants.length)

  for (const variant of variants) {
    variant(new Error('mice'), null, (err) => {
      t.is(err.message, 'mice')
    })
  }
})

test('success with promise', function (t) {
  t.plan(variants.length)

  for (const variant of variants) {
    variant(null, 'cake').then(result => {
      t.is(result, 'cake')
    })
  }
})

test('error with promise', function (t) {
  t.plan(variants.length)

  for (const variant of variants) {
    variant(new Error('mice'), null).catch(err => {
      t.is(err.message, 'mice')
    })
  }
})
