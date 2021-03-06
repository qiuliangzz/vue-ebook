import Storage from 'web-storage-cache';
const localStorage = new Storage();

export function setLocalStorage(key, value) {
  return localStorage.set(key, value)
}

export function getLocalStorage(key) {
  return localStorage.get(key)
}

export function removeLocalStorage(key) {
  return localStorage.delete(key)
}

export function clearLocalStorage() {
  return localStorage.clear()
}

export function setBookObject(fileName, key, value) {
  let book = getLocalStorage(`${fileName}-info`)
  if (!book) {
    book = {}
  }
  book[key] = value
  setLocalStorage(`${fileName}-info`, book)
}

export function getBookObject(fileName, key) {
  let book = getLocalStorage(`${fileName}-info`)
  if (book) {
    return book[key]
  } else {
    return null
  }
}

// 获取、保存字号
export function getFontSize(fileName) {
  return getBookObject(fileName, 'fontSize')
}
export function saveFontSize(fileName, fontSize) {
  return setBookObject(fileName, 'fontSize', fontSize)
}

// 获取、保存字体
export function getFontFamily(fileName) {
  return getBookObject(fileName, 'fontFamily')
}
export function saveFontFamily(fileName, font) {
  return setBookObject(fileName, 'fontFamily', font)
}

// 获取、保存国际化
export function getLocale() {
  return getLocalStorage('locale')
}
export function saveLocale(locale) {
  return setLocalStorage('locale', locale)
}

// 获取、保存主题
export function getTheme(fileName) {
  return getBookObject(fileName, 'theme')
}
export function saveTheme(fileName, theme) {
  setBookObject(fileName, 'theme', theme)
}

// 获取、保存当前电子书的阅读位置
export function getLocation(fileName) {
  return getBookObject(fileName, 'location')
}
export function saveLocation(fileName, location) {
  setBookObject(fileName, 'location', location)
}

// 获取、保存阅读时间
export function getReadTime(fileName) {
  return getBookObject(fileName, 'time')
}
export function saveReadTime(fileName, theme) {
  setBookObject(fileName, 'time', theme)
}

// 获取、保存书签
export function getBookmark(fileName) {
  return getBookObject(fileName, 'bookmark')
}

export function saveBookmark(fileName, bookmark) {
  setBookObject(fileName, 'bookmark', bookmark)
}

// 获取、保存书架
export function getShelf() {
  return getLocalStorage('shelf')
}

export function saveShelf(shelf) {
  return setLocalStorage('shelf', shelf)
}
