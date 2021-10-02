'use strict'

var queueTick = require('queue-tick')

exports.fromCallback = function (callback) {
  if (callback === undefined) {
    var promise = new Promise(function (resolve, reject) {
      callback = function (err, res) {
        if (err) reject(err)
        else resolve(res)
      }
    })

    callback.promise = promise
  }

  return callback
}

exports.fromPromise = function (promise, callback) {
  if (callback === undefined) return promise

  promise
    .then(function (res) { queueTick(() => callback(null, res)) })
    .catch(function (err) { queueTick(() => callback(err)) })
}
