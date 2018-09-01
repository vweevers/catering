'use strict'

exports.array = function catering (callback) {
  if (callback === undefined) {
    var promise = new Promise(function (resolve, reject) {
      callback = function (err, value) {
        if (err) reject(err)
        else resolve(value)
      }
    })
  }

  return [callback, promise]
}

exports.object = function catering (callback) {
  if (callback === undefined) {
    var promise = new Promise(function (resolve, reject) {
      callback = function (err, value) {
        if (err) reject(err)
        else resolve(value)
      }
    })
  }

  return { callback, promise }
}

exports.attach = function catering (callback) {
  if (callback === undefined) {
    const promise = new Promise(function (resolve, reject) {
      callback = function (err, value) {
        if (err) reject(err)
        else resolve(value)
      }
    })

    callback.promise = promise
  }

  return callback
}
