<!-- 提示信息弹窗组件 -->
<template>
  <transition name="fade">
    <!-- @click.prevent:不允许点击事件 -->
    <div class="toast-bg-wrapper" @click.prevent v-show="visible">
      <div class="toast-bg">
        <div class="toast-wrapper">
          <div class="toast" v-html="showText"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "toast",
  props: {
    text: [String, Number],
    timeout: {
      type: Number,
      default: 1500
    }
  },
  data() {
    return {
      visible: false,
      showText: ""
    };
  },
  methods: {
    hide() {
      this.visible = false;
    },
    show() {
      this.updateText(this.text);
      clearTimeout(this.task);
      this.task = null;
      this.visible = true;
      this.task = setTimeout(() => {
        this.visible = false;
      }, this.timeout);
    },
    // 持续显示
    continueShow() {
      clearTimeout(this.task);
      this.task = null;
      this.visible = true;
    },
    // 更新文本
    updateText(text) {
      this.showText = text;
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.toast-bg-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2500;
  width: 100%;
  height: 100%;
  background: transparent;
  .toast-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 0 0 -50%;
    z-index: 2500;
    width: 100%;
    @include center;
    .toast-wrapper {
      width: 60%;
      line-height: rem(20);
      padding: rem(10) rem(20);
      background: #ccc;
      border-radius: rem(10);
      font-size: rem(14);
      color: white;
      .toast {
        text-align: center;
        word-break: break-all;
      }
    }
  }
}
</style>
