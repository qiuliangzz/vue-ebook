<!-- 书架图书列表中的每一个项 -->
<template>
  <div class="shelf-item shelf-item-shadow">
    <!-- 动态组件 -->
    <component :is="item" :data="data"></component>
  </div>
</template>

<script>
import { shelfMixin } from "../../utils/mixin";
import ShelfItemBook from "./ShelfItemBook";
import ShelfItemCategory from "./ShelfItemCategory";
import ShelfItemAdd from "./ShelfItemAdd";

export default {
  components: {},
  data() {
    return {
      book: ShelfItemBook,
      category: ShelfItemCategory,
      add: ShelfItemAdd
    };
  },
  props: {
    data: Object
  },
  mixins: [shelfMixin],
  computed: {
    item() {
      return this.data.type === 1
        ? this.book
        : this.data.type === 2
        ? this.category
        : this.add;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.shelf-item {
  width: 100%;
  height: 100%;
  &.shelf-item-shadow {
    box-shadow: rem(2) rem(2) rem(6) rem(2) rgba(200, 200, 200, 0.3);
  }
}
</style>