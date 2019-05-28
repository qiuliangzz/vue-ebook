<!-- 分类列表 -->
<template>
  <div class="store-shelf">
    <ShelfTitle :title="shelfCategory.title" :ifShowBack="true"></ShelfTitle>
    <Scroll
      :top="0"
      :bottom="srcollBottom"
      class="shelf-scroll-wrapper"
      @onScroll="onScroll"
      ref="scroll"
      v-if="ifShowList"
    >
      <ShelfList :top="42" :data="shelfCategory.itemList"></ShelfList>
    </Scroll>
    <div class="store-shelf-empty-view" v-else>{{$t('shelf.groupNone')}}</div>
    <ShelfFooter></ShelfFooter>
  </div>
</template>

<script>
import ShelfTitle from "../../components/shelf/ShelfTitle";
import Scroll from "../../components/common/Scroll";
import ShelfList from "../../components/shelf/ShelfList";
import ShelfFooter from "../../components/shelf/ShelfFooter";
import { shelfMixin } from "../../utils/mixin";

export default {
  components: {
    ShelfTitle,
    Scroll,
    ShelfList,
    ShelfFooter
  },
  data() {
    return {
      srcollBottom: 0
    };
  },
  computed: {
    ifShowList() {
      return (
        this.shelfCategory.itemList && this.shelfCategory.itemList.length > 0
      );
    }
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
  created() {},
  mounted() {
    this.getCategoryList(this.$route.query.title);
    this.setCurrentType(2);
  }
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
  .store-shelf-empty-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: rem(14);
    color: #666;
    @include center;
    z-index: 101;
  }
}
</style>