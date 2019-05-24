<!-- 书架 -->
<template>
  <div class="store-shelf">
    <ShelfTitle></ShelfTitle>
    <Scroll :top="0" class="shelf-scroll-wrapper" @onScroll="onScroll">
      <ShelfSearch></ShelfSearch>
      <ShelfList></ShelfList>
    </Scroll>
  </div>
</template>

<script>
import ShelfTitle from "../../components/shelf/ShelfTitle";
import Scroll from "../../components/common/Scroll";
import ShelfSearch from "../../components/shelf/ShelfSearch";
import ShelfList from "../../components/shelf/ShelfList";
import { shelfMixin } from "../../utils/mixin";
import { shelf } from "../../api";
import {appendAddToShelf} from "../../utils/shelf"
export default {
  components: {
    ShelfTitle,
    Scroll,
    ShelfSearch,
    ShelfList
  },
  data() {
    return {};
  },
  mixins: [shelfMixin],
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY);
    },
    // 获取列表数据
    getShelfList() {
      shelf().then(response => {
        if (
          response.status === 200 &&
          response.data &&
          response.data.bookList
        ) {
          const { data } = response;
          console.log(data);
          this.setShelfList(appendAddToShelf(data.bookList));
        }
      });
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