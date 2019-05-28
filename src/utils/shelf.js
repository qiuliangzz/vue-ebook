// 增加数据
export function appendAddToShelf(list) {
  list.push({
    id: -1,
    type: 3
  })
  return list
}

export function removeAddFromShelf(list) {
  return list.filter(item => item.type !== 3)
}

export function gotoStoreHome(vue) {
  vue.$router.push({
    path: '/store/home'
  })
}

// 重新计算Id
export function computeId(list) {
  return list.map((book, index) => {
    if (book.type !== 3) {
      book.id = index + 1
      if (book.itemList) {
        book.itemList = computeId(book.itemList)
      }
    }
    return book
  })
}