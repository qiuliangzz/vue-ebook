<!-- 单书封面组件 -->
<template>
  <div class="shelf-item-book">
    <img class="shelf-item-book-cover" v-lazy="data.cover" alt>
    <!-- 私密阅读 -->
    <!-- 左下角小三角 -->
    <div class="private-wrapper" v-show="data.private"></div>
    <!-- 私密阅读图标 -->
    <div class="private-icon-wrapper" v-show="data.private">
      <span class="icon-private"></span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  props: {
    data: Object
  },
  mixins: [],
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.shelf-item-book {
  width: 100%;
  height: 100%;
  .shelf-item-book-cover {
    width: 100%;
    height: 100%;
  }
  .private-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 0;
    border-width: rem(15);
    border-style: solid;
    border-color: transparent transparent rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.3);
  }
  .private-icon-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: rem(30);
    height: rem(30);
    padding-bottom: rem(5);
    padding-left: rem(3);
    @include leftBottom;
    .icon-private {
      font-size: rem(12);
      color: white;
    }
  }
}
</style>