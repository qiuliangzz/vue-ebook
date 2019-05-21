<template>
  <div class="ebook-reader">
    <div id="read"></div>
    <!-- 蒙版 -->
    <div
      class="ebook-reader-mask"
      @click="onMaskClick"
      @touchmove="move"
      @touchend="moveEnd"
      @mousedown.left="onMouseEnter"
      @mousemove.left="onMouseMove"
      @mouseup.left="onMouseEnd"
    ></div>
  </div>
</template>

<script>
import { ebookMixin } from "../../utils/mixin";
import {
  getFontSize,
  saveFontSize,
  saveFontFamily,
  getFontFamily,
  getTheme,
  saveTheme,
  getLocation
} from "../../utils/localStorage";
import Epub from "epubjs";
import { addCss, flatten } from "../../utils/utils";

global.ePub = Epub;

export default {
  components: {},
  data() {
    // 这里存放数据
    return {};
  },
  // 混合
  mixins: [ebookMixin],
  watch: {},
  methods: {
    // 初始化电子书
    initEpub() {
      const url = `${process.env.VUE_APP_RES_URL}/epub/${this.fileName}.epub`;
      // 获取电子书book对象
      this.book = new Epub(url);
      this.setCurrentBook(this.book);
      // 渲染电子书
      this.initRendition();
      // 手势操作
      this.initGesture();
      // 分页功能
      this.book.ready
        .then(() => {
          return this.book.locations.generate(
            750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16)
          );
        })
        .then(locations => {
          this.setBookAvailable(true);
          this.refreshLocation();
        });
      //
      this.parseBook();
    },
    // 解析和渲染电子书
    initRendition() {
      // 解析和渲染  method: "default"是为了兼容微信
      this.rendition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
        method: "default"
      });
      const location = getLocation(this.fileName);
      this.display(location, () => {
        this.initFontSize();
        this.initFontFamily();
        this.initTheme();
        this.initGlobalStyle();
      });

      // 引入字体样式文件（只能是url）
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/cabin.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`
          )
        ]).then(() => {});
      });
    },

    // 初始化字号，离线缓存
    initFontSize() {
      let fontSize = getFontSize(this.fileName);
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize);
      } else {
        this.rendition.themes.fontSize(fontSize);
        this.setDefaultFontSize(fontSize);
      }
    },
    // 初始化字体，离线缓存
    initFontFamily() {
      let font = getFontFamily(this.fileName);
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily);
      } else {
        this.rendition.themes.font(font);
        this.setDefaultFontFamily(font);
      }
    },
    // 初始化主题
    initTheme() {
      let defaultTheme = getTheme(this.fileName);
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name;
        saveTheme(this.fileName, defaultTheme);
      }
      this.setDefaultTheme(defaultTheme);
      this.themeList.forEach(item => {
        this.rendition.themes.register(item.name, item.style);
      });
      // 选择默认样式
      this.rendition.themes.select(defaultTheme);
    },
    // 初始化手势操作
    initGesture() {
      this.rendition.on("touchstart", e => {
        this.touchStartX = e.changedTouches[0].clientX;
        this.touchStartTime = e.timeStamp;
      });
      this.rendition.on("touchend", e => {
        const offsetX = e.changedTouches[0].clientX - this.touchStartX;
        const time = e.timeStamp - this.touchStartTime;
        if (time < 500 && offsetX > 40) {
          // 从左往右，上一页
          this.prevPage();
        } else if (time < 500 && offsetX < -40) {
          // 从右往左,下一页
          this.nextPage();
        } else {
          // 显示头部标题
          this.toggleTitleAndMenu();
        }
        e.preventDefault();
        e.stopPropagation();
      });
    },
    // 点击事件
    onMaskClick(e) {
      if (this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) {
        return;
      }
      const offsetX = e.offsetX;
      const width = window.innerWidth;
      if (offsetX > 0 && offsetX < width * 0.3) {
        this.prevPage();
      } else if (offsetX > 0 && offsetX > width * 0.7) {
        this.nextPage();
      } else {
        this.toggleTitleAndMenu();
      }
    },
    // 手势操作
    move(e) {
      let offsetY = 0;
      if (this.firstOffsetY) {
        offsetY = e.changedTouches[0].clientY - this.firstOffsetY;
        this.setOffsetY(offsetY);
      } else {
        this.firstOffsetY = e.changedTouches[0].clientY;
      }
      e.preventDefault();
      e.stopPropagation();
    },
    moveEnd(e) {
      this.setOffsetY(0);
      this.firstOffsetY = null;
    },
    // 鼠标事件
    // 1- 鼠标进入
    // 2- 鼠标进入后的移动
    // 3- 鼠标从移动状态松手
    // 4- 鼠标还原
    onMouseEnter(e) {
      // 点击鼠标左键，鼠标进入
      this.mouseState = 1;
      this.mouseStartTime = e.timeStamp;
      e.preventDefault();
      e.stopPropagation();
    },
    onMouseMove(e) {
      // 鼠标移动
      if (this.mouseState === 1) {
        this.mouseState = 2;
      } else if (this.mouseState === 2) {
        let offsetY = 0;
        if (this.firstOffsetY) {
          offsetY = e.clientY - this.firstOffsetY;
          this.setOffsetY(offsetY);
        } else {
          this.firstOffsetY = e.clientY;
        }
      }
      e.preventDefault();
      e.stopPropagation();
    },
    onMouseEnd(e) {
      // 鼠标松开
      if (this.mouseState === 2) {
        this.setOffsetY(0);
        this.firstOffsetY = null;
        this.mouseState = 3;
      } else {
        this.mouseState = 4;
      }
      // 解决误点问题优化
      const time = e.timeStamp - this.mouseStartTime;
      if (time < 100) {
        this.mouseState = 4;
      }
      e.preventDefault();
      e.stopPropagation();
    },
    // 上一页
    prevPage() {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.refreshLocation();
        });
        this.hideTitleAndMenu();
      }
    },
    // 下一页
    nextPage() {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.refreshLocation();
        });
        this.hideTitleAndMenu();
      }
    },

    // 切换显示标题栏和底部栏
    toggleTitleAndMenu() {
      // this.$store.dispatch("setMenuVisible", !this.menuVisible);
      if (this.menuVisible) {
        this.setSettingVisible(-1);
      }
      this.setMenuVisible(!this.menuVisible);
      this.setFontFamilyVisible(false);
    },
    // 电子书基本信息
    parseBook() {
      // 获取电子书封面
      this.book.loaded.cover.then(cover => {
        this.book.archive.createUrl(cover).then(url => {
          this.setCover(url);
        });
      });
      // 获取标题、作者等信息
      this.book.loaded.metadata.then(metadata => {
        this.setMetadata(metadata);
      });
      // 获取目录 *难点
      this.book.loaded.navigation.then(nav => {
        const navItem = flatten(nav.toc);
        function find(item, level = 0) {
          return !item.parent
            ? level
            : find(
                navItem.filter(parentItem => parentItem.id === item.parent)[0],
                ++level
              );
        }
        navItem.forEach(item => {
          item.level = find(item);
        });
        this.setNavigation(navItem);
      });
    }
  },
  created() {},
  mounted() {
    // 获取动态路由参数 this.$route.params.x
    const fileName = this.$route.params.fileName.split("|").join("/");
    this.setFileName(fileName).then(() => {
      this.initEpub();
    });
  }
};
</script>
<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.ebook-reader {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .ebook-reader-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 150;
    width: 100%;
    height: 100%;
    background: transparent;
  }
}
</style>