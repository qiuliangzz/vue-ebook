<!-- 分类书籍封面组件 -->
<template>
  <div class="shelf-item-category">
    <div class="shelf-item-category-list" v-if="data.itemList.length > 0">
      <div class="shelf-item-category-item" v-for="(item,index) in data.itemList" :key="index">
        <img v-lazy="item.cover" class="shelf-item-category-img">
      </div>
    </div>
    <div class="shelf-item-category-bg" v-else>
      <span class="icon-book2"></span>
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
.shelf-item-category {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .shelf-item-category-list {
    display: flex;
    flex-flow: row wrap;
    /* 靠顶部居左显示 */
    align-content: flex-start;
    width: 100%;
    height: 100%;
    padding-top: rem(5);
    .shelf-item-category-item {
      flex: 0 0 33.33%;
      width: 33.33%;
      height: 33.33%;
      &:nth-child(3n + 1) {
        padding: 0 rem(2.5) rem(5) rem(5);
      }
      &:nth-child(3n + 2) {
        padding: 0 rem(2.5) rem(2.5) rem(5);
      }
      &:nth-child(3n + 3) {
        padding: 0 rem(5) rem(5) rem(2.5);
      }
      .shelf-item-category-img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .shelf-item-category-bg {
    width: 100%;
    height: 100%;
    font-size: rem(30);
    color: #ccc;
    background-color: #fff;
    @include center;
  }
}
</style>