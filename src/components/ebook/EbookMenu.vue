<!-- 电子书底部菜单栏 -->
<template>
  <div class="menu-bar">
    <transition name="slide-up">
      <div
        class="menu-wrapper"
        :class="{'hide-box-shadow': !menuVisible||settingVisible >= 0}"
        v-show="menuVisible"
      >
        <div class="icon-wrapper">
          <span class="icon-menu" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-a" @click="showSetting(0)">A</span>
        </div>
      </div>
    </transition>
    <EbookSettingFont></EbookSettingFont>
    <EbookSettingFontPopup></EbookSettingFontPopup>
    <EbookSettingTheme></EbookSettingTheme>
    <EbookSettingProgress></EbookSettingProgress>
    <EbookSlide></EbookSlide>
    <!-- 
    <content-view
      :ifShowContent="ifShowContent"
      v-show="ifShowContent"
      :navigation="navigation"
      :bookAvailable="bookAvailable"
      @jumpTo="jumpTo"
    ></content-view>
    <transition name="fade">
      <div class="content-mask" v-show="ifShowContent" @click="hideContent"></div>
    </transition>-->
  </div>
</template>

<script>
import EbookSettingFont from "../ebook/EbookSettingFont";
import EbookSettingFontPopup from "../ebook/EbookSettingFontPopup";
import EbookSettingTheme from "../ebook/EbookSettingTheme";
import EbookSettingProgress from "../ebook/EbookSettingProgress";
import EbookSlide from "../ebook/EbookSlide";
import { ebookMixin } from "../../utils/mixin";

export default {
  components: {
    EbookSettingFont,
    EbookSettingFontPopup,
    EbookSettingTheme,
    EbookSettingProgress,
    EbookSlide
  },
  data() {
    return {};
  },
  mixins: [ebookMixin],
  methods: {
    showSetting(key) {
      this.setSettingVisible(key);
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.menu-bar {
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 102;
    display: flex;
    width: 100%;
    height: rem(48);
    background: white;
    box-shadow: 0 rem(-8) rem(8) rgba(0, 0, 0, 0.15);
    font-size: rem(20);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: rem(24);
      }
      .icon-bright {
        font-size: rem(22);
      }
    }
  }
  .setting-wrapper {
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
      height: 100%;
      .preview {
        flex: 0 0 rem(40);
        @include center;
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
    .setting-theme {
      height: 100%;
      display: flex;
      .setting-theme-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: rem(5);
        box-sizing: border-box;
        .preview {
          flex: 1;
          border: rem(1) solid #ccc;
          box-sizing: border-box;
          &.no-border {
            border: none;
          }
        }
        .text {
          flex: 0 0 rem(20);
          font-size: rem(14);
          color: #ccc;
          @include center;
          &.selected {
            color: #333;
          }
        }
      }
    }
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      .progress-wrapper {
        width: 100%;
        height: 100%;
        @include center;
        padding: 0 rem(30);
        box-sizing: border-box;
        .progress {
          width: 100%;
          -webkit-appearance: none;
          height: rem(2);
          background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
          background-size: 0 100%;
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: rem(20);
            width: rem(20);
            border-radius: 50%;
            background: white;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
            border: rem(1) solid #ddd;
          }
        }
      }
      .text-wrapper {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        color: #333;
        font-size: rem(12);
        text-align: center;
      }
    }
  }
  .content-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: 100%;
    background: rgba(51, 51, 51, 0.8);
  }
}
</style>