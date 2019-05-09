<!--  动画加载组件 -->
<template>
  <div class="ebook-loading">
    <div class="ebook-loading-wrapper">
      <div class="ebook-loading-item" v-for="(item,index) in lineList" :key="index">
        <div class="ebook-loading-line-wrapper" v-for="(subItem,subIndex) in item" :key="subIndex">
          <div class="ebook-loading-line" ref="line"></div>
          <div class="ebook-loading-mask" ref="mask"></div>
        </div>
      </div>
      <div class="ebook-loading-center"></div>
    </div>
  </div>
</template>

<script>
import { setTimeout, setInterval } from "timers";
import { rem } from "../../utils/utils";
export default {
  components: {},
  data() {
    return {
      lineList: [[{}, {}, {}], [{}, {}, {}]],
      maskWidth: [
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 }
      ],
      lineWidth: [
        { value: 16 },
        { value: 16 },
        { value: 16 },
        { value: 16 },
        { value: 16 },
        { value: 16 }
      ],
      add: true,
      end: false
    };
  },
  mixins: [],
  methods: {},
  created() {},
  mounted() {
    // 目录加载动画
    this.task = setInterval(() => {
      this.$refs.mask.forEach((item, index) => {
        const mask = this.$refs.mask[index];
        const line = this.$refs.line[index];
        let maskWidth = this.maskWidth[index];
        let lineWidth = this.lineWidth[index];
        if (index === 0) {
          if (this.add && maskWidth.value < 16) {
            maskWidth.value++;
            lineWidth.value--;
          } else if (!this.add && lineWidth.value < 16) {
            maskWidth.value--;
            lineWidth.value++;
          }
        } else {
          if (this.add && maskWidth.value < 16) {
            let preMaskWidth = this.maskWidth[index - 1];
            if (preMaskWidth.value >= 8) {
              maskWidth.value++;
              lineWidth.value--;
            }
          } else if (!this.add && lineWidth.value < 16) {
            let preLineWidth = this.lineWidth[index - 1];
            if (preLineWidth.value >= 8) {
              maskWidth.value--;
              lineWidth.value++;
            }
          }
        }
        mask.style.width = `${rem(maskWidth.value)}rem`;
        mask.style.flex = `0 0 ${rem(maskWidth.value)}rem`;
        line.style.width = `${rem(lineWidth.value)}rem`;
        line.style.flex = `0 0 ${rem(lineWidth.value)}rem`;
        if (index === this.maskWidth.length - 1) {
          if (this.add) {
            if (maskWidth.value === 16) {
              this.end = true;
            }
          } else {
            if (maskWidth.value === 0) {
              this.end = true;
            }
          }
        }
        if (this.end) {
          this.add = !this.add;
          this.end = false;
        }
      });
    }, 20);
  },
  beforeDestroy() {
    if (this.task) {
      clearInterval(this.task);
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.ebook-loading {
  position: relative;
  z-index: 1000;
  width: rem(63);
  height: rem(40);
  background: transparent;
  border: rem(1.5) solid #d7d7d7;
  border-radius: rem(3);
  .ebook-loading-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    .ebook-loading-item {
      flex: 1;
      @include column;
      padding: rem(7) 0;
      .ebook-loading-line-wrapper {
        flex: 1;
        @include left;
        padding: 0 rem(7);
        .ebook-loading-line {
          flex: 0 0 rem(16);
          width: rem(16);
          height: rem(2);
          background: #d7d7d7;
        }
        .ebook-loading-mask {
          flex: 0 0 0;
          width: 0;
          height: rem(1.5);
        }
      }
    }
    .ebook-loading-center {
      position: absolute;
      left: 50%;
      top: 0;
      width: rem(1.5);
      height: 100%;
      background: #d7d7d7;
    }
  }
}
</style>