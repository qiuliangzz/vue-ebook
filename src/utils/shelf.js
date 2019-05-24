// 增加数据
export function appendAddToShelf(list) {
  list.push({
    id: -1,
    type: 3
  })
  return list
}

export function RemoveAddFromShelf(list) {
  return list.filter(item => item.type !== 3)
}

export function gotoStoreHome(vue) {
  vue.$router.push({
    path: '/store/home'
  })
}