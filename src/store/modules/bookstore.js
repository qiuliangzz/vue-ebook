const bookstore = {
  state: {
    hotSearchOffsetY: 0, // 热门搜索Y轴偏移量
    flapCardVisible: false // 翻转盒子是否显示
  },
  mutations: {
    'SET_HOT_SEARCH_OFFSETY': (state, offsetY) => {
      state.hotSearchOffsetY = offsetY
    },
    'SET_FLAP_CARD_VISIBLE': (state, flapCardVisible) => {
      state.flapCardVisible = flapCardVisible
    }
  }
}

export default bookstore;