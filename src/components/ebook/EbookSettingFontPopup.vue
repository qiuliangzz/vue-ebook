<!-- 字体设置弹窗 -->
<template>
  <transition name="popup-slide-up">
    <div class="ebook-popup-list" v-show="fontFamilyVisible">
      <div class="ebook-popup-title">
        <div class="title-icon" @click="hide">
          <span class="icon-down2"></span>
        </div>
        <span class="title-text">{{$t('book.selectFont')}}</span>
      </div>
      <div class="ebook-popup-wrapper">
        <div
          class="ebook-popup-item"
          v-for="(item,index) in fontFamilyList"
          :key="index"
          @click="setFontFamily(item.font)"
        >
          <div class="item-text" :class="{selected:isSelected(item)}">{{item.font}}</div>
          <div class="item-check" v-if="isSelected(item)">
            <span class="icon-check"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from "../../utils/mixin";
import { FONT_FAMILY } from "../../utils/book";
import { saveFontFamily } from "../../utils/localStorage";
export default {
  components: {},
  data() {
    return {
      fontFamilyList: FONT_FAMILY
    };
  },
  mixins: [ebookMixin],
  methods: {
    hide() {
      this.setFontFamilyVisible(false);
    },
    isSelected(item) {
      return this.defaultFontFamily === item.font;
    },
    setFontFamily(font) {
      this.setDefaultFontFamily(font);
      this.currentBook.rendition.themes.font(font);
      saveFontFamily(this.fileName, this.defaultFontFamily);
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.ebook-popup-list {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 300;
  width: 100%;
  box-shadow: 0 rem(-4) rem(6) rgba(0, 0, 0, 0.1);
  background-color: #fff;
  .ebook-popup-title {
    position: relative;
    padding: rem(15);
    border-bottom: rem(1) solid #b8b9bb;
    text-align: center;
    @include center;
    .title-icon {
      position: absolute;
      left: rem(15);
      top: 0;
      height: 100%;
      @include center;
      font-size: rem(16);
      font-weight: bold;
    }
    .title-text {
      font-size: rem(14);
      font-weight: bold;
    }
  }
  .ebook-popup-wrapper {
    .ebook-popup-item {
      display: flex;
      padding: rem(15);
      .item-text {
        flex: 1;
        font-size: rem(14);
        text-align: left;
        &.selected {
          color: #346cb9;
          font-weight: bold;
        }
      }
      .item-check {
        flex: 1;
        text-align: right;
        font-size: rem(14);
        font-weight: bold;
        color: #346cb9;
      }
    }
  }
}
</style>