import { mapGetters, mapActions } from 'vuex'
import { themeList } from './book';
import { addCss, removeAllCss, getReadTimeByMinute } from './utils';
import { saveLocation } from './localStorage';

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
        "navigation"
      ]
    ),
    themeList() {
      return themeList(this)
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
        "setNavigation"
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
      }
    },
    // 展示电子书内部
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