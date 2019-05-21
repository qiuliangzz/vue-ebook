<!-- 目录栏 -->
<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="search-icon">
          <span class="icon-search"></span>
        </div>
        <input
          type="text"
          class="search-input"
          :placeholder="$t('book.searchHint')"
          @click="showSearchPage"
          @keyup.enter.exact="search"
          v-model="searchText"
        >
      </div>
      <div
        class="slide-contents-search-cancel"
        v-if="searchVisible"
        @click="hideSearchPage()"
      >{{$t('book.cancel')}}</div>
    </div>
    <div class="slide-contents-book-wrapper" v-show="!searchVisible">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" class="slide-contents-book-img">
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">
          <span class="slide-contents-book-title-text">{{metadata.title}}</span>
        </div>
        <div class="slide-contents-book-author">
          <span class="slide-contents-book-author-text">{{metadata.creator}}</span>
        </div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress+'%'}}</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
          <div class="slide-contents-book-time">{{getReadTimeText()}}</div>
        </div>
      </div>
    </div>
    <!-- 目录章节滚动 -->
    <Scroll class="slide-contents-list" :top="156" :bottom="48" v-show="!searchVisible">
      <div class="slide-contents-item" v-for="(item,index) in navigation" :key="index">
        <span
          class="slide-contents-item-label"
          :class="{selected: section === index}"
          :style="contentItemStyle(item)"
          @click="displayContents(item.href)"
        >{{item.label}}</span>
        <!-- <span class="slide-contents-item-page">{{item.label}}</span> -->
      </div>
    </Scroll>
    <Scroll class="slide-search-list" :top="66" :bottom="48" v-show="searchVisible">
      <div
        class="slide-search-item"
        v-for="(item,index) in searchList"
        :key="index"
        v-html="item.excerpt"
        @click="displayContents(item.cfi,true)"
      ></div>
    </Scroll>
  </div>
</template>

<script>
import { ebookMixin } from "../../utils/mixin.js";
import { rem } from "../../utils/utils";
import Scroll from "../common/Scroll";

export default {
  components: {
    Scroll
  },
  data() {
    return {
      searchVisible: false,
      searchList: null,
      searchText: ""
    };
  },
  mixins: [ebookMixin],
  methods: {
    showSearchPage() {
      this.searchVisible = true;
    },
    hideSearchPage() {
      this.searchVisible = false;
      this.searchText = "";
      this.searchList = [];
    },
    contentItemStyle(item) {
      return {
        marginLeft: `${rem(item.level * 15)}rem`
      };
    },
    // 搜索功能
    // https://github.com/futurepress/epub.js/wiki/Tips-and-Tricks-%28v0.3%29
    doSearch(q) {
      return Promise.all(
        this.currentBook.spine.spineItems.map(item =>
          item
            .load(this.currentBook.load.bind(this.currentBook))
            .then(item.find.bind(item, q))
            .finally(item.unload.bind(item))
        )
      ).then(results => Promise.resolve([].concat.apply([], results)));
    },
    search() {
      if (this.searchText && this.searchText.length > 0) {
        this.doSearch(this.searchText).then(list => {
          this.searchList = list;
          // 高亮显示搜索文字
          this.searchList.map(item => {
            item.excerpt = item.excerpt.replace(
              this.searchText,
              `<span class="content-search-text">${this.searchText}</span>`
            );
            return item;
          });
        });
      }
    },
    // 渲染跳转到搜索内容和目录对应内容
    displayContents(target, highlight = false) {
      this.display(target, () => {
        this.hideTitleAndMenu();
        // 搜索对应文字高亮显示
        if (highlight) {
          this.currentBook.rendition.annotations.highlight(target);
        }
      });
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.ebook-slide-contents {
  width: 100%;
  font-size: 0;
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: rem(36);
    margin: rem(20) 0 rem(10) 0;
    padding: 0 rem(15);
    .slide-contents-search-input-wrapper {
      flex: 1;
      @include center;
      .search-icon {
        flex: 0 0 rem(28);
        font-size: rem(12);
        @include center;
      }
      .search-input {
        flex: 1;
        width: 100%;
        height: rem(32);
        font-size: rem(14);
        background: transparent;
        border: none;
        &:focus {
          outline: none;
        }
      }
    }
    .slide-contents-search-cancel {
      flex: 0 0 rem(50);
      font-size: rem(14);
      @include right;
    }
  }
  .slide-contents-book-wrapper {
    display: flex;
    width: 100%;
    height: rem(90);
    padding: rem(10) rem(15) rem(20) rem(15);

    .slide-contents-book-img-wrapper {
      flex: 0 0 rem(45);
      .slide-contents-book-img {
        width: rem(45);
        height: rem(60);
      }
    }
    .slide-contents-book-info-wrapper {
      flex: 1;
      padding: 0 rem(10);
      .slide-contents-book-title {
        /* 375*0.85=318.75-30=288.75 -20=268.75-45=223.75-70=153.75*/
        /* width: rem(153.75); */
        font-size: rem(14);
        line-height: rem(16);
        @include left;
        .slide-contents-book-title-text {
          @include ellipsis2(2);
        }
      }
      .slide-contents-book-author {
        /* width: rem(153.75); */
        font-size: rem(12);
        margin-top: rem(5);
        @include left;
        .slide-contents-book-author-text {
          @include ellipsis2(1);
        }
      }
    }
    .slide-contents-book-progress-wrapper {
      flex: 0 0 rem(70);
      .slide-contents-book-progress {
        .progress {
          font-size: rem(14);
        }
        .progress-text {
          font-size: rem(12);
        }
        .slide-contents-book-time {
          font-size: rem(12);
          margin-top: rem(5);
        }
      }
    }
  }
  .slide-contents-list {
    padding: 0 rem(15);
    .slide-contents-item {
      display: flex;
      padding: rem(20) rem(5);
      .slide-contents-item-label {
        flex: 1;
        font-size: rem(14);
        line-height: rem(16); // 使英文显示完全
        @include ellipsis;
      }
      /* .slide-contents-item-page {
      } */
    }
  }
  .slide-search-list {
    width: 100%;
    padding: 0 rem(15);
    .slide-search-item {
      font-size: rem(14);
      line-height: rem(16);
      padding: rem(20) 0;
    }
  }
}
</style>