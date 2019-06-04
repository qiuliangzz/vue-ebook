<!-- 文字前面播放状态线条动画组件 -->
<template>
  <div class="playing-item-wrapper">
    <div class="playing-item" :style="item" v-for="(item, index) in styles" :key="index" ref="playingItem"></div>
  </div>
</template>

<script>
  import { rem } from '@/utils/utils'

  export default {
    props: {
      // 几条播放线条
      number: Number
    },
    computed: {
      styles() {
        const styles = new Array(this.number)
        for (let i = 0; i < styles.length; i++) {
          styles[i] = {
            height: rem(this.random()) + 'rem'
          }
        }
        return styles
      }
    },
    methods: {
      startAnimation() {
        this.task = setInterval(() => {
          this.$refs.playingItem.forEach(item => {
            // 高度随机
            item.style.height = rem(this.random()) + 'rem'
          })
        }, 200)
      },
      stopAnimation() {
        if (this.task) {
          clearInterval(this.task)
        }
      },
      // 随机数
      random() {
        return Math.ceil(Math.random() * 10)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .playing-item-wrapper {
    @include center;
    .playing-item {
      flex: 0 0 rem(2);
      width: rem(2);
      height: rem(1);
      background: $color-blue;
      margin-left: rem(2);
      transition: all .2s ease-in-out;
      &:first-child {
        margin: 0;
      }
    }
  }
</style>
