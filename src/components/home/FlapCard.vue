<!-- 翻转卡片，推荐图书卡片组件 -->
<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
    <!-- 加载的翻转卡片 -->
    <div
      class="flag-card-bg"
      :class="{'animation':runFlapCardAnimation}"
      v-show="runFlapCardAnimation"
    >
      <!-- 翻转动画 -->
      <div
        class="flag-card"
        v-for="(item,index) in flapCardList"
        :key="index"
        :style="{zIndex:item.zIndex}"
      >
        <div class="flag-card-circle">
          <div
            class="flag-card-semi-circle flag-card-semi-circle-left"
            :style="semiCircleStyle(item,'left')"
            ref="circleLeft"
          ></div>
          <div
            class="flag-card-semi-circle flag-card-semi-circle-right"
            :style="semiCircleStyle(item,'right')"
            ref="circleRight"
          ></div>
        </div>
      </div>
      <!-- 烟花动画 -->
      <div class="point-wrapper">
        <!-- 小球 -->
        <div
          class="point"
          v-for="item in pointList"
          :key="item"
          :class="{'animation':runPointAnimation}"
        ></div>
      </div>
    </div>
    <!-- 推荐图书卡片模块 -->
    <div
      class="book-card"
      :class="{'animation':runBookCardAnimation}"
      v-show="runBookCardAnimation"
    >
      <div class="book-card-wrapper">
        <div class="img-wrapper">
          <img class="img" :src="data?data.cover:''">
        </div>
        <div class="content-wrapper">
          <div class="content-title">{{data?data.title:''}}</div>
          <div class="content-author sub-title-medium">{{data?data.author:''}}</div>
          <div class="content-category">{{categoryText()}}</div>
        </div>
        <div class="read-btn" @click.stop="showBookDetail(data)">{{$t('home.readNow')}}</div>
      </div>
    </div>
    <!-- 关闭按钮 -->
    <div class="close-btn-wrapper" @click="close">
      <span class="icon-close"></span>
    </div>
  </div>
</template>

