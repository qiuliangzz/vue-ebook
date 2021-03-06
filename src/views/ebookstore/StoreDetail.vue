<!-- 书城详情页 -->
<template>
  <div class="book-detail">
    <!-- 头部 -->
    <DetaiTitle @back="back" :showShelf="true" ref="title"></DetaiTitle>
    <scroll class="content-wrapper" :top="42" :bottom="52" @onScroll="onScroll" ref="scroll">
      <book-info :cover="cover" :title="title" :author="author" :desc="desc"></book-info>
      <div class="book-detail-content-wrapper">
        <div class="book-detail-content-title">{{$t('detail.copyright')}}</div>
        <div class="book-detail-content-list-wrapper">
          <div class="book-detail-content-row">
            <div class="book-detail-content-label">{{$t('detail.publisher')}}</div>
            <div class="book-detail-content-text">{{publisher}}</div>
          </div>
          <div class="book-detail-content-row">
            <div class="book-detail-content-label">{{$t('detail.category')}}</div>
            <div class="book-detail-content-text">{{categoryText}}</div>
          </div>
          <div class="book-detail-content-row">
            <div class="book-detail-content-label">{{$t('detail.lang')}}</div>
            <div class="book-detail-content-text">{{lang}}</div>
          </div>
          <div class="book-detail-content-row">
            <div class="book-detail-content-label">{{$t('detail.ISBN')}}</div>
            <div class="book-detail-content-text">{{isbn}}</div>
          </div>
        </div>
      </div>
      <div class="book-detail-content-wrapper">
        <div class="book-detail-content-title">{{$t('detail.navigation')}}</div>
        <div class="book-detail-content-list-wrapper">
          <div class="loading-text-wrapper" v-if="!this.navigation">
            <span class="loading-text">{{$t('detail.loading')}}</span>
          </div>
          <div class="book-detail-content-item-wrapper">
            <div
              class="book-detail-content-item"
              v-for="(item, index) in flatNavigation"
              :key="index"
              @click="readBook()"
            >
              <div
                class="book-detail-content-navigation-text"
                :class="{'is-sub': item.deep> 1}"
                :style="itemStyle(item)"
                v-if="item.label"
              >{{item.label}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="book-detail-content-wrapper">
        <div class="book-detail-content-title">{{$t('detail.trial')}}</div>
        <div class="book-detail-content-list-wrapper">
          <div class="loading-text-wrapper" v-if="!this.displayed">
            <span class="loading-text">{{$t('detail.loading')}}</span>
          </div>
        </div>
        <div id="preview" v-show="this.displayed" ref="preview"></div>
      </div>
    </scroll>
    <div class="bottom-wrapper">
      <div class="bottom-btn" @click.stop.prevent="readBook()">{{$t('detail.read')}}</div>
      <div class="bottom-btn" @click.stop.prevent="trialListening()">{{$t('detail.listen')}}</div>
      <div class="bottom-btn" @click.stop.prevent="addOrRemoveShelf()">
        <span class="icon-check" v-if="inBookShelf"></span>
        {{inBookShelf ? $t('detail.isAddedToShelf') : $t('detail.addOrRemoveShelf')}}
      </div>
    </div>
    <toast :text="toastText" ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
import DetaiTitle from "../../components/detail/DetaiTitle";
import BookInfo from "../../components/detail/BookInfo";
import Scroll from "../../components/common/Scroll";
import Toast from "../../components/common/Toast";
import { detail } from "../../api";
import { rem, realPx } from "../../utils/utils";
import Epub from "epubjs";
import { getLocalForage } from "../../utils/localForage";
import { removeFromShelf, addToShelf } from "../../utils/bookstore";
import { shelfMixin } from "../../utils/mixin";
import { getShelf, saveShelf } from "../../utils/localStorage";

global.ePub = Epub;

export default {
  components: {
    DetaiTitle,
    Scroll,
    BookInfo,
    Toast
  },
  mixins: [shelfMixin],
  data() {
    return {
      bookItem: null,
      book: null,
      metadata: null,
      trialRead: null,
      cover: null,
      navigation: null,
      displayed: false,
      audio: null,
      randomLocation: null,
      description: null,
      toastText: "",
      trialText: null,
      categoryText: null,
      opf: null
    };
  },
  computed: {
    desc() {
      if (this.description) {
        return this.description.substring(0, 100);
      } else {
        return "";
      }
    },
    flatNavigation() {
      if (this.navigation) {
        return Array.prototype.concat.apply(
          [],
          Array.prototype.concat.apply(
            [],
            this.doFlatNavigation(this.navigation.toc)
          )
        );
      } else {
        return [];
      }
    },
    lang() {
      return this.metadata ? this.metadata.language : "-";
    },
    isbn() {
      return this.metadata ? this.metadata.identifier : "-";
    },
    publisher() {
      return this.metadata ? this.metadata.publisher : "-";
    },
    title() {
      return this.metadata ? this.metadata.title : "";
    },
    author() {
      return this.metadata ? this.metadata.creator : "";
    },
    inBookShelf() {
      if (this.bookItem && this.shelfList) {
        const flatShelf = (function flatten(arr) {
          return [].concat(
            ...arr.map(item =>
              item.itemList ? [item, ...flatten(item.itemList)] : item
            )
          );
        })(this.shelfList).filter(item => item.type === 1);
        const book = flatShelf.filter(
          item => item.fileName === this.bookItem.fileName
        );
        return book && book.length > 0;
      } else {
        return false;
      }
    }
  },

  methods: {
    // 初始化
    init() {
      this.fileName = this.$route.query.fileName;
      this.categoryText = this.$route.query.category;
      if (this.fileName) {
        detail({
          fileName: this.fileName
        }).then(response => {
          if (
            response.status === 200 &&
            response.data.error_code === 0 &&
            response.data.data
          ) {
            const data = response.data.data;
            this.bookItem = data;
            this.cover = this.bookItem.cover;
            let rootFile = data.rootFile;
            if (rootFile.startsWith("/")) {
              rootFile = rootFile.substring(1, rootFile.length);
            }
            this.opf = `${process.env.VUE_APP_EPUB_OPF_URL}/${
              this.fileName
            }/${rootFile}`;
            this.parseBook(this.opf);
          } else {
            this.showToast(response.data.msg);
          }
        });
      }
    },
    // 解析电子书
    parseBook(url) {
      this.book = new Epub(url);
      this.book.loaded.metadata.then(metadata => {
        this.metadata = metadata;
      });
      this.book.loaded.navigation.then(nav => {
        this.navigation = nav;
        if (this.navigation.toc && this.navigation.toc.length > 1) {
          const candisplay = this.display(this.navigation.toc[1].href);
          if (candisplay) {
            candisplay.then(section => {
              if (this.$refs.scroll) {
                this.$refs.scroll.refresh();
              }
              this.displayed = true;
              const reg = new RegExp("<.+?>", "g");
              const text = section.output.replace(reg, "").replace(/\s\s/g, "");
              this.description = text;
            });
          }
        }
      });
    },
    // 添加或移出书架
    addOrRemoveShelf() {
      if (this.inBookShelf) {
        this.setShelfList(removeFromShelf(this.bookItem)).then(() => {
          saveShelf(this.shelfList);
        });
      } else {
        addToShelf(this.bookItem);
        this.setShelfList(getShelf());
      }
    },
    showToast(text) {
      this.toastText = text;
      this.$refs.toast.show();
    },
    // 阅读
    readBook() {
      this.$router.push({
        path: `/ebook/${this.bookItem.categoryText}|${this.fileName}`
      });
    },
    // 听书
    trialListening() {
      getLocalForage(this.bookItem.fileName, (err, blob) => {
        if (!err && blob && blob instanceof Blob) {
          this.$router.push({
            path: "/store/speaking",
            query: {
              fileName: this.bookItem.fileName
            }
          });
        } else {
          this.$router.push({
            path: "/store/speaking",
            query: {
              fileName: this.bookItem.fileName,
              opf: this.opf
            }
          });
        }
      });
    },
    itemStyle(item) {
      return {
        marginLeft: (item.deep - 1) * rem(20) + "rem"
      };
    },
    doFlatNavigation(content, deep = 1) {
      const arr = [];
      content.forEach(item => {
        item.deep = deep;
        arr.push(item);
        if (item.subitems && item.subitems.length > 0) {
          arr.push(this.doFlatNavigation(item.subitems, deep + 1));
        }
      });
      return arr;
    },
    // 下载电子书
    downloadBook() {
      const opf = `${process.env.VUE_APP_EPUB_URL}/${
        this.bookItem.categoryText
      }/${this.bookItem.fileName}/OEBPS/package.opf`;
      this.parseBook(opf);
    },
    back() {
      this.$router.go(-1);
    },
    display(location) {
      if (this.$refs.preview) {
        if (!this.rendition) {
          this.rendition = this.book.renderTo("preview", {
            width: window.innerWidth > 640 ? 640 : window.innerWidth,
            height: window.innerHeight,
            method: "default"
          });
        }
        if (!location) {
          return this.rendition.display();
        } else {
          return this.rendition.display(location);
        }
      }
    },
    onScroll(offsetY) {
      if (offsetY > realPx(42)) {
        this.$refs.title.showShadow();
      } else {
        this.$refs.title.hideShadow();
      }
    }
  },
  mounted() {
    this.init();
    if (!this.shelfList || this.shelfList.length === 0) {
      this.getShelfList();
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";

.book-detail {
  width: 100%;
  background: white;
  .content-wrapper {
    width: 100%;
    .book-detail-content-wrapper {
      width: 100%;
      border-bottom: rem(1) solid #eee;
      box-sizing: border-box;
      .book-detail-content-title {
        font-size: rem(20);
        font-weight: bold;
        padding: rem(20) rem(15) rem(10) rem(15);
        box-sizing: border-box;
      }
      .book-detail-content-list-wrapper {
        padding: rem(10) rem(15);
        box-sizing: border-box;
        .loading-text-wrapper {
          width: 100%;
          .loading-text {
            font-size: rem(14);
            color: #666;
          }
        }
        .book-detail-content-row {
          display: flex;
          box-sizing: border-box;
          margin-bottom: rem(10);
          .book-detail-content-label {
            flex: 0 0 rem(70);
            font-size: rem(14);
            color: #666;
          }
          .book-detail-content-text {
            flex: 1;
            font-size: rem(14);
            color: #333;
          }
        }
        .book-detail-content-item-wrapper {
          .book-detail-content-item {
            padding: rem(15) 0;
            font-size: rem(14);
            line-height: rem(16);
            color: #666;
            border-bottom: rem(1) solid #eee;
            &:last-child {
              border-bottom: none;
            }
            .book-detail-content-navigation-text {
              width: 100%;
              @include ellipsis;
              &.is-sub {
                color: #666;
              }
            }
          }
        }
      }
    }
    .audio-wrapper {
      width: 100%;
      padding: rem(15);
      box-sizing: border-box;
      #audio {
        width: 100%;
      }
    }
  }
  .bottom-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 120;
    display: flex;
    width: 100%;
    height: rem(52);
    box-shadow: 0 rem(-2) rem(2) rgba(0, 0, 0, 0.1);
    .bottom-btn {
      flex: 1;
      color: $color-blue;
      font-weight: bold;
      font-size: rem(14);
      @include center;
      &:active {
        color: $color-blue-transparent;
      }
      .icon-check {
        margin-right: rem(5);
      }
    }
    &.hide-shadow {
      box-shadow: none;
    }
  }
}
</style>
