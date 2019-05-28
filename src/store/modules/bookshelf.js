const bookshelf = {
  state: {
    isEditMode: false, // 是否进入编辑模式
    shelfList: [], // 书架图书列表
    shelfSelected: [], // 书架图书选中的列表
    shelfTitleVisible: true, // 书架标题的显示状态
    shelfCategory: [], // 书架分类列表
    currentType: 1 // 当前状态，书架图书列表：1，书架分类列表：2
  },
  mutations: {
    'SET_IS_EDIT_MODE': (state, isEditMode) => {
      state.isEditMode = isEditMode
    },
    'SET_SHELF_LIST': (state, shelfList) => {
      state.shelfList = shelfList
    },
    'SET_SHELF_SELECTED': (state, shelfSelected) => {
      state.shelfSelected = shelfSelected
    },
    'SET_SHELF_TITLE_VISIBLE': (state, shelfTitleVisible) => {
      state.shelfTitleVisible = shelfTitleVisible
    },
    'SET_SHELF_CATEGORY': (state, shelfCategory) => {
      state.shelfCategory = shelfCategory
    },
    'SET_CURRENT_TYPE': (state, currentType) => {
      state.currentType = currentType
    }
  }
}

export default bookshelf;