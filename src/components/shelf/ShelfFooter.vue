<!-- 底部菜单栏 -->
<template>
  <div class="shelf-footer" v-show="isEditMode">
    <div
      class="shelf-footer-tab-wrapper"
      v-for="item in tabs"
      :key="item.index"
      @click="onTabClick(item)"
    >
      <div class="shelf-footer-tab" :class="{'is-selected':isSelected}">
        <div class="icon-private tab-icon" v-if="item.index===1 && !isPrivate"></div>
        <div class="icon-private-see tab-icon" v-if="item.index===1 && isPrivate"></div>
        <div class="icon-download tab-icon" v-if="item.index===2 && !isDownload"></div>
        <div class="icon-download-remove tab-icon" v-if="item.index===2 && isDownload"></div>
        <div class="icon-move tab-icon" v-show="item.index===3"></div>
        <div class="icon-shelf tab-icon" v-show="item.index===4"></div>
        <div class="tab-text" :class="{'remove-text':item.index===4}">{{label(item)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { shelfMixin } from "../../utils/mixin";
import { saveShelf } from "../../utils/localStorage";
export default {
  components: {},
  data() {
    return {
      popupMenu: null
    };
  },
  mixins: [shelfMixin],
  computed: {
    isSelected() {
      return this.shelfSelected && this.shelfSelected.length > 0;
    },
    tabs() {
      return [
        {
          label: this.$t("shelf.private"),
          label2: this.$t("shelf.noPrivate"),
          index: 1
        },
        {
          label: this.$t("shelf.download"),
          label2: this.$t("shelf.clearCache"),
          index: 2
        },
        {
          label: this.$t("shelf.move"),
          index: 3
        },
        {
          label: this.$t("shelf.remove"),
          index: 4
        }
      ];
    },
    // 判断当前选中图书是否是私密阅读状态
    isPrivate() {
      if (!this.isSelected) {
        return false;
      } else {
        // every() 方法用于检测数组所有元素是否都符合指定条件（通过函数提供）。
        return this.shelfSelected.every(item => item.private);
      }
    },
    // 判断当前选中图书是否离线缓存
    isDownload() {
      if (!this.isSelected) {
        return false;
      } else {
        return this.shelfSelected.every(item => item.cache);
      }
    }
  },
  methods: {
    onTabClick(item) {
      if (!this.isSelected) {
        return;
      }
      switch (item.index) {
        case 1:
          this.showPrivate();
          break;
        case 2:
          this.showDownload();
          break;
        case 3:
          break;
        case 4:
          this.showRemove();
          break;
        default:
          break;
      }
    },
    // tab底部文字
    label(item) {
      switch (item.index) {
        case 1:
          return !this.isPrivate ? item.label : item.label2;
        case 2:
          return !this.isDownload ? item.label : item.label2;
        default:
          return item.label;
      }
    },
    // 公共的完成方法
    onComplete() {
      // 隐藏弹出框
      this.hidePopup();
      // 取消编辑状态
      this.setIsEditMode(false);
      // 把修改的图书存储到localstorage中
      saveShelf(this.shelfList);
    },
    hidePopup() {
      this.popupMenu.hide();
    },
    // 私密阅读
    showPrivate() {
      this.popupMenu = this.popup({
        title: !this.isPrivate
          ? this.$t("shelf.setPrivateTitle")
          : this.$t("shelf.closePrivateTitle"),
        btn: [
          {
            text: !this.isPrivate
              ? this.$t("shelf.open")
              : this.$t("shelf.close"),
            click: () => {
              this.setPrivate();
            }
          },
          {
            text: this.$t("shelf.cancel"),
            click: () => {
              this.hidePopup();
            }
          }
        ]
      });
      this.popupMenu.show();
    },
    // 开启私密阅读功能
    setPrivate() {
      let isPrivate;
      if (this.isPrivate) {
        isPrivate = false;
      } else {
        isPrivate = true;
      }
      this.shelfSelected.forEach(book => {
        book.private = isPrivate;
      });
      this.onComplete();
      // 提示文字
      if (isPrivate) {
        this.toast({ text: this.$t("shelf.setPrivateSuccess") }).show();
      } else {
        this.toast({ text: this.$t("shelf.closePrivateSuccess") }).show();
      }
    },
    // 离线缓存图书
    showDownload() {
      this.popupMenu = this.popup({
        title: !this.isDownload
          ? this.$t("shelf.setDownloadTitle")
          : this.$t("shelf.removeDownloadTitle"),
        btn: [
          {
            text: !this.isDownload
              ? this.$t("shelf.open")
              : this.$t("shelf.close"),
            click: () => {
              this.setDownload();
            }
          },
          {
            text: this.$t("shelf.cancel"),
            click: () => {
              this.hidePopup();
            }
          }
        ]
      });
      this.popupMenu.show();
    },
    // 开启离线功能
    setDownload() {
      let isDownload;
      if (this.isDownload) {
        isDownload = false;
      } else {
        isDownload = true;
      }
      this.shelfSelected.forEach(book => {
        book.cache = isDownload;
      });
      this.downloadSelectedBook();
      this.onComplete();
      // 提示文字
      if (isDownload) {
        this.toast({ text: this.$t("shelf.setDownloadSuccess") }).show();
      } else {
        this.toast({ text: this.$t("shelf.removeDownloadSuccess") }).show();
      }
    },
    // 下载图书
    downloadSelectedBook() {},
    // 移出书架
    showRemove() {
      // 选一本书和选两本书title文本不一样
      let title;
      if (this.shelfSelected.length === 1) {
        title = this.$t("shelf.removeBookTitle").repalce(
          "$1",
          `《${this.shelfSelected.title}》`
        );
      } else {
        title = this.$t("shelf.removeBookTitle").repalce(
          "$1",
          this.$t("shelf.selectedBooks")
        );
      }
      this.popupMenu = this.popup({
        title: title,
        btn: [
          {
            text: this.$t("shelf.removeBook"),
            type: "danger",
            click: () => {
              this.removeSelected();
            }
          },
          {
            text: this.$t("shelf.cancel"),
            click: () => {
              this.hidePopup();
            }
          }
        ]
      });
      this.popupMenu.show();
    },
    // 移出书架功能
    removeSelected() {
      this.shelfSelected.forEach(selected => {
        this.setShelfList(this.shelfList.filter(book => book !== selected));
      });
      this.setShelfSelected([]);
      this.onComplete();
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.shelf-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 120;
  display: flex;
  width: 100%;
  height: rem(48);
  background-color: #fff;
  box-shadow: 0 rem(-2) rem(4) 0 rgba(0, 0, 0, 0.1);
  .shelf-footer-tab-wrapper {
    flex: 1;
    width: 25%;
    height: 100%;
    .shelf-footer-tab {
      width: 100%;
      height: 100%;
      opacity: 0.5;
      @include columnCenter;
      .tab-icon {
        font-size: rem(20);
        color: #666;
      }
      .icon-shelf {
        color: $color-pink;
      }
      .tab-text {
        margin-top: rem(5);
        font-size: rem(12);
        color: #666;
        &.remove-text {
          color: $color-pink;
        }
      }
      &.is-selected {
        opacity: 1;
      }
    }
  }
}
</style>