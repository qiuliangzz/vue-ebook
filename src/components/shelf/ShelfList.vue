<!-- 书架图书列表 -->
<template>
  <div class="shelf-list">
    <div v-for="item in shelfList" :key="item.id" class="shelf-list-item-wrapper">
      <ShelfItem :data="item" :style="{height:itemHeight}"></ShelfItem>
      <div class="shelf-list-title-wrapper">
        <span class="shelf-list-title title-small">{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import ShelfItem from "./ShelfItem";
import { shelfMixin } from "../../utils/mixin";
import { realPx } from "../../utils/utils";
export default {
  components: {
    ShelfItem
  },
  data() {
    return {};
  },
  mixins: [shelfMixin],
  computed: {
    itemHeight() {
      // w / 250= h / 350
      // h= w* 350/250
      return ((window.innerWidth - realPx(120)) / 3) * (350 / 250) + "px";
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.shelf-list {
  position: absolute;
  top: rem(94);
  z-index: 103;
  display: flex;
  /* 可换行 */
  flex-flow: row wrap;
  width: 100%;
  padding: 0 rem(15);
  .shelf-list-item-wrapper {
    flex: 0 0 33.33%;
    width: 33.33%;
    padding: rem(15);
  }
  .shelf-list-title-wrapper {
    margin-top: rem(10);
  }
}
</style>