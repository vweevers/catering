'use strict'

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
    .then(function (res) { process.nextTick(callback, null, res) })
    .catch(function (err) { process.nextTick(callback, err) })
}
