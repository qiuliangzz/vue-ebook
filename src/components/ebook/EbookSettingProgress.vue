<!-- 阅读进度功能实现 -->
<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible&& settingVisible === 2">
      <div class="setting-progress">
        <div class="read-time-wrapper">
          <span class="read-time-text">{{getReadTimeText()}}</span>
        </div>
        <div class="progress-wrapper">
          <div class="progress-icon-wrapper" @click="prevSection()">
            <span class="icon-back"></span>
          </div>
          <input
            class="progress"
            type="range"
            max="100"
            min="0"
            step="1"
            @change="onProgressChange($event.target.value)"
            @input="onProgressInput($event.target.value)"
            :value="progress"
            :disabled="!bookAvailable"
            ref="progressInput"
          >
          <div class="progress-icon-wrapper" @click="nextSection()">
            <span class="icon-forward"></span>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-section-text">{{getSectionName}}</span>
          <span>({{bookAvailable ? progress + '%' : '加载中...'}})</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from "../../utils/mixin.js";
import { getReadTime } from "../../utils/localStorage.js";
export default {
  components: {},
  data() {
    return {};
  },
  mixins: [ebookMixin],
  methods: {
    // 进度条拖动离手后的调用方法
    onProgressChange(progress) {
      this.setProgress(progress).then(() => {
        this.displayProgress();
        this.updateProgressBg();
      });
    },
    // 进度条拖动过程中的调用方法
    onProgressInput(progress) {
      this.setProgress(progress).then(() => {
        this.updateProgressBg();
      });
    },
    // 展示当前进度
    displayProgress() {
      const cfi = this.currentBook.locations.cfiFromPercentage(
        this.progress / 100
      );
      this.display(cfi);
    },
    // 进度条背景色变化，已读部分变深
    updateProgressBg() {
      this.$refs.progressInput.style.backgroundSize = `${this.progress}% 100%`;
    },
    // 上一章
    prevSection() {
      if (this.section > 0 && this.bookAvailable) {
        this.setSection(this.section - 1).then(() => {
          this.displaySection();
        });
      }
    },
    // 下一章
    nextSection() {
      if (
        this.section < this.currentBook.spine.length - 1 &&
        this.bookAvailable
      ) {
        this.setSection(this.section + 1).then(() => {
          this.displaySection();
        });
      }
    },
    // 章节跳转
    displaySection() {
      const sectionInfo = this.currentBook.section(this.section);
      if (sectionInfo && sectionInfo.href) {
        // this.currentBook.rendition.display(sectionInfo.href).then(() => {
        //   this.refreshLocation();
        // });
        this.display(sectionInfo.href);
      }
    }
  },
  created() {},
  mounted() {},
  updated() {
    this.updateProgressBg();
  }
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
  .setting-progress {
    position: relative;
    width: 100%;
    height: 100%;
    .read-time-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: rem(40);
      font-size: rem(12);
      @include center;
    }
    .progress-wrapper {
      width: 100%;
      height: 100%;
      @include center;
      padding: 0 rem(15);
      .progress-icon-wrapper {
        font-size: rem(20);
      }
      .progress {
        width: 100%;
        height: rem(2);
        -webkit-appearance: none;
        margin: 0 rem(10);
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
      bottom: rem(10);
      width: 100%;
      color: #333;
      font-size: rem(12);
      padding: 0 rem(20);
      @include center;
      .progress-section-text {
        @include ellipsis;
      }
    }
  }
}
</style>