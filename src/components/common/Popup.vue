<!-- 底部弹窗 -->
<template>
  <div class="popup" v-if="popupVisible">
    <transition name="fade">
      <div class="popup-bg" @click.stop.prevent="hide" v-show="popupVisible"></div>
    </transition>
    <transition name="popup-slide-up">
      <div class="popup-wrapper" v-show="visible">
        <div class="popup-title" v-show="title && title.length>0">{{title}}</div>
        <div
          class="popup-btn"
          :class="{danger:item.type==='danger'}"
          v-for="(item,index) in btn"
          :key="index"
          @click="item.click"
        >{{item.text}}</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  name: "popup",
  components: {},
  data() {
    return {
      popupVisible: false,
      visible: false
    };
  },
  props: {
    title: String,
    btn: Array
  },
  mixins: [],
  methods: {
    show() {
      this.popupVisible = true;
      setTimeout(() => {
        this.visible = true;
      }, 0);
    },
    hide() {
      this.visible = false;
      setTimeout(() => {
        this.popupVisible = false;
      }, 200);
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  .popup-bg {
    width: 100%;
    height: 100%;
  }
  .popup-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 2000;
    width: 100%;
    background-color: #fff;
    .popup-title {
      width: 100%;
      height: rem(44);
      border-bottom: rem(1) solid #eee;
      font-size: rem(12);
      line-height: rem(14);
      padding: rem(15);
      @include center;
      color: #999;
    }
    .popup-btn {
      width: 100%;
      height: rem(60);
      border-bottom: rem(1) solid #eee;
      font-size: rem(16);
      color: #666;
      font-weight: bold;
      @include center;
      &.danger {
        color: $color-pink;
      }
    }
  }
}
</style>