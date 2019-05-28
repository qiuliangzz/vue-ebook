import { mapGetters, mapActions } from 'vuex'
import { themeList } from './book';
import { addCss, removeAllCss, getReadTimeByMinute } from './utils';
import { saveLocation, getBookmark, getShelf, saveShelf } from './localStorage';
import { appendAddToShelf } from "./shelf";
import { shelf } from "../api";
export const ebookMixin = {
  // 计算属性，方法等
  computed: {
    ...mapGetters(
      [
        "fileName",
        "menuVisible",
        "settingVisible",
        "defaultFontSize",
        "defaultFontFamily",
        "fontFamilyVisible",
        "currentBook",
        "defaultTheme",
        "progress",
        "bookAvailable",
        "section",
        "cover",
        "metadata",
        "navigation",
        "offsetY",
        "isBookmark"
      ]
    ),
    themeList() {
      return themeList(this)
    },
    // 获取章节名称
    getSectionName() {
      return this.section ? this.navigation[this.section].label : ''
    }
  },
  methods: {
    ...mapActions(
      [
        "setFileName",
        "setMenuVisible",
        "setSettingVisible",
        "setDefaultFontSize",
        "setDefaultFontFamily",
        "setFontFamilyVisible",
        "setCurrentBook",
        "setDefaultTheme",
        "setProgress",
        "setBookAvailable",
        "setSection",
        "setCover",
        "setMetadata",
        "setNavigation",
        "setOffsetY",
        "setIsBookmark"
      ]
    ),
    // 隐藏标题栏和底部栏
    hideTitleAndMenu() {
      this.setMenuVisible(false);
      this.setSettingVisible(-1);
      this.setFontFamilyVisible(false);
    },
    // 初始化全局主题
    initGlobalStyle() {
      // 先清除之前所有全局主题
      removeAllCss();
      switch (this.defaultTheme) {
        case "Default":
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`);
          break;
        case "Eye":
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`);
          break;
        case "Gold":
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`);
          break;
        case "Night":
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`);
          break;
        default:
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`);
          break;
      }
    },
    // 刷新当前电子书阅读位置
    refreshLocation() {
      const currentLocation = this.currentBook.rendition.currentLocation();
      if (currentLocation && currentLocation.start) {
        const startCfi = currentLocation.start.cfi;
        const progress = this.currentBook.locations.percentageFromCfi(startCfi);
        this.setProgress(Math.floor(progress * 100));
        this.setSection(currentLocation.start.index)
        saveLocation(this.fileName, startCfi);
        const bookmark = getBookmark(this.fileName)
        if (bookmark) {
          if (bookmark.some(item => item.cfi === startCfi)) {
            this.setIsBookmark(true);
          } else {
            this.setIsBookmark(false);
          }
        } else {
          this.setIsBookmark(false);
        }
      }
    },
    // 展示电子书内部，渲染目标页面
    display(target, cb) {
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.refreshLocation()
          if (cb) cb()
        });
      } else {
        this.currentBook.rendition.display().then(() => {
          this.refreshLocation()
          if (cb) cb()
        });
      }
    },
    // 当前阅读时间文本
    getReadTimeText() {
      return this.$t("book.haveRead").replace("$1", getReadTimeByMinute(this.fileName));
    }
  }
}

export const storeHomeMixin = {
  computed: {
    ...mapGetters([
      'offsetY',
      'hotSearchOffsetY',
      'flapCardVisible'
    ])
  },
  methods: {
    ...mapActions([
      'setOffsetY',
      'setHotSearchOffsetY',
      'setFlapCardVisible'
    ]),
    // 跳转图书详情页
    showBookDetail(book) {
      this.$router.push({
        path: '/store/detail',
        query: {
          fileName: book.fileName,
          category: book.categoryText
        }
      })
    }
  }
}

export const shelfMixin = {
  computed: {
    ...mapGetters([
      'isEditMode',
      'shelfList',
      'shelfSelected',
      'shelfTitleVisible',
      'offsetY',
      'shelfCategory',
      'currentType'
    ])
  },
  methods: {
    ...mapActions([
      'setIsEditMode',
      'setShelfList',
      'setShelfSelected',
      'setShelfTitleVisible',
      'setOffsetY',
      'setShelfCategory',
      'setCurrentType'
    ]),
    // 获取图书列表数据
    getShelfList() {
      let shelfList = getShelf();
      if (!shelfList) {
        shelf().then(response => {
          if (
            response.status === 200 &&
            response.data &&
            response.data.bookList
          ) {
            const { data } = response;
            shelfList = appendAddToShelf(data.bookList);
            saveShelf(shelfList);
            return this.setShelfList(shelfList);
          }
        });
      } else {
        return this.setShelfList(shelfList);
      }
    },
    // 获取分类列表数据
    getCategoryList(title) {
      this.getShelfList().then(() => {
        const categoryList = this.shelfList.filter(book =>
          book.type === 2 && book.title === title
        )[0]
        this.setShelfCategory(categoryList)
      })
    },
    // 跳转图书详情页
    showBookDetail(book) {
      this.$router.push({
        path: '/store/detail',
        query: {
          fileName: book.fileName,
          category: book.categoryText
        }
      })
    }
  }
}