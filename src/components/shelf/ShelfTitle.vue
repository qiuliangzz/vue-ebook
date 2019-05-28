<!-- 书架头部标题 -->
<template>
  <transition name="fade">
    <div class="shelf-title" v-show="shelfTitleVisible" :class="{'hide-shadow':ifHideShadow}">
      <div class="shelf-title-text-wrapper">
        <span class="shelf-title-text">{{title}}</span>
        <span class="shelf-title-sub-text" v-show="isEditMode">{{selectedText}}</span>
      </div>
      <!-- 清除缓存 -->
      <div class="shelf-title-btn-wrapper left" v-if="showClear">
        <span class="shelf-title-btn-text" @click="clearCache">{{$t('shelf.clearCache')}}</span>
      </div>
      <!-- 编辑按钮 -->
      <div class="shelf-title-btn-wrapper right" v-if="showEdit">
        <span
          class="shelf-title-btn-text"
          @click="onEditClick"
        >{{ isEditMode ? $t('shelf.cancel') : $t('shelf.edit')}}</span>
      </div>
      <!-- 返回按钮 -->
      <div class="shelf-title-btn-wrapper left" v-if="showBack">
        <span class="icon-back" @click="back"></span>
      </div>
      <!-- 修改分组按钮 -->
      <div
        class="shelf-title-btn-wrapper"
        :class="{'shelf-title-left': changeGroupLeft,'shelf-title-right': changeGroupRight}"
        @click="changeGroup"
        v-if="showChangeGroup"
      >
        <span class="shelf-title-btn-text">{{$t('shelf.editGroup')}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
import { shelfMixin } from "../../utils/mixin";
import { clearLocalForage } from "../../utils/localForage";
import { clearLocalStorage, saveShelf } from "../../utils/localStorage";
export default {
  components: {},
  data() {
    return {
      ifHideShadow: true
    };
  },
  props: {
    title: String
  },
  mixins: [shelfMixin],
  computed: {
    emptyCategory() {
      return (
        !this.shelfCategory ||
        !this.shelfCategory.itemList ||
        this.shelfCategory.itemList.length === 0
      );
    },
    showEdit() {
      return this.currentType === 1 || !this.emptyCategory;
    },
    showClear() {
      return this.currentType === 1;
    },
    showBack() {
      return this.currentType === 2 && !this.isEditMode;
    },
    showChangeGroup() {
      return this.currentType === 2 && (this.isEditMode || this.emptyCategory);
    },
    changeGroupLeft() {
      return !this.emptyCategory;
    },
    changeGroupRight() {
      return this.emptyCategory;
    },
    // 选中几本书
    selectedText() {
      const selectNumber = this.shelfSelected ? this.shelfSelected.length : 0;
      return selectNumber <= 0
        ? this.$t("shelf.selectBook")
        : selectNumber === 1
        ? this.$t("shelf.haveSelectedBook").replace("$1", selectNumber)
        : this.$t("shelf.haveSelectedBooks").replace("$1", selectNumber);
    },
    popupCancelBtn() {
      return this.createPopupBtn(this.$t("shelf.cancel"), () => {
        this.hidePopup();
      });
    }
  },
  watch: {
    offsetY(offsetY) {
      if (offsetY > 0) {
        this.ifHideShadow = false;
      } else {
        this.ifHideShadow = true;
      }
    }
  },
  methods: {
    // 编辑功能
    onEditClick() {
      // 非编辑状态去除选中状态
      if (!this.isEditMode) {
        this.setShelfSelected([]);
        this.shelfList.forEach(item => {
          item.selected = false;
          if (item.itemList) {
            item.itemList.forEach(subItem => {
              subItem.selected = false;
            });
          }
        });
      }
      this.setIsEditMode(!this.isEditMode);
    },
    // 清除缓存功能
    clearCache() {
      clearLocalStorage();
      clearLocalForage();
      this.setShelfList([]);
      this.setShelfSelected([]);
      this.getShelfList();
      this.simpleToast(this.$t("shelf.clearCacheSuccess"));
    },
    back() {
      this.$router.go(-1);
      this.setIsEditMode(false);
    },
    createPopupBtn(text, onClick, type = "normal") {
      return {
        text,
        type,
        click: onClick
      };
    },
    hidePopup() {
      this.popupMenu.hide();
    },
    // 修改分组
    changeGroup() {
      this.popupMenu = this.popup({
        btn: [
          // 修改分组
          this.createPopupBtn(this.$t("shelf.editGroupName"), () => {
            this.changeGroupName();
          }),
          // 删除分组
          this.createPopupBtn(
            this.$t("shelf.deleteGroup"),
            () => {
              this.showDeleteGroup();
            },
            "danger"
          ),
          // 取消
          this.popupCancelBtn
        ]
      }).show();
    },
    // 修改分组名
    changeGroupName() {
      this.hidePopup();
      this.dialog({
        showNewGroup: true,
        groupName: this.shelfCategory.title
      }).show();
    },
    // 删除分组弹框
    showDeleteGroup() {
      this.hidePopup();
      setTimeout(() => {
        this.popupMenu = this.popup({
          title: this.$t("shelf.deleteGroupTitle"),
          btn: [
            this.createPopupBtn(
              this.$t("shelf.confirm"),
              () => {
                this.deleteGroup();
              },
              "danger"
            ),
            this.popupCancelBtn
          ]
        }).show();
      }, 200);
    },
    // 删除分组
    deleteGroup() {
      // 1. 移出图书
      if (!this.emptyCategory) {
        // 全部设置为选中状态
        this.setShelfSelected(this.shelfCategory.itemList);
        // 全部移出
        this.moveOutOfGroup(this.onComplete);
      } else {
        this.onComplete();
      }
      // 2.删除分组
    },
    // 完成
    onComplete() {
      this.hidePopup();
      this.setShelfList(
        this.shelfList.filter(book => book.id !== this.shelfCategory.id)
      ).then(() => {
        saveShelf(this.shelfList);
        this.$router.go(-1);
        this.setIsEditMode(false);
      });
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.shelf-title {
  position: relative;
  z-index: 103;
  width: 100%;
  height: rem(42);
  background-color: #fff;
  box-shadow: 0 rem(2) rem(2) 0 rgba(0, 0, 0, 0.1);
  &.hide-shadow {
    box-shadow: none;
  }
  .shelf-title-text-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: rem(42);
    @include columnCenter;
    .shelf-title-text {
      font-size: rem(16);
      line-height: rem(20);
      font-weight: bold;
      color: #333;
    }
    .shelf-title-sub-text {
      font-size: rem(10);
      color: #666;
    }
  }
  .shelf-title-btn-wrapper {
    position: absolute;
    top: 0;
    height: 100%;
    @include center;
    &.left,
    &.shelf-title-left {
      left: rem(15);
    }
    &.right,
    &.shelf-title-right {
      right: rem(15);
    }

    .shelf-title-btn-text {
      font-size: rem(14);
      color: #666;
    }
    .icon-back {
      font-size: rem(20);
      color: #666;
    }
  }
}
</style>