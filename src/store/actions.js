const actions = {
  setFileName: ({ commit }, fileName) => {
    return commit("SET_FILENAME", fileName); // 返回一个promise对象
  },
  setMenuVisible: ({ commit }, menuVisible) => {
    return commit("SET_MENUVISIBLE", menuVisible);
  },
  setSettingVisible: ({ commit }, settingVisible) => {
    return commit("SET_SETTINGVISIBLE", settingVisible);
  },
  setDefaultFontSize: ({ commit }, defaultFontSize) => {
    return commit("SET_DEFAULT_FONT_SIZE", defaultFontSize);
  },
  setDefaultFontFamily: ({ commit }, defaultFontFamily) => {
    return commit("SET_DEFAULT_FONT_FAMILY", defaultFontFamily);
  },
  setFontFamilyVisible: ({ commit }, fontFamilyVisible) => {
    return commit("SET_FONT_FAMILY_VISIBLE", fontFamilyVisible);
  },
  setCurrentBook: ({ commit }, currentBook) => {
    return commit("SET_CURRENT_BOOK", currentBook);
  },
  setDefaultTheme: ({ commit }, defaultTheme) => {
    return commit("SET_DEFAULT_THEME", defaultTheme);
  },
  setProgress: ({ commit }, progress) => {
    return commit("SET_PROGRESS", progress);
  },
  setBookAvailable: ({ commit }, bookAvailable) => {
    return commit("SET_BOOK_AVAILABLE", bookAvailable);
  },
  setSection: ({ commit }, section) => {
    return commit('SET_SECTION', section)
  },
  setCover: ({ commit }, cover) => {
    return commit('SET_COVER', cover)
  },
  setMetadata: ({ commit }, metadata) => {
    return commit('SET_METADATA', metadata)
  },
  setNavigation: ({ commit }, navigation) => {
    return commit('SET_NAVIGATION', navigation)
  },
  setOffsetY: ({ commit }, offsetY) => {
    return commit('SET_OFFSETY', offsetY)
  },
  setIsBookmark: ({ commit }, isBookmark) => {
    return commit('SET_IS_BOOKMARK', isBookmark)
  },
  setHotSearchOffsetY: ({ commit }, offsetY) => {
    return commit('SET_HOT_SEARCH_OFFSETY', offsetY)
  },
  setFlapCardVisible: ({ commit }, flapCardVisible) => {
    return commit('SET_FLAP_CARD_VISIBLE', flapCardVisible)
  },
  setIsEditMode({ commit }, isEditMode) {
    return commit('SET_IS_EDIT_MODE', isEditMode)
  },
  setShelfList({ commit }, shelfList) {
    return commit('SET_SHELF_LIST', shelfList)
  },
  setShelfSelected({ commit }, shelfSelected) {
    return commit('SET_SHELF_SELECTED', shelfSelected)
  },
  setShelfTitleVisible({ commit }, shelfTitleVisible) {
    return commit('SET_SHELF_TITLE_VISIBLE', shelfTitleVisible)
  }
};
export default actions;
