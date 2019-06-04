<!-- 底部播放面板 -->
<template>
  <div class="bottom-wrapper" :class="{'hide-play': !showPlay}">
    <div class="bottom-playing-wrapper" @click.stop.prevent="onPlayingCardClick" v-if="showPlay">
      <div class="bottom-playing-left">
        <!-- 播放按钮 -->
        <div class="icon-play-wrapper" @click.stop.prevent="togglePlay">
          <span class="icon-play_go" v-if="!isPlaying"></span>
          <span class="icon-play_pause" v-else></span>
        </div>
      </div>
      <div class="bottom-playing-right">
        <!-- 目录 -->
        <div class="bottom-playing-chapter-text">
          <span class="chapter-label">{{chapter ? chapter.label : ''}}</span>
          <span
            class="bottom-playing-page-text"
            v-if="currentSectionIndex && currentSectionTotal"
          >( {{currentSectionIndex}} / {{currentSectionTotal}} )</span>
        </div>
        <!-- 播放时间进度 -->
        <div
          class="bottom-playing-page-text"
        >{{playInfo ? playInfo.currentMinute : '00'}}:{{playInfo ? playInfo.currentSecond : '00'}} / {{playInfo ? playInfo.totalMinute : '00'}}:{{playInfo ? playInfo.totalSecond : '00'}}</div>
      </div>
    </div>
    <div class="bottom-btn-wrapper">
      <span class="bottom-btn-text">{{$t('detail.addOrRemoveShelf')}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chapter: Object, // 章节
    currentSectionIndex: Number, // 当前章节
    currentSectionTotal: Number, // 总章节
    showPlay: Boolean, // 显示面板
    isPlaying: Boolean, // 是否正在播放
    playInfo: Object // 播放信息
  },
  methods: {
    togglePlay() {
      // 调用父组件方法
      this.$parent.togglePlay();
    },
    onPlayingCardClick() {
      this.$emit("onPlayingCardClick");
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";

.bottom-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 110;
  width: 100%;
  height: rem(116);
  background: white;
  box-shadow: 0 rem(-2) rem(2) 0 rgba(0, 0, 0, 0.1);
  &.hide-play {
    height: rem(52);
  }
  .bottom-playing-wrapper {
    display: flex;
    width: 100%;
    height: rem(64);
    .bottom-playing-left {
      flex: 0 0 rem(70);
      width: rem(70);
      @include center;
      .icon-play-wrapper {
        flex: 0 0 rem(100);
        @include center;
        &:active {
          opacity: 0.5;
        }
        .icon-play_go {
          font-size: rem(40);
          color: $color-blue;
        }
        .icon-play_pause {
          font-size: rem(40);
          color: $color-blue;
        }
      }
    }
    .bottom-playing-right {
      flex: 1;
      padding-right: rem(15);
      box-sizing: border-box;
      @include columnLeft;
      .bottom-playing-chapter-text {
        max-width: rem(305);
        color: #333;
        font-size: rem(16);
        line-height: rem(19);
        @include ellipsis;
      }
      .bottom-playing-page-text {
        color: #666;
        font-size: rem(10);
        margin-top: rem(5);
      }
    }
  }
  .bottom-btn-wrapper {
    width: 100%;
    height: rem(52);
    border-top: rem(1) solid #eee;
    box-sizing: border-box;
    @include center;
    .bottom-btn-text {
      font-size: rem(14);
      color: $color-blue;
      font-weight: bold;
    }
  }
}
</style>
