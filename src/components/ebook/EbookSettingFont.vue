<!-- 字号设置 -->
<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible=== 0">
      <div class="setting-font-size">
        <div class="preview-l" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>
        <div class="select">
          <div
            class="select-wrapper"
            v-for="(item, index) in fontSizeList"
            :key="index"
            @click="setFontSize(item.fontSize)"
          >
            <div class="line"></div>
            <div class="point-wrapper">
              <div class="point" v-show="defaultFontSize === item.fontSize">
                <div class="small-point"></div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div
          class="preview-r"
          :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'}"
        >A</div>
      </div>
      <div class="setting-font-family" @click="showFontFamilyPopup">
        <div class="text-wrapper">
          <span class="text">{{defaultFontFamily}}</span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-forward"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from "../../utils/mixin";
import { FONT_SIZE_LIST } from "../../utils/book";
import { saveFontSize } from "../../utils/localStorage";

export default {
  components: {},
  data() {
    return {
      fontSizeList: FONT_SIZE_LIST
    };
  },
  mixins: [ebookMixin],
  methods: {
    setFontSize(fontSize) {
      this.setDefaultFontSize(fontSize);
      this.currentBook.rendition.themes.fontSize(fontSize);
      saveFontSize(this.fileName, fontSize);
    },
    showFontFamilyPopup() {
      this.setFontFamilyVisible(true);
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.setting-wrapper {
  @include column;
  position: absolute;
  bottom: rem(48);
  left: 0;
  z-index: 101;
  width: 100%;
  height: rem(90);
  background: white;
  box-shadow: 0 rem(-8) rem(8) rgba(0, 0, 0, 0.15);
  .setting-font-size {
    display: flex;
    flex: 2;
    height: 100%;
    .preview-l,
    .preview-r {
      flex: 0 0 rem(40);
      @include center;
    }
    .preview-l {
      margin-left: rem(20);
    }
    .preview-r {
      margin-right: rem(20);
    }
    .select {
      display: flex;
      flex: 1;
      .select-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        &:first-child {
          .line {
            &:first-child {
              border-top: none;
            }
          }
        }
        &:last-child {
          .line {
            &:last-child {
              border-top: none;
            }
          }
        }
        .line {
          flex: 1;
          height: 0;
          border-top: rem(1) solid #ccc;
        }
        .point-wrapper {
          position: relative;
          flex: 0 0 0;
          width: 0;
          height: rem(7);
          border-left: rem(1) solid #ccc;
          .point {
            position: absolute;
            top: rem(-8);
            left: rem(-10);
            width: rem(20);
            height: rem(20);
            border-radius: 50%;
            background: white;
            border: rem(1) solid #ccc;
            box-shadow: 0 rem(4) rem(4) rgba(0, 0, 0, 0.15);
            @include center;
            .small-point {
              width: rem(5);
              height: rem(5);
              background: black;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
  .setting-font-family {
    flex: 1;
    font-size: rem(14);
    @include center;
    .icon-wrapper {
      margin-top: rem(2);
    }
  }
}
</style>