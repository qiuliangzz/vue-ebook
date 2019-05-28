<!-- 书架移动分组对话框组件 -->
<template>
  <Dialog :title="title" ref="dialog">
    <!-- 分组列表 -->
    <div class="dialog-list-wrapper" v-if="!ifNewGroup">
      <div
        class="dialog-list-item"
        :class="{'is-add': item.edit  ? item.edit === 1 : false}"
        v-for="(item, index) in categoryList"
        :key="index"
        @click="onGroupClick(item)"
        v-show="(item.edit === 2 && isInGroup) || item.edit !== 2 || !item.edit"
      >
        <div class="dialog-list-item-text">{{item.title}}</div>
        <div
          class="dialog-list-icon-wrapper"
          v-if="category && item.id ? category.id === item.id : false"
        >
          <span class="icon-check"></span>
        </div>
      </div>
    </div>
    <!-- 新建分组输入框 -->
    <div class="dialog-new-group-wrapper" v-else>
      <div class="dialog-input-title-wrapper">
        <span class="dialog-input-title">{{$t('shelf.groupName')}}</span>
      </div>
      <div class="dialog-input-wrapper">
        <div class="dialog-input-inner-wrapper">
          <input type="text" class="dialog-input" v-model="newGroupName" ref="dialogInput">
          <div class="dialog-input-clear-wrapper" @click="clear" v-show="newGroupName.length > 0">
            <span class="icon-close-circle-fill"></span>
          </div>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div slot="btn" class="group-dialog-btn-wrapper">
      <div class="dialog-btn" @click="hide">{{$t('shelf.cancel')}}</div>
      <div
        class="dialog-btn"
        @click="createNewGroup"
        :class="{'is-empty': newGroupName.length === 0}"
        v-if="ifNewGroup"
      >{{$t('shelf.confirm')}}</div>
    </div>
  </Dialog>
</template>

<script>
import Dialog from "../common/Dialog";
import { shelfMixin } from "../../utils/mixin";
import { removeAddFromShelf, appendAddToShelf } from "../../utils/shelf";
import { saveShelf } from "../../utils/localStorage";

export default {
  name: "group-dialog",
  components: {
    Dialog
  },
  data() {
    return {
      ifNewGroup: false,
      newGroupName: ""
    };
  },
  mixins: [shelfMixin],
  props: {
    isInGroup: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    defaultCategory() {
      return [
        {
          title: this.$t("shelf.newGroup"),
          edit: 1
        },
        {
          title: this.$t("shelf.groupOut"),
          edit: 2
        }
      ];
    },
    category() {
      return this.shelfList.filter(item => item.type === 2);
    },
    categoryList() {
      return [...this.defaultCategory, ...this.category];
    },
    title() {
      return !this.ifNewGroup
        ? this.$t("shelf.moveBook")
        : this.$t("shelf.newGroup");
    }
  },
  methods: {
    show() {
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
      this.ifNewGroup = false;
    },
    // 新建、移出、移动分组
    onGroupClick(item) {
      if (item.edit && item.edit === 1) {
        // 新建分组
        this.ifNewGroup = true;
      } else if (item.edit && item.edit === 2) {
        // 在分组内，移出分组
        this.moveOutFromGroup(item);
      } else {
        // 移动到某个组
        this.moveToGroup(item);
      }
    },
    clear() {
      this.newGroupName = "";
    },
    // 移动（加入）分组
    moveToGroup(group) {
      this.setShelfList(
        this.shelfList.filter(book => this.shelfSelected.indexOf(book) === -1)
      ).then(() => {
        if (group && group.itemList) {
          // 合并数组
          group.itemList = [...group.itemList, ...this.shelfSelected];
        }
        // 更新id
        group.itemList.forEach((item, index) => {
          item.id = index + 1;
        });
        this.simpleToast(
          this.$t("shelf.moveBookInSuccess").replace("$1", group.title)
        );
        this.onComplete();
      });
    },
    moveOutFromGroup(item) {},
    // 新建分组
    createNewGroup() {
      // 如果分组名为空，直接返回
      if (!this.newGroupName && this.newGroupName.length === 0) {
        return;
      }
      // 新建分组对象
      const group = {
        id: this.shelfList[this.shelfList.length - 2].id + 1,
        itemList: [],
        selected: false,
        title: this.newGroupName,
        type: 2
      };
      // 把加号排除掉
      const list = removeAddFromShelf(this.shelfList);
      list.push(group);
      this.setShelfList(appendAddToShelf(list)).then(() => {
        this.onComplete();
      });
    },
    // 完成
    onComplete() {
      saveShelf(this.shelfList);
      this.hide();
      this.setIsEditMode(false);
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";

.dialog-list-wrapper {
  width: 100%;
  padding: 0 rem(20);
  box-sizing: border-box;
  font-size: rem(14);
  @include scroll;
  .dialog-list-item {
    display: flex;
    padding: rem(15) 0;
    box-sizing: border-box;
    color: #666;
    &.is-add {
      color: $color-blue;
      &:active {
        color: $color-blue-transparent;
      }
    }
    &:active {
      color: rgba(102, 102, 102, 0.5);
    }
    .dialog-list-item-text {
      flex: 1;
    }
    .dialog-list-icon-wrapper {
      flex: 0 0 rem(30);
      color: $color-blue;
      @include right;
    }
  }
}

.dialog-new-group-wrapper {
  width: 100%;
  padding: 0 rem(20);
  box-sizing: border-box;
  .dialog-input-title-wrapper {
    font-size: rem(10);
    margin-top: rem(20);
  }
  .dialog-input-wrapper {
    width: 100%;
    padding: 0 0 rem(30) 0;
    box-sizing: border-box;
    .dialog-input-inner-wrapper {
      display: flex;
      width: 100%;
      padding: rem(10) 0;
      box-sizing: border-box;
      border-bottom: rem(1) solid #eee;
      font-size: rem(14);
      color: #666;
      .dialog-input {
        flex: 1;
        border: none;
        &:focus {
          outline: none;
        }
      }
      .dialog-input-clear-wrapper {
        flex: 0 0 rem(30);
        color: #ccc;
        @include center;
        &:active {
          color: #999;
        }
      }
    }
  }
}

.group-dialog-btn-wrapper {
  width: 100%;
  @include center;
}
.dialog-btn {
  flex: 1;
  &.is-empty {
    color: rgba(255, 255, 255, 0.5);
  }
  &:active {
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>
