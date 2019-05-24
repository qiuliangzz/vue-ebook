<!-- 书架 -->
<template>
  <div class="store-shelf">
    <ShelfTitle></ShelfTitle>
    <Scroll
      :top="0"
      :bottom="srcollBottom"
      class="shelf-scroll-wrapper"
      @onScroll="onScroll"
      ref="scroll"
    >
      <ShelfSearch></ShelfSearch>
      <ShelfList></ShelfList>
    </Scroll>
    <ShelfFooter></ShelfFooter>
  </div>
</template>

<script>
import ShelfTitle from "../../components/shelf/ShelfTitle";
import Scroll from "../../components/common/Scroll";
import ShelfSearch from "../../components/shelf/ShelfSearch";
import ShelfList from "../../components/shelf/ShelfList";
import ShelfFooter from "../../components/shelf/ShelfFooter";
import { shelfMixin } from "../../utils/mixin";

export default {
  components: {
    ShelfTitle,
    Scroll,
    ShelfSearch,
    ShelfList,
    ShelfFooter
  },
  data() {
    return {
      srcollBottom: 0
    };
  },
  watch: {
    isEditMode(isEditMode) {
      this.srcollBottom = isEditMode ? 48 : 0;
      // DOm响应完毕
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    }
  },
  mixins: [shelfMixin],
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY);
    }
  },
  created() {
    this.getShelfList();
  },
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.store-shelf {
  position: relative;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: #fff;
  .shelf-scroll-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
  }
}
</style>