<!-- 书签组件 -->
<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper" ref="iconDown">
        <span class="icon-down"></span>
      </div>
      <div class="ebook-bookmark-text">{{text}}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper" :style="isFixed ? fixedStyle : {}">
      <Bookmark :color="color" :width="15" :height="35"></Bookmark>
    </div>
  </div>
</template>

<script>
import Bookmark from "../common/Bookmark";
import { realPx } from "../../utils/utils";
import { ebookMixin } from "../../utils/mixin";
import { setTimeout } from "timers";
import { getBookmark, saveBookmark } from "../../utils/localStorage";
const BLUE = "#346cbc";
const WHITE = "#fff";
export default {
  components: {
    Bookmark
  },
  data() {
    return {
      text: this.$t("book.pulldownAddMark"),
      color: WHITE,
      isFixed: false // 书签图标是否定位
    };
  },
  mixins: [ebookMixin],
  computed: {
    height() {
      return realPx(35);
    },
    // 临界值
    threshold() {
      return realPx(55);
    },
    fixedStyle() {
      return {
        position: "fixed",
        top: "0",
        right: `${(Window.innerWidth - this.$refs.bookmark.clientWidth) / 2}px`
      };
    }
  },
  watch: {
    // 下拉状态管理
    offsetY(v) {
      if (!this.bookAvailable || this.menuVisible || this.settingVisible >= 0) {
        return;
      }
      if (v >= this.height && v < this.threshold) {
        this.beforeThreshold(v);
      } else if (v >= this.threshold) {
        this.afterThreshold(v);
      } else if (v > 0 && v < this.height) {
        this.beforeHeight();
      } else if (v === 0) {
        // 归为操作
        this.restore();
      }
    },
    isBookmark(isBookmark) {
      this.isFixed = isBookmark;
      if (isBookmark) {
        this.color = BLUE;
      } else {
        this.color = WHITE;
      }
    }
  },
  methods: {
    // 状态1：未超过书签高度
    beforeHeight() {
      // 定义书签颜色与文本
      if (this.isBookmark) {
        this.text = this.$t("book.pulldownDeleteMark");
        this.color = BLUE;
        this.isFixed = true;
      } else {
        this.text = this.$t("book.pulldownAddMark");
        this.color = WHITE;
        this.isFixed = false;
      }
    },
    // 状态2：未到达临界状态
    beforeThreshold(v) {
      // 吸顶效果
      this.$refs.bookmark.style.top = `${-v}px`;
      // 判断当前页是否为书签页
      this.beforeHeight();
      // 箭头旋转
      const iconDown = this.$refs.iconDown;
      if (iconDown.style.transform === "rotate(180deg)") {
        iconDown.style.transform = "rotate(0deg)";
      }
    },
    // 状态3：超过达临界状态
    afterThreshold(v) {
      this.$refs.bookmark.style.top = `${-v}px`;
      // 判断当前页是否为书签页
      if (this.isBookmark) {
        this.text = this.$t("book.releaseDeleteMark");
        this.color = WHITE;
        this.isFixed = false;
      } else {
        this.text = this.$t("book.releaseAddMark");
        this.color = BLUE;
        this.isFixed = true;
      }
      // 箭头旋转
      const iconDown = this.$refs.iconDown;
      if (
        iconDown.style.transform === "" ||
        iconDown.style.transform === "rotate(0deg)"
      ) {
        iconDown.style.transform = "rotate(180deg)";
      }
    },
    // 状态4：归位操作
    restore() {
      setTimeout(() => {
        this.$refs.bookmark.style.top = `${-this.height}px`;
        this.$refs.iconDown.style.transform = "rotate(0deg)";
      }, 200);
      if (this.isFixed) {
        this.setIsBookmark(true);
        this.addBookmark();
      } else {
        this.setIsBookmark(false);
        this.removeBookmark();
      }
    },
    // 添加书签
    addBookmark() {
      this.bookmark = getBookmark(this.fileName);
      if (!this.bookmark) {
        this.bookmark = [];
      }
      if (this.currentBook) {
        const currentLocation = this.currentBook.rendition.currentLocation();
        // 获取！后面的内容
        const cfibase = currentLocation.start.cfi.replace(/!.*/, "");
        // 获取！前面的内容,并且去除括号)
        const cfistart = currentLocation.start.cfi
          .replace(/.*!/, "")
          .replace(/\)$/, "");
        const cfiend = currentLocation.end.cfi.replace(/.*!/, "");

        const cfirange = `${cfibase}!,${cfistart},${cfiend}`;
        this.currentBook.getRange(cfirange).then(range => {
          // 把多余空格替换成空
          const text = range.toString().replace(/\s\s/g, "");
          this.bookmark.push({
            cfi: currentLocation.start.cfi,
            text: text
          });
          saveBookmark(this.fileName, this.bookmark);
        });
      }
    },
    // 移除书签
    removeBookmark() {
      const currentLocation = this.currentBook.rendition.currentLocation();
      const cfi = currentLocation.start.cfi;
      this.bookmark = getBookmark(this.fileName);
      if (this.bookmark) {
        // 移除当前书签
        saveBookmark(
          this.fileName,
          this.bookmark.filter(item => item.cfi !== cfi)
        );
        this.setIsBookmark(false);
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.ebook-bookmark {
  position: absolute;
  top: rem(-35);
  left: 0;
  z-index: 100;
  width: 100%;
  height: rem(35);
  .ebook-bookmark-text-wrapper {
    display: flex;
    position: absolute;
    right: rem(45);
    bottom: 0;
    .ebook-bookmark-down-wrapper {
      font-size: rem(14);
      color: #fff;
      @include center;
      transition: all 0.2s linear;
    }
    .ebook-bookmark-text {
      font-size: rem(14);
      color: #fff;
    }
  }
  .ebook-bookmark-icon-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: rem(15);
  }
}
</style>