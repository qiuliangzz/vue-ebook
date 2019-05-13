<!-- 书签栏 -->
<template>
  <div class="ebook-slide-bookmark">
    <div class="slide-bookmark-title">{{$t('book.bookmark')}} · {{bookmark?bookmark.length:0}}</div>
    <Scroll class="slide-bookmark-list" :top="48" :bottom="48">
      <div
        class="slide-bookmark-item"
        v-for="(item,index) in bookmark"
        :key="index"
        @click="displayBookmark(item.cfi)"
      >
        <div class="slide-bookmark-item-icon">
          <div class="icon-bookmark"></div>
        </div>
        <div class="slide-bookmark-item-text">{{item.text}}</div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "../common/Scroll";
import { ebookMixin } from "../../utils/mixin";
import { getBookmark } from "../../utils/localStorage";
export default {
  components: {
    Scroll
  },
  data() {
    return {
      bookmark: null
    };
  },
  mixins: [ebookMixin],
  methods: {
    // 渲染（跳转）到书签页
    displayBookmark(target) {
      this.display(target, () => {
        this.hideTitleAndMenu();
      });
    }
  },
  mounted() {
    // 获取书签
    this.bookmark = getBookmark(this.fileName);
  }
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.ebook-slide-bookmark {
  width: 100%;
  .slide-bookmark-title {
    width: 100%;
    height: rem(48);
    font-size: rem(14);
    font-weight: bold;
    padding: 0 rem(15);
    @include left;
  }
  .slide-bookmark-list {
    padding: 0 rem(15);
    .slide-bookmark-item {
      display: flex;
      padding: rem(15) 0;
      .slide-bookmark-item-icon {
        flex: 0 0 rem(30);
        @include left;
        .icon-bookmark {
          width: rem(20);
          height: rem(20);
          border-radius: 50%;
          font-size: rem(12);
          background-color: #bbb;
          @include center;
        }
      }
      .slide-bookmark-item-text {
        font-size: rem(14);
        line-height: rem(16);
        max-height: rem(45);
        @include ellipsis2(3);
      }
    }
  }
}
</style>