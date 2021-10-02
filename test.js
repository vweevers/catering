'use strict'

const test = require('tape')
const catering = require('.')

test('fromCallback to callback with success', function (t) {
  t.plan(2)

  const callback = catering.fromCallback(function (err, res) {
    t.is(err, null)
    t.is(res, 'cake')
  })

  process.nextTick(callback, null, 'cake')
})

test('fromCallback to callback with error', function (t) {
  t.plan(2)

  const callback = catering.fromCallback(function (err, res) {
    t.is(err.message, 'mice')
    t.is(res, undefined)
  })

  process.nextTick(callback, new Error('mice'))
})

test('fromCallback to promise with success', function (t) {
  t.plan(1)

  const callback = catering.fromCallback()

  callback.promise.then(function (res) {
    t.is(res, 'cake')
  })

  process.nextTick(callback, null, 'cake')
})

test('fromCallback to promise with success, using a symbol', function (t) {
  t.plan(1)

  const kPromise = Symbol('promise')
  const callback = catering.fromCallback(undefined, kPromise)

  callback[kPromise].then(function (res) {
    t.is(res, 'cake')
  })

  process.nextTick(callback, null, 'cake')
})

test('fromCallback to promise with error', function (t) {
  t.plan(1)

  const callback = catering.fromCallback()

  callback.promise.catch(function (err) {
    t.is(err.message, 'mice')
  })

  process.nextTick(callback, new Error('mice'))
})

test('fromPromise to callback with success', function (t) {
  t.plan(2)

  const promise = Promise.resolve('cake')

  catering.fromPromise(promise, function (err, res) {
    t.is(err, null)
    t.is(res, 'cake')
  })
})

test('fromPromise to callback with error', function (t) {
  t.plan(2)

  const promise = Promise.reject(new Error('mice'))

  catering.fromPromise(promise, function (err, res) {
    t.is(err.message, 'mice')
    t.is(res, undefined)
  })
})

test('fromPromise to promise with success', function (t) {
  t.plan(2)

  const promise1 = Promise.resolve('cake')
  const promise2 = catering.fromPromise(promise1)

  t.ok(promise1 === promise2, 'returns input promise')

  promise2.then(function (res) {
    t.is(res, 'cake')
  })
})

test('fromPromise to promise with error', function (t) {
  t.plan(2)

  const promise1 = Promise.reject(new Error('mice'))
  const promise2 = catering.fromPromise(promise1)

  t.ok(promise1 === promise2, 'returns input promise')

  promise2.catch(function (err) {
    t.is(err.message, 'mice')
  })
})

test('fromCallback rejects callback if not a function', function (t) {
  t.plan(1)

  try {
    catering.fromCallback(null)
  } catch (err) {
    t.is(err.message, 'Callback must be a function')
  }
})
