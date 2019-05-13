// import { realPx } from '../../utils/utils';
const book = {
  state: {
    fileName: '', // 文件名
    menuVisible: false, // 默认不显示头部底部栏
    settingVisible: -1, // -1:（默认）不显示设置栏  0:字号设置  1:主题设置  2:进度条设置  3:目录设置
    defaultFontSize: 16, // 默认字体大小
    defaultFontFamily: 'Default', // 默认字体
    fontFamilyVisible: false,
    currentBook: null, // 当前文章
    defaultTheme: 'Default', // 当前主题
    progress: 0, // 当前进度
    bookAvailable: false, // 图书展示完毕,分页完成
    section: 0, // 当前章节的位置  0：第一章节
    cover: null, // 电子书图片路径
    metadata: null, // 电子书标题作者信息
    navigation: null, // 电子书目录
    // isPaginating: true,
    // paginate: '',
    // pagelist: null,
    offsetY: 0, // 书签功能，Y轴偏移量
    isBookmark: null // 当前页是否为书签页
    // speakingIconBottom: realPx(58)
  },
  mutations: {
    'SET_FILENAME': (state, fileName) => {
      state.fileName = fileName
    },
    'SET_MENUVISIBLE': (state, menuVisible) => {
      state.menuVisible = menuVisible
    },
    'SET_SETTINGVISIBLE': (state, settingVisible) => {
      state.settingVisible = settingVisible
    },
    'SET_DEFAULT_FONT_SIZE': (state, defaultFontSize) => {
      state.defaultFontSize = defaultFontSize
    },
    'SET_DEFAULT_FONT_FAMILY': (state, font) => {
      state.defaultFontFamily = font
    },
    'SET_FONT_FAMILY_VISIBLE': (state, visible) => {
      state.fontFamilyVisible = visible
    },
    'SET_CURRENT_BOOK': (state, currentBook) => {
      state.currentBook = currentBook
    },
    'SET_DEFAULT_THEME': (state, theme) => {
      state.defaultTheme = theme
    },
    'SET_PROGRESS': (state, progress) => {
      state.progress = progress
    },
    'SET_BOOK_AVAILABLE': (state, bookAvailable) => {
      state.bookAvailable = bookAvailable
    },
    'SET_SECTION': (state, section) => {
      state.section = section
    },
    // 'SET_IS_PAGINATING': (state, isPaginating) => {
    //   state.isPaginating = isPaginating
    // },
    'SET_NAVIGATION': (state, navigation) => {
      state.navigation = navigation
    },
    'SET_COVER': (state, cover) => {
      state.cover = cover
    },
    'SET_METADATA': (state, metadata) => {
      state.metadata = metadata
    },
    // 'SET_PAGINATE': (state, paginate) => {
    //   state.paginate = paginate
    // },
    // 'SET_PAGELIST': (state, pagelist) => {
    //   state.pagelist = pagelist
    // },
    'SET_OFFSETY': (state, offsetY) => {
      state.offsetY = offsetY
    },
    'SET_IS_BOOKMARK': (state, isBookmark) => {
      state.isBookmark = isBookmark
    }
    // 'SET_SPEAKING_ICON_BOTTOM': (state, speakingIconBottom) => {
    //   state.speakingIconBottom = speakingIconBottom
    // }
  }
};
export default book;