<script>
import { storeHomeMixin } from "../../utils/mixin";
import { flapCardList, categoryText } from "../../utils/bookstore";
import { setInterval, clearInterval, setTimeout, clearTimeout } from "timers";
export default {
  components: {},
  data() {
    return {
      flapCardList,
      front: 0,
      back: 1,
      intervalTime: 25,
      runFlapCardAnimation: false,
      pointList: null,
      runPointAnimation: false,
      runBookCardAnimation: false
    };
  },
  props: {
    data: Object
  },
  mixins: [storeHomeMixin],
  watch: {
    flapCardVisible(v) {
      if (v) {
        this.runAnimation();
      }
    }
  },
  methods: {
    close() {
      this.setFlapCardVisible(false);
      this.stopAnimation();
    },
    // 设置半圆样式
    semiCircleStyle(item, dir) {
      return {
        backgroundColor: `rgb(${item.r},${item.g},${item.b})`,
        backgroundSize: item.backgroundSize,
        backgroundImage: dir === "left" ? item.imgLeft : item.imgRight
      };
    },
    // 转动卡片
    rotate(index, type) {
      // 获取属性值
      const item = this.flapCardList[index];
      // 获取dom
      let dom;
      if (type === "front") {
        dom = this.$refs.circleRight[index];
      } else {
        dom = this.$refs.circleLeft[index];
      }
      // 转动
      dom.style.transform = `rotateY(${item.rotateDegree}deg)`;
      dom.style.backgroundColor = `rgb(rgb(${item.r},${item._g},${item.b})`;
    },
    flapCardRotate() {
      const frontFlapCard = this.flapCardList[this.front];
      const backFlapCard = this.flapCardList[this.back];
      frontFlapCard.rotateDegree += 10;
      frontFlapCard._g -= 5;
      backFlapCard.rotateDegree -= 10;
      if (backFlapCard.rotateDegree < 90) {
        backFlapCard._g += 5;
      }
      if (
        frontFlapCard.rotateDegree === 90 &&
        backFlapCard.rotateDegree === 90
      ) {
        backFlapCard.zIndex += 2;
      }
      this.rotate(this.front, "front");
      this.rotate(this.back, "back");
      if (
        frontFlapCard.rotateDegree === 180 &&
        backFlapCard.rotateDegree === 0
      ) {
        this.next();
      }
    },
    // 让左边半圆和右边半圆重叠
    prepare() {
      const backFlapCard = this.flapCardList[this.back];
      backFlapCard.rotateDegree = 180;
      backFlapCard._g = backFlapCard.g - 5 * 9;
      this.rotate(this.back, "back");
    },
    next() {
      const frontFlapCard = this.flapCardList[this.front];
      const backFlapCard = this.flapCardList[this.back];
      // 还原
      frontFlapCard.rotateDegree = 0;
      frontFlapCard._g = frontFlapCard.g;
      backFlapCard.rotateDegree = 0;
      backFlapCard._g = backFlapCard.g;
      this.rotate(this.front, "front");
      this.rotate(this.back, "back");
      this.front++;
      this.back++;
      const len = this.flapCardList.length;
      if (this.front >= len) {
        this.front = 0;
      }
      if (this.back >= len) {
        this.back = 0;
      }
      // 改变zIndex算法
      // 100 -> 96
      // 99 -> 100
      // 98 -> 99
      // 97 -> 98
      // 96 -> 97
      this.flapCardList.forEach((item, index) => {
        item.zIndex = 100 - ((index - this.front + len) % len);
      });
      this.prepare();
    },
    // 重置样式
    reset() {
      this.front = 0;
      this.back = 1;
      this.flapCardList.forEach((item, index) => {
        item.zIndex = 100 - index;
        item._g = item.g;
        item.rotateDegree = 0;
        this.rotate(index, "front");
        this.rotate(index, "back");
      });
      this.runBookCardAnimation = false;
      this.runFlapCardAnimation = false;
      this.runPointAnimation = false;
    },
    // 翻转动画
    startFlapCardAnimation() {
      this.prepare();
      this.task = setInterval(() => {
        this.flapCardRotate();
      }, this.intervalTime);
    },
    // 烟花动画
    startPointAnimation() {
      this.runPointAnimation = true;
      setTimeout(() => {
        this.runPointAnimation = false;
      }, 750);
    },
    // 停止动画
    stopAnimation() {
      this.runFlapCardAnimation = false;
      if (this.task) {
        clearInterval(this.task);
      }
      if (this.timeout1) {
        clearTimeout(this.timeout1);
      }
      if (this.timeout2) {
        clearTimeout(this.timeout2);
      }
      this.reset();
    },
    // 运行动画
    runAnimation() {
      this.runFlapCardAnimation = true;
      this.timeout1 = setTimeout(() => {
        this.startPointAnimation();
        this.startFlapCardAnimation();
      }, 300);
      this.timeout1 = setTimeout(() => {
        this.stopAnimation();
        this.runBookCardAnimation = true;
      }, 2500);
    },
    // 获取国际化文本
    categoryText() {
      if (this.data) {
        return categoryText(this.data.category, this);
      } else {
        return "";
      }
    }
  },
  created() {
    this.pointList = [];
    for (let i = 0; i < 18; i++) {
      this.pointList.push(`point${i}`);
    }
  },
  mounted() {
  }
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
@import "../../assets/styles/flapCard.scss";
.flap-card-wrapper {
  @include absCenter;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  @include center;
  /* 翻转卡片 */
  .flag-card-bg {
    position: relative;
    width: rem(64);
    height: rem(64);
    background: #fff;
    border-radius: rem(5);
    transform: scale(0);
    opacity: 0;
    /* animation里的both能让动画维持在100%的状态 */
    &.animation {
      animation: flap-card-move 0.3s ease-in both;
    }
    @keyframes flap-card-move {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      50% {
        transform: scale(1.2);
        opacity: 1;
      }
      70% {
        transform: scale(0.9);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    .flag-card {
      @include absCenter;
      width: rem(48);
      height: rem(48);
      .flag-card-circle {
        display: flex;
        width: 100%;
        height: 100%;
        .flag-card-semi-circle {
          flex: 0 0 50%;
          width: 50%;
          height: 100%;
          background-repeat: no-repeat;
          /* 背面隐藏 */
          backface-visibility: hidden;
        }
        .flag-card-semi-circle-left {
          border-radius: rem(24) 0 0 rem(24);
          background-position: center right;
          transform-origin: right;
        }
        .flag-card-semi-circle-right {
          border-radius: 0 rem(24) rem(24) 0;
          background-position: center left;
          transform-origin: left;
        }
      }
    }
    .point-wrapper {
      @include absCenter;
      z-index: 1500;
    }
    .point {
      border-radius: 50%;
      @include absCenter;
      &.animation {
        /* css循环 */
        @for $i from 1 to length($moves) {
          &:nth-child(#{$i}) {
            @include move($i);
          }
        }
      }
    }
  }
  /* 推荐图书 */
  .book-card {
    position: relative;
    width: 65%;
    max-width: rem(400);
    border-radius: rem(15);
    background: white;
    &.animation {
      animation: scale 0.3s ease-in both;
      @keyframes scale {
        0% {
          transform: scale(0);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
    }
    .book-card-wrapper {
      width: 100%;
      height: 100%;
      margin-bottom: rem(30);
      @include columnTop;
      .img-wrapper {
        width: 100%;
        margin-top: rem(20);
        @include center;
        .img {
          width: rem(90);
          height: rem(130);
        }
      }
      .content-wrapper {
        padding: 0 rem(20);
        margin-top: rem(20);
        .content-title {
          color: #333;
          font-weight: bold;
          font-size: rem(18);
          line-height: rem(20);
          max-height: rem(40);
          text-align: center;
          @include ellipsis2(2);
        }
        .content-author {
          margin-top: rem(10);
          text-align: center;
        }
        .content-category {
          color: #999;
          font-size: rem(14);
          margin-top: rem(10);
          text-align: center;
        }
      }
      .read-btn {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1100;
        width: 100%;
        border-radius: 0 0 rem(15) rem(15);
        padding: rem(15) 0;
        text-align: center;
        color: white;
        font-size: rem(14);
        background: $color-blue;
      }
    }
  }
  /* 关闭按钮 */
  .close-btn-wrapper {
    position: absolute;
    left: 0;
    bottom: rem(30);
    z-index: 1000;
    width: 100%;
    @include center;
    .icon-close {
      width: rem(45);
      height: rem(45);
      font-size: rem(25);
      border-radius: 50%;
      background: #333;
      color: #fff;
      @include center;
    }
  }
}
</style>