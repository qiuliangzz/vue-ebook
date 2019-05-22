<!-- 电子书顶部标题栏 -->
<template>
  <div class="title-wrapper" v-show="menuVisible">
    <div class="left">
      <span class="icon-back" @click="back"></span>
    </div>
    <div class="right">
      <div class="icon-wrapper">
        <span class="icon-shelf"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-cart"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-more"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { ebookMixin } from "../../utils/mixin";

export default {
  components: {},
  data() {
    return {};
  },
  mixins: [ebookMixin],
  methods: {
    back() {
      this.$router.go(-1)
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.title-wrapper {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: rem(48);
  background: white;
  z-index: 999;
  box-shadow: 0 rem(8) rem(8) rgba(0, 0, 0, 0.15);
  font-size: rem(20);
  .left {
    flex: 0 0 rem(60);
    @include center;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .icon-wrapper {
      flex: 0 0 rem(40);
      @include center;
      .icon-shelf,
      .icon-cart {
        font-size: rem(22);
      }
    }
  }
}
</style>