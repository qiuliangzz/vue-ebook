<!-- 书架图书列表 -->
<template>
  <div class="shelf-list">
    <div v-for="item in shelfList" :key="item.id">
      <ShelfItem :data='item'></ShelfItem>
    </div>
  </div>
</template>

<script>
import ShelfItem from "./ShelfItem";
import { shelfMixin } from '../../utils/mixin';
export default {
  components: {
    ShelfItem
  },
  data() {
    return {};
  },
  mixins: [shelfMixin],
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
}
</style>