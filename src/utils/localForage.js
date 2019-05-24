/* eslint-disable */
// localforage的逻辑是这样的：优先使用IndexedDB存储数据，如果浏览器不支持，使用WebSQL，浏览器再不支持，使用localStorage
// 采用异步操作
import localForage from 'localforage'

// 存储
export function setLocalForage(key, data, cb, cb2) {
  localForage.setItem(key, data).then((value) => {
    if (cb) cb(value)
  }).catch(function(err) {
    if (cb2) cb2(err)
  })
}

// 获取
export function getLocalForage(key, cb) {
  localForage.getItem(key, (err, value) => {
    cb(err, value)
  })
}

// 清除
export function removeLocalForage(key, cb, cb2) {
  localForage.removeItem(key).then(function() {
    if(cb) cb()
  }).catch(function(err) {
    if(cb2) cb2(err)
  })
}

// 清除全部
export function clearLocalForage(cb, cb2) {
  localForage.clear().then(function() {
    if (cb) cb()
  }).catch(function(err) {
    if (cb2) cb2(err)
  })
}

// 获取localForage中一共多少个key
export function lengthLocalForage(cb) {
  localForage.length().then(
    numberOfKeys => {
      if (cb) cb(numberOfKeys)
      console.log(numberOfKeys)
    }).catch(function(err) {
    console.log(err)
  })
}

// 获取localForage中一共多少个元素
export function iteratorLocalForage() {
  localForage.iterate(function(value, key, iterationNumber) {
    console.log([key, value])
  }).then(function() {
    console.log('Iteration has completed')
  }).catch(function(err) {
    console.log(err)
  })
}

// 判断当前浏览器是否支持indexedDB数据库
export function support() {
  const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || null
  if (indexedDB) {
    return true
  } else {
    return false
  }
}
